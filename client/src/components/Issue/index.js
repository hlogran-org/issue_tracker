import React from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import "./styles.scss";

export default function Issue(props) {
  const {
    issue: {
      score,
      title,
      number,
      user: { login: creator },
      created_at,
      labels,
      html_url
    }
  } = props;

  const when = getRelativeDate(created_at);
  const overdue = score > 100;

  return (
    <div className="issue" onClick={window.open.bind(window, html_url)}>
      <div className={"issue-score" + (overdue ? " issue-score-overdue" : "")}>
        {score}
      </div>
      <div className="issue-body">
        <Container fluid>
          <Row>
            <Col md={7} className="d-flex flex-column justify-content-center">
              <div className="issue-body-item issue-body-item-title">
                {title}
              </div>
              <div className="issue-body-item issue-body-item-info">{`#${number} opened ${when} by ${creator}`}</div>
            </Col>
            <Col
              md={5}
              className="d-none d-sm-flex align-items-center"
              style={{ flexWrap: "wrap" }}
            >
              {labels.map(label => (
                <Badge key={label.id}>{label.name}</Badge>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

function getRelativeDate(created_at) {
  const difference = new Date() - new Date(created_at);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  if (days > 0) {
    return `${days} days ago`;
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  if (hours > 0) {
    return `${hours} hours ago`;
  }

  const minutes = Math.floor(difference / (1000 * 60));
  if (minutes > 0) {
    return `${minutes} minutes ago`;
  }

  const seconds = Math.floor(difference / 1000);
  if (seconds > 0) {
    return `${seconds} seconds ago`;
  }

  return "now";
}
