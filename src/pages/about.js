import React from 'react';
  
const About = () => {
  return (
    <div
      style={{
        // display: 'flex',
        // justifyContent: 'Right',
        // alignItems: 'Left',
        height: '100vh',
      }}
    >
      <h1>About</h1>
      <p align="left"> This toy uses a BERT-like model to look for political bias in text. The model was trained on text from congressional hearings/meetings and looks for similarities in word choice and order to determine if the text is more similar to a Democrat or Republican. The model is not very accurate and is only meant to be a demonstration of the idea.
        <br></br>
        In the coming stages, a larger corpus will be obtained and used to further fine-tune the model. Also, the app will access current headlines and blurbs from major publications and automatically classify them.</p>
    </div>
  );
};
  
export default About;