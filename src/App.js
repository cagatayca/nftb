import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  MDBTableBody, MDBRow, MDBCol, MDBCardBody,
  MDBContainer, MDBBtn, MDBBtnGroup
} from 'mdb-react-ui-kit';
import './App.css';


function App() {
  const [data, setData] = useState([])
  const sortOptions = ["price", "date"]
  const [sortValue, setSortValue] = useState([])

  useEffect(() => {
    loadProductData()
  }, [])



  const loadProductData = async () => {
    return await axios
      .get('http://localhost:3000/products')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err))
  }

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value)
    return await axios
      .get(`http://localhost:3000/products?_sort=${value}&_order=desc`)
      .then((response) => { setData(response.data) })
      .catch((err) => console.log(err))
  }

  const handleFilter = async (value) => {
    return await axios
      .get(`http://localhost:3000/products?type=${value}`)
      .then((response) => { setData(response.data) })
      .catch((err) => console.log(err))
  }





  return (
    <MDBContainer>
      <div style={{ marginTop: "100px" }}>
        <h1 className='text-center' style={{ fontWeight: "900", color: "#66FF66" }} >NFT Project</h1>
        <MDBRow style={{ backgroundColor: "#202020", borderRadius: "25px", alignItems: "center", paddingLeft: "55px", height: "5rem", color: "white" }}  >
          <MDBCol size={8}>
            <h5>Sort by:</h5>
            <select
              style={{ width: "50%", borderRadius: "2px", height: "35px" }}
              onChange={handleSort}
              value={sortValue}
            >
              <option>Please Select Value</option>
              {sortOptions.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>

          </MDBCol>
          <MDBCol size={4}>
            <h5>Filter by Type:</h5>
            <MDBBtnGroup>
              <MDBBtn color='success' onClick={() => handleFilter("video")}>Video</MDBBtn>
              <MDBBtn color='secondary' style={{ marginLeft: "2px" }} onClick={() => handleFilter("image")}>Image</MDBBtn>
            </MDBBtnGroup>
          </MDBCol>



        </MDBRow>
        <MDBRow>
          <MDBCol className="d-flex flex-wrap " size="12">
            {data.length === 0 ? (
              <MDBTableBody className='align-center mb-0'>
                <tr>
                  <td colSpan={8} className='text-center mb-0'>No Data Found</td>
                </tr>
              </MDBTableBody>
            ) : (
              data.map((item, index) => (
                <MDBCardBody className="d-flex flex-wrap  ">
                  <div key={index} className=" card w-78 bg-success bg-gradient  d-flex align-items-start justify-content-center mb-3 flex-wrap">
                    <img src={item.image} style={{ width: "15rem", justifyContent: "center" }} className="card-img-top " alt="Fissure in Sandstone" />
                    <div className="card-body m-auto align-items-start justify-content-center  ">
                      <h5 className="card-title m-auto align-items-start justify-content-center " style={{ color: "#66FF66" }}>{item.title}</h5><br />
                      <h5 className="card-text m-auto align-items-start justify-content-center" style={{ color: "burlywood" }}>{item.type}</h5><br />
                      <h5 className="card-text m-auto align-items-start justify-content-center" style={{ color: "khaki" }}>{item.price}$</h5><br />
                      <h5 className="card-text m-auto align-items-start justify-content-center" style={{ color: "crimson" }}>{item.currency}</h5><br />
                      <a href="#!" className="btn btn-primary m-auto align-items-start justify-content-center " >Buy</a>
                    </div>
                  </div>
                </MDBCardBody>
              ))
            )}
          </MDBCol>
        </MDBRow>
      </div>

    </MDBContainer>
  );
}

export default App;
