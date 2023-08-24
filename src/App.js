// import logo from './logo.svg';
import logo from './logo.ico'
import './App.css';
import React, { useState } from 'react';

function App() {
  const [textInput, setTextInput] = useState('enter some text');
  const [responseText, setResponseText] = useState('see the results');

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
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
          'Authorization': 'Bearer ya29.a0AfB_byCZFBfYhea9Zo9n8nWDT-j4wrmxha2XigKuRvOzXzL3zSIU4QnU7pNQcB_eGNmsl0MaU_su8nxyoCig22UUYHbdCgc7trqVz8mVV_oEZvWilR7fR6dnS1DMSNck95gdX-meDt7e4TOQI-PlBoni0ymWes7KHkAmCmwh-eH72eIaCgYKASESARASFQHsvYls5Wp2wyaCPDAXvkxgaFDT8A0182',
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
          if (a > 0.85){
            responseMessage = "This is very biased to the "
          } else {
            responseMessage = "This is biased to the "
          }
          responseOutput = responseData.predictions[0].displayNames[0];
        } else {
          if (b > 0.85){
            responseMessage = "This is very biased to the "
          } else {
            responseMessage = "This is biased to the "
          }
          responseOutput = responseData.predictions[0].displayNames[1];
        }
        setResponseText(responseMessage+responseOutput);
      } else {
        console.error('Error sending POST request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <h1>give it to me straight</h1>
    <h2>uncover political bias in text</h2>
    {/* <div className="App"> */}
    <div className='container'>
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <form onSubmit={handleSubmit}>
      <div className='textbox-container'>
            <textarea value={textInput} rows={3} onChange={handleInputChange}></textarea>
            <textarea value={responseText} rows={3} readOnly></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>

    </div>
    </>
  );
}

export default App;
