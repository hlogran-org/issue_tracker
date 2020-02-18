import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import queryString from "query-string";
import UsersDropdownList from "./components/UsersDropdownList";
import Issue from "./components/Issue";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [who, setWho] = useState(null);

  useEffect(() => {
    (async () => {
      //get query parameter
      const { who } = queryString.parseUrl(window.location.href).query;
      setWho(who);

      //fetch users
      let response = await fetch("/users");
      const users = await response.json();
      setUsers(users);

      //fetch issues
      const url = who ? `/users/${who}/issues` : "/issues";
      response = await fetch(url);
      const issues = await response.json();
      setIssues(issues);
    })();
  }, []);

  const onChangeUser = event => {
    const who = event.target.value;
    setWho(who);
    window.location.search = who ? `who=${who}` : "";
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <UsersDropdownList
            users={users}
            selected={who}
            onChange={onChangeUser}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {issues.map(issue => (
            <Issue key={issue.id} issue={issue} />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
export default App;
