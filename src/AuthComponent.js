import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Col, Row } from "react-bootstrap";

import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function AuthComponent() {
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");
  const [textInput, setTextInput] = useState('enter some text');
  const [responseText, setResponseText] = useState('see the results');
  const [fileContents, setFileContents] = useState('');

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://44.205.71.6:3000/', {mode:'cors'});
      const data = await response.text();
      setFileContents(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    
    const URL = "https://us-central1-aiplatform.googleapis.com/v1/projects/14033224277/locations/us-central1/endpoints/3075538532052238336:predict"
    const predjson = {"instances": [{
      "mimeType": "text/plain",
      "content": textInput
    }]};
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + fileContents,
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(predjson),
      });

      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        const a = responseData.predictions[0].confidences[0];
        const b = responseData.predictions[0].confidences[1];
        let responseOutput = '';
        let responseMessage = '';
        if (a > b) {
          if (a > 0.95){
            responseMessage = "This is very biased to the ";
            responseOutput = responseData.predictions[0].displayNames[0];
          } else if ( a > 0.85){
            responseMessage = "This is biased to the ";
            responseOutput = responseData.predictions[0].displayNames[0];
          } else {
            responseMessage = "This is not very biased ";
            responseOutput = " ";
          }
          
        } else {
          if (b > 0.95){
            responseMessage = "This is very biased to the ";
            responseOutput = responseData.predictions[0].displayNames[1];
          } else if ( b > 0.85){
            responseMessage = "This is biased to the ";
            responseOutput = responseData.predictions[0].displayNames[1];
          }
          else {
            responseMessage = "This is not very biased ";
            responseOutput = " ";
          }
        }
        setResponseText(responseMessage+responseOutput);
      } else {
        console.error('Error sending POST request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    fetchData();
    // set configurations for the API call here
    // const configuration = {
    //   method: "get",
    //   url: "https://auth-backend-server-0de28050f40a.herokuapp.com/auth-endpoint",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    // // make the API call
    // axios(configuration)
    //   .then((result) => {
    //     // assign the message in our result to the message we initialized above
    //     setMessage(result.data.message);
    //   })
    //   .catch((error) => {
    //     error = new Error();
    //   });
  }, []);

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }

  return (
    <div className="text-center">
      <h1>uncover political bias in text</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <textarea value={textInput} rows={3} onChange={handleInputChange}></textarea>
            </Col><Col>
            <textarea value={responseText} rows={3} readOnly></textarea>
            </Col>
        </Row>
        <Button type="submit" variant="primary">
        submit
      </Button>
      <br></br>
        {/* <button type="submit">Submit</button> */}
      </form>

      {/* displaying our message from our API call */}
      {/* <h3 className="text-danger">{message}</h3> */}

      {/* logout */}
      <br></br>
      <Container id="footer">
      <Row>
        <Col>
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
      </Col>
      </Row>
      </Container>
    </div>
  );
}
