import React, { useEffect, useState } from "react";
import axios from "axios";
import PrintComponent from "./PrintComponent";
import { Container, Col, Row } from "react-bootstrap";


export default function FreeComponent() {
  // set an initial state for the message we will receive after the API call
  const [message, setMessage] = useState("");

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "get",
      url: "https://auth-backend-server-0de28050f40a.herokuapp.com/free-endpoint",
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <div>
      <h1 className="text-center">About</h1>

      {/* displaying our message from our API call */}
      {/* <h3 className="text-center text-danger">{message}</h3> */}
      <p>
        This toy uses a BERT-like model to look for political bias in text. The model was trained on text from congressional hearings/meetings and looks for similarities in word choice and order to determine if the text is more similar to a Democrat or Republican. The model is not very accurate and is only meant to be a demonstration of the idea.
        </p>
        <p>
        In the coming stages, a larger corpus will be obtained and used to further fine-tune the model. Also, the app will access current headlines and blurbs from major publications and automatically classify them.
        </p>
        <p>
          If you like this project, please consider donating to help with the cost of hosting and development.
        </p>
      {/* <PrintComponent /> */}
      <Row>
      <Col>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
      <input type="hidden" name="hosted_button_id" value="PT6XDLZL6K8ES" />
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
      <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
      </form>
      </Col>
      </Row>
    </div>
  );
}
