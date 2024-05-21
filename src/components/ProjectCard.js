import React from "react";
import Card from "react-bootstrap/Card";
import CreateProjectPopup from "./CreateProjectPopup";
import "./Common.css"

function ProjectCard(props) {
  return (
    <Card style={{ width: "18rem", height: "12rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title className="truncated-text">{props.title}</Card.Title>
        <Card.Text className="line-clamp">
          {props.description}
        </Card.Text>
        <CreateProjectPopup projectId={props.projectId} />
        <Card.Link href={"/board/" + props.projectId}>Доска</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;