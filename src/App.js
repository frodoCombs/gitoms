// import logo from './logo.svg';
import logo from './logo.ico'
import './App.css';
import React, { useState } from 'react';

function App() {
  const [textInput, setTextInput] = useState('');
  const [responseText, setResponseText] = useState('');

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
          'Authorization': 'Bearer ya29.a0AfB_byDMRTA6yzk4YU7oC6eVnU4uVosZbI-gTlhOygG6lAqFOgkSwLXOPsPkiIIhRcM9VPTWNdbYUbSKUZQvSA2deGjzSYkSF4ZpiAbq6_htKNuljni4K4qkrHQt_BXNYTHoMkRMVrKiM9Crvggho4XIpPWUfpO072hiqhPE3EtYOBcaCgYKARMSARASFQHsvYlswzEEf0YyB9tcHHJwwytDyg0182',
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(predjson),
      });

      if (response.ok) {
        const responseData = await response.json()
        const a = responseData.predictions[0].confidences[0];
        const b = responseData.predictions[0].confidences[1];
        let responseOutput = '';
        if (a > b) {
          console.log("a is greater than b");
          responseOutput = responseData.predictions[0].displayNames[0];
        } else {
          console.log("b is greater than a");
          responseOutput = responseData.predictions[0].displayNames[1];
        }
        // console.log(responseOutput);
        setResponseText(responseOutput);
        // setResponseText(JSON.stringify(responseData));
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
      <div className='textbox-container'>
      <form onSubmit={handleSubmit}>
        <label>
          {/* Enter text: */}
          <textarea value={textInput} rows={3} onChange={handleInputChange}></textarea>
          <textarea value={responseText} rows={3} readOnly></textarea>
          {/* <input type="text" value={textInput} onChange={handleInputChange} /> */}
        </label>
        <button type="submit">Submit</button>
      </form>
      {responseText && <p>Response: {responseText}</p>}
    </div>
    </div>
    </>
  );
}

export default App;
