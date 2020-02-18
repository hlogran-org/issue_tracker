import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UsersDropdownList from "./components/UsersDropdownList";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await fetch("/users");
      const users = await response.json();
      setUsers(users);
      console.log(users);
    })();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <UsersDropdownList users={users} />
        </Col>
      </Row>
      <Row>
        <Col>Issues will be displayed here</Col>
      </Row>
    </Container>
  );
}
export default App;
