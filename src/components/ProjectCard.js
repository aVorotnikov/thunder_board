import Card from "react-bootstrap/Card";
import Popup from 'reactjs-popup';
import Select from 'react-select';
import "./Common.css"

function getProjectInfo() {

}

function EditProjectPopup(props) {
  return (
    <Popup trigger={<Card.Link style={{cursor: "pointer"}}>Подробнее</Card.Link>} 
           modal nested lockScroll closeOnDocumentClick={false}
           onOpen={getProjectInfo}>
          {
            close => (
              <div className="edit-project-window">
                <div class="form-group">
                  <label for="name">Название:</label>
                  <input type="text" class="form-control" id="name" />
                </div>
                <div class="form-group">
                  <label for="userName">Исполнитель:</label>
                  <Select
                        id="userName"
                        name="user"
                        options={[{ value: 'chocolate', label: 'Chocolate' },
                        { value: 'strawberry', label: 'Strawberry' },
                        { value: 'vanilla', label: 'Vanilla' }]}
                        className="basic-multi-select w-100 ml-3"
                        classNamePrefix="select"
                        placeholder="Участник"
                    />
                </div>
                <div class="form-group">
                  <label for="description">Название:</label>
                  <textarea class="form-control" rows="5" id="description" />
                </div>
              </div>
            )
          }
        </Popup>
  )
}

function ProjectCard(props) {
  return (
    <Card style={{ width: "18rem", height: "12rem", margin: "10px" }}>
      <Card.Body>
        <Card.Title className="truncated-text">{props.title}</Card.Title>
        <Card.Text className="line-clamp">
          {props.description}
        </Card.Text>
        <EditProjectPopup />
        <Card.Link href={"/board/" + props.projectId}>Доска</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;