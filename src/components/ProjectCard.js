import Card from "react-bootstrap/Card";
import "./Common.css"

function ProjectCard(props) {
  return (
    <Card style={{ width: "18rem", height: "12rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title className="truncated-text">{props.title}</Card.Title>
        <Card.Text className="line-clamp">
          {props.description}
        </Card.Text>
        <Card.Link href="#">Подробнее</Card.Link>
        <Card.Link href={"/board/" + props.projectId}>Доска</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;