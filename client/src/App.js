import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import queryString from "query-string";
import UsersDropdownList from "./components/UsersDropdownList";
import Issue from "./components/Issue";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [issues, setIssues] = useState([]);
  const [who, setWho] = useState(null);
  const [validUser, setValidUser] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingIssues, setLoadingIssues] = useState(true);

  useEffect(() => {
    (async () => {
      //get query parameter
      const { who } = queryString.parseUrl(window.location.href).query;
      setWho(who);

      //fetch users
      let response = await fetch("/users");
      const users = await response.json();
      setUsers(users);
      setLoadingUsers(false);

      //check if provided user is valid
      const validUser = !who || users.some(user => user.login === who);
      setValidUser(validUser);

      //fetch issues
      const url = who && validUser ? `/users/${who}/issues` : "/issues";
      response = await fetch(url);
      const issues = await response.json();
      setIssues(issues);
      setLoadingIssues(false);
    })();
  }, []);

  const onChangeUser = event => {
    const who = event.target.value;
    setWho(who);
    window.location.search = who ? `who=${who}` : "";
  };

  return (
    <>
      {!validUser && (
        <Alert
          variant={"danger"}
          dismissible
          onClose={() => {
            setValidUser(true);
          }}
        >
          The user <b>{who}</b> does not exist
        </Alert>
      )}
      <Container className="mt-5">
        <Row>
          <Col>
            <UsersDropdownList
              users={users}
              selected={who}
              onChange={onChangeUser}
              loading={loadingUsers}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {loadingIssues ? (
              <Loading />
            ) : (
              issues.map(issue => <Issue key={issue.id} issue={issue} />)
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default App;
