import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Popup from 'reactjs-popup';
import Select from 'react-select';
import { PlusSquare } from "react-bootstrap-icons";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import "./Common.css"

function MainEditPage(props) {
    return (
      <div className="edit-project-task-window" style={{ width: "300px" }}>
        <h4>Создание проекта</h4>
        <div class="form-group" style={{ marginBottom: "10px" }}>
          <label for="name">Название:</label>
          <input type="text" class="form-control" id="name"
                 defaultValue={props.name} onChange={(e) => props.setName(e.target.value)} />
        </div>
        <div class="form-group" style={{ marginBottom: "10px" }}>
          <label for="description">Описание</label>
          <textarea class="form-control" rows="5" id="description"
                    defaultValue={props.description} onChange={(e) => props.setDescription(e.target.value)} />
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

  function UserCard(props) {
    return (
        <Card style={{ marginBottom: "10px" }}>
            <Card.Title>{props.user.name}</Card.Title>
            <Card.Subtitle className="text-muted mr-5">{
                props.user.role == 'manager' ? 'Менеджер' : 'Участник'
            }</Card.Subtitle>
            {props.user.role != 'manager'
                ? <Card.Link style={{cursor: "pointer", marginLeft: "5px"}} onClick={() => {
                    let usersCopy = Array.from(props.projectUsers)
                    usersCopy[props.projectUsers.findIndex(u => u.id == props.user.id)].role = 'manager'
                    props.setProjectUsers(usersCopy)    
                }}>Назначить менеджером</Card.Link>
                : <div/>}
            <Card.Link style={{cursor: "pointer", marginLeft: "5px", color: "red"}} onClick={() => {
                props.setProjectUsers(props.projectUsers.filter(u => u.id != props.user.id))
            }}>Удалить</Card.Link>
        </Card>
    )
  }
  
  function EditProjectUsers(props) {
    const [userChoice, setUserChoice] = useState(null)
    return (
      <div className="edit-project-task-window" style={{ width: "300px", marginBottom: "10px" }}>
        <div className="d-flex" style={{ marginBottom: "10px" }}>
            <ArrowLeftCircle size={30} style={{ marginRight: "10px", cursor: "pointer" }} onClick={() => props.setPage(0)}/>
            <h4>Участники проекта</h4>
        </div>
        <div className="d-flex" style={{ marginBottom: "10px" }}>
            <Select
                id="userName"
                name="user"
                options={props.allUsers.map((user) => ({ value: user.id, label: user.name}))}
                className="basic-select w-100"
                placeholder="Участник"
                classNamePrefix="select"
                onChange={(choice) => setUserChoice(choice)}
            />
            <PlusSquare size={30} style={{ marginLeft: "10px", cursor: "pointer" }}
                onClick={() => {
                    if (userChoice && !props.projectUsers.map(u => u.id).includes(userChoice.value))
                        props.setProjectUsers(props.projectUsers.concat(
                    [
                        {
                            'name': userChoice.label,
                            'id': userChoice.value,
                            'role': 'participant'
                        }
                    ]))}}/>
        </div>
        <div>
            {props.projectUsers.map((user, i) =>
                <UserCard projectUsers={props.projectUsers} user={user} setProjectUsers={props.setProjectUsers} />
            )}
        </div>
        <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-primary" 
                    onClick={() => {props.setPage(0)}}>
                Сохранить
            </button>
        </div>
      </div>
    )
  }
  
  function EditProjectStatuses(props) {
    return (
        <div className="edit-project-task-window" style={{ width: "300px", marginBottom: "10px" }}>
            <div className="d-flex" style={{ marginBottom: "10px" }}>
                <ArrowLeftCircle size={30} style={{ marginRight: "10px", cursor: "pointer" }} onClick={() => props.setPage(0)}/>
                <h4>Статусы задач</h4>
            </div>
            <input type="text" class="form-control" style={{ marginBottom: "10px" }}
                 defaultValue={props.statuses[0].name} onChange={(e) => {}} />

            {props.statuses.slice(1, props.statuses.length - 1).map((status, i) =>
                <input type="text" class="form-control" style={{ marginBottom: "10px" }}
                    defaultValue={status.name} onChange={(e) => {}} />
            )}

            <div className="d-flex justify-content-center" style={{ marginBottom: "10px" }}>
                <PlusSquare size={30} style={{ cursor: "pointer" }}
                    onClick={() => {}}/>
            </div>

            <input type="text" class="form-control" style={{ marginBottom: "10px" }}
                 defaultValue={props.statuses[props.statuses.length - 1].name} onChange={(e) => {}} />

            <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-primary" 
                    onClick={() => {props.setPage(0)}}>
                    Сохранить
                </button>
            </div>
        </div>
    )
  }
  
  function EditProject(props) {
    const [step, setStep] = useState(0)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [projectUsers, setProjectUsers] = useState([])
    const [statuses, setStatuses] = useState([
        {
            'name': 'Создана',
            'type': 'initial'
        },
        {
            'name': 'Закрыта',
            'type': 'final'
        }
    ])
    if (step === 0)
      return <MainEditPage closeCallback={props.closeCallback}
                           name={name}
                           description={description}
                           projectUsers={projectUsers}
                           setPage={setStep} setDescription={setDescription} setName={setName} />
    else if (step === 1)
      return <EditProjectUsers setPage={setStep} allUsers={props.users} projectUsers={projectUsers} setProjectUsers={setProjectUsers} />
    else if (step === 2)
      return <EditProjectStatuses setPage={setStep} statuses={statuses} setStatuses={setStatuses} />
  }
  
  function CreateProjectPopup(props) {
    return (
        <Popup trigger={<PlusSquare size={30} style={{ marginLeft: "30px", cursor: "pointer" }} />} modal nested lockScroll closeOnDocumentClick={false}>
        {
            close => (
                <EditProject closeCallback={close} users={props.users} />
            )
        }
        </Popup>
      )
  }
  
export default CreateProjectPopup;
