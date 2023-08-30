import { Switch, Route } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Account from "./Account";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <br></br>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h1>give it to me straight</h1>
        
          <section id="navigation">
            <a href="/">home</a>
            <a href="/free">about</a>
            <a href="/auth">gitoms</a>
          </section>
        </Col>
      </Row>

      {/* create routes here */}
      <Switch>
        <Route exact path="/" component={Account} />
        <Route exact path="/free" component={FreeComponent} />
        <ProtectedRoutes path="/auth" component={AuthComponent} />
      </Switch>
    </Container>
  );
}

export default App;
