// import logo from './logo.svg';
import logo from './logo.ico'
import './App.css';
import React, { useState } from 'react';

function App() {
  const [textInput, setTextInput] = useState('enter some text');
  const [responseText, setResponseText] = useState('see the results');

  const [fileContents, setFileContents] = useState('');

  const handleInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    fetch('http://44.205.71.6:3000/', {mode:'cors'})
    .then(response => response.text())
    .then(data => setFileContents(data))
    .catch(error => console.error('Error fetching data:', error));
    // console.log("FILECONTENTS")
    console.log('Bearer ' + fileContents)

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
