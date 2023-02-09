import styled, { css } from "styled-components";
import './App.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./Popup.css";
function App() {

  const [isHome, setHome] = useState(true);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const options = {
    method: 'GET',
    url: 'https://randomuser.me/api/',
  };
  const loadOptions = () => {
    axios.request(options).then(function (response) {
      setData(response.data.results)
    }).catch(function (error) {
      console.error(error);
    });
  }
  useEffect(() => {
    loadOptions();
  }, []);

  const addData = () => {
    let name=nameRef.current.value;
    let email=emailRef.current.value;
    let phone=phoneRef.current.value;
    
    let newData={};
    newData.name={};
    newData.name.first=name;
    newData.email=email;
    newData.phone=phone;
    setData(data.concat(newData))

    nameRef.current.value="";
    emailRef.current.value="";
    phoneRef.current.value="";
    setHome(true)
  }

  const updateData = (index,closePopup) => {
    let name=nameRef.current.value;
    let email=emailRef.current.value;
    let phone=phoneRef.current.value;

    data[index].name.first=name;
    data[index].email=email;
    data[index].phone=phone;

    nameRef.current.value="";
    emailRef.current.value="";
    phoneRef.current.value="";
    closePopup();
  }

  const deleteData = (index) =>{
   // setData(data.splice(index+1));

    const reducedArr = data.filter((item, itemIndex) => {
      return itemIndex !== index 
    })
    setData(reducedArr);
  }

  const Popup = ({ index, closePopup }) => {
    return (
      <div className="popup-container">
       <div className="popup-body">
              <Rect42>
                <div align="ceneter"><button onClick={closePopup}>X</button></div>
                <div>&nbsp;</div>
              <Rect32>
              &nbsp;&nbsp; &nbsp;<div><Form.Control
                  placeholder="Name &#42;"
                  aria-label="Name"
                  aria-describedby="basic-addon1"
                  defaultValue={data[index].name.first}
                  ref={nameRef}
                  style={{ width: "300px"}}
                  name="name" /></div>&nbsp;&nbsp; &nbsp;
                <div>
                  <Form.Control
                    placeholder="Email Address &#42;"
                    aria-label="EmailAddress"
                    aria-describedby="basic-addon1"
                    ref={emailRef}
                    defaultValue={data[index].email}
                    style={{ width: "300px"}}
                    name="emailAddress" /></div>&nbsp;&nbsp; &nbsp;<div>
                  <Form.Control
                    placeholder="Phobe &#42;"
                    aria-label="Phone"
                    aria-describedby="basic-addon1"
                    ref={phoneRef}
                    defaultValue={data[index].phone}
                    style={{ width: "300px"}}
                    name="phobe" /></div>&nbsp;&nbsp; &nbsp;
                    <div> <button style={{ width: "100px" }} onClick={() => updateData(index,closePopup)}>Save Data</button></div>
              </Rect32>
            </Rect42>
        
       </div>
      </div>
    );
  };

  const nameRef = React.createRef();
  const emailRef = React.createRef();
  const phoneRef = React.createRef();

  if (isHome === true) {
    return (
      <Container>
        <Rect>
          <Rect6>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<button onClick={() => setHome(true)}>Home</button> &nbsp; &nbsp;<button onClick={() => setHome(false)}>Live Api Data</button></Rect6></Rect>
        <Rect2></Rect2>
        <Rect3>
          <table style={{ width: "1000px" }}>
            <tr><th>name</th><th>email</th><th>phone</th><th>Action</th></tr>
            {data?.length === 0 ? "" : data?.map((item, i) => (
              <tr><td align="center">{item.name.first}</td><td align="center">{item.email}</td><td align="center">{item.phone}</td><td align="center">
                <button onClick={() => setOpen(true)}> Edit</button>
                {open ? <Popup index={i} closePopup={() => setOpen(false)} /> : null}
                
                <button onClick={() => deleteData(i)}>Delete</button></td></tr>
            ))
            }
          </table>
        </Rect3>
      </Container>
    );
  } else {
    return (
      <Container>
        <Rect>
          <Rect6>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;<button onClick={() => setHome(true)}>Home</button> &nbsp; &nbsp;<button onClick={() => setHome(false)}>Live Api Data</button></Rect6></Rect>
        <Rect2>
          <Rect4>
            <Rect3>
              <div><Form.Control
                placeholder="Name &#42;"
                aria-label="Name"
                aria-describedby="basic-addon1"
                ref={nameRef}
                style={{ width: "300px"}}
                name="name" /></div>&nbsp;&nbsp; &nbsp;
              <div>
                <Form.Control
                  placeholder="Email Address &#42;"
                  aria-label="EmailAddress"
                  aria-describedby="basic-addon1"
                  ref={emailRef}
                  style={{ width: "300px"}}
                  name="emailAddress" /></div>&nbsp;&nbsp; &nbsp;<div>
                <Form.Control
                  placeholder="Phobe &#42;"
                  aria-label="Phone"
                  aria-describedby="basic-addon1"
                  ref={phoneRef}
                  style={{ width: "300px"}}
                  name="phobe" /></div>

            </Rect3>
            <Rect3>
              <Rect41> <button style={{ width: "100px" }} onClick={() => addData(false)}>Save Data</button></Rect41>
            </Rect3>
          </Rect4>
        </Rect2>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const Rect = styled.div`
  flex: 0.07 1 0%;
  background-color: rgba(206, 206, 206,1);
  display: flex;
  flex-direction: column;
`;

const Rect2 = styled.div`
  flex: 0.9299999999999999 1 0%;
  background-color: rgba(232, 232, 232,1);
  display: flex;
  flex-direction: column;
`;

const Rect3 = styled.div`
  top: 136px;
  left: 103px;
  position: absolute;
  background-color: #E6E6E6;
  flex-direction: row;
  display: flex;
`;

const Rect4 = styled.div`
  top: 136px;
  left: 103px;
  position: absolute;
  background-color: #E6E6E6;
  flex-direction: row;
  flex-direction: column;
`;

const Rect41 = styled.div`
  top: 100px;
  left: 800px;
  position: absolute;
  background-color: #E6E6E6;
  flex-direction: row;
  flex-direction: column;
`;


const Rect32 = styled.div`
  position: absolute;
  flex-direction: row;
  display: flex;
  align: center;
`;

const Rect42 = styled.div`
  position: absolute;
  flex-direction: row;
  flex-direction: column;
`;




const Rect6 = styled.div`
padding: 30px;
  flex: 0.07 1 0%;
  background-color: rgba(206, 206, 206,1);
  display: flex;
  flex-direction: row;
  position: center;
`;

export default App;
