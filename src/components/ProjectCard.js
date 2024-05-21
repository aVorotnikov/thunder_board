import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Popup from 'reactjs-popup';
import Select from 'react-select';
import "./Common.css"

function getProjectInfo() {

}

function MainEditPage(props) {
  return (
    <div className="edit-project-task-window" style={{ width: "300px" }}>
      <h4>Создание проекта</h4>
      <div class="form-group" style={{ marginBottom: "10px" }}>
        <label for="name">Название:</label>
        <input type="text" class="form-control" id="name" />
      </div>
      <div class="form-group" style={{ marginBottom: "10px" }}>
        <label for="description">Описание</label>
        <textarea class="form-control" rows="5" id="description" />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Card.Link style={{cursor: "pointer"}} onClick={() => props.setPage(1)}>Участники проекта</Card.Link>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Card.Link style={{cursor: "pointer"}} onClick={() => props.setPage(2)}>Настроить статусы задач</Card.Link>
      </div>
      <div class="d-flex justify-content-center">
          <button type="button" className="btn btn-primary" style={{ marginRight: "5px"}}
                  onClick={() => props.closeCallback()}>
              Сохранить
          </button>
          <button type="button" className="btn btn-secondary"  style={{ marginLeft: "5px"}}
                  onClick={() => props.closeCallback()}>
              Закрыть
          </button>
      </div>
    </div>
  )
}

function EditProjectUsers(props) {
  return (
    <div>

    </div>
  )
}

function EditProjectStatuses(props) {
  return (
    <div>

    </div>
  )
}

function EditProject(props) {
  const [step, setStep] = useState(0)
  if (step === 0)
    return <MainEditPage closeCallback={props.closeCallback} setPage={setStep} />
  else if (step === 1)
    return <EditProjectUsers />
  else if (step === 2)
    return <EditProjectStatuses />
}

function CreateProjectPopup(props) {
  
}

function EditProjectPopup(props) {
  return (
    <Popup trigger={<Card.Link style={{cursor: "pointer"}}>Подробнее</Card.Link>} 
          modal nested lockScroll closeOnDocumentClick={false}
          onOpen={getProjectInfo}>
          {
            close => (
              <EditProject closeCallback={close} />
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