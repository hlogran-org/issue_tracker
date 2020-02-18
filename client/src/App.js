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
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      let users = [];
      let issues = [];

      //get query parameter
      const { who } = queryString.parseUrl(window.location.href).query;
      setWho(who);

      //fetch users
      let response = await fetch("/users");
      setLoadingUsers(false);
      if (response.ok) {
        users = await response.json();
        setUsers(users);
      } else {
        const data = await response.json();
        setError(data.error);
        setLoadingIssues(false);
        return;
      }

      //check if provided user is valid
      const validUser = !who || users.some(user => user.login === who);
      if (!validUser) {
        setError(`The user ${who} does not exist`);
      }

      //fetch issues
      const url = who && validUser ? `/users/${who}/issues` : "/issues";
      setLoadingIssues(false);
      response = await fetch(url);
      if (response.ok) {
        issues = await response.json();
        setIssues(issues);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    })();
  }, []);

  const onChangeUser = event => {
    const who = event.target.value;
    setWho(who);
    window.location.search = who ? `who=${who}` : "";
  };

  return (
    <>
      {error && (
        <Alert
          variant={"danger"}
          dismissible
          onClose={setError.bind(this, null)}
        >
          {error}
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
