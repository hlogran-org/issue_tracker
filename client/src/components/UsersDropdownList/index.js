import React from "react";
import { Form, Row } from "react-bootstrap";
import "./styles.scss";

const ALL_USERS_TEXT = "All users";

export default function UsersDropdownList(props) {
  const { users, selected, onChange, loading } = props;

  return (
    <Form.Group as={Row} className="ml-0 mr-0 align-items-center">
      <Form.Label className="mr-2">Show issues assigned to:</Form.Label>
      <Form.Control
        as="select"
        id="ddlUsers"
        className={
          "users-drop-down-list" +
          (loading ? " users-drop-down-list-loading" : "")
        }
        value={selected || ALL_USERS_TEXT}
        onChange={onChange}
      >
        {!loading && (
          <>
            <option value={""}>{ALL_USERS_TEXT}</option>
            {users.map(({ login: user }) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </>
        )}
      </Form.Control>
    </Form.Group>
  );
}
