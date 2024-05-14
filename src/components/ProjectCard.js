import Card from "react-bootstrap/Card";
import "./Common.css"

function ProjectCard() {
  return (
    <Card style={{ width: "18rem", height: "12rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title className="truncated-text">Название проекта проекта проекта</Card.Title>
        <Card.Text className="line-clamp">
          Очень очень длинное описание проекта 12345678 очень длинное. Очень очень длинное описание проекта 12345678 очень длинное.
        </Card.Text>
        <Card.Link href="#">Подробнее</Card.Link>
        <Card.Link href="/board/1">Доска</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;