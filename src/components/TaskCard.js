import React, { useState } from "react";
import { PencilSquare } from "react-bootstrap-icons";
import Popup from 'reactjs-popup';
import Select from 'react-select';
import "./Common.css"
import "./TaskCard.css"

function getTaskInfo(projectId, taskId, setTaskCallback) {
    fetch('http://localhost:3000/project/' + projectId + '/task/' + taskId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    .then((response) => {
      if (response.ok)
      {
        return response.json()
      }
    })
    .then((json) => {
      setTaskCallback(json)
    })
}

function saveTaskInfo(projectId, taskId, task) {
    fetch('http://localhost:3000/project/' + projectId + '/task/' + taskId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(task)
    })
    .then((response) => {
        if (response.ok)
        {
          // TODO: setState for board (change task fields)
        }
      })
}

function EditTaskPopup(props) {
    const [task, setTask] = useState(null)
    const [userChoice, setUserChoice] = useState("")

    return (
      <Popup trigger={
        <button className="task-edit-button">
            <PencilSquare size={30} />
        </button>
        } 
        modal nested lockScroll closeOnDocumentClick={false}
        onOpen={() => getTaskInfo(props.projectId, props.taskId, setTask)}>
        {
            close => ( task &&
            <div className="edit-project-task-window">
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label for="name">Название:</label>
                    <input type="text" className="form-control" id="name" defaultValue={task.name} />
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label for="userName">Исполнитель:</label>
                    <Select
                        id="userName"
                        name="user"
                        options={props.users.map((user) => ({ value: user.id, label: user.name}))}
                        className="basic-multi-select w-100 ml-3"
                        classNamePrefix="select"
                        defaultValue={{ value: task.user.id, label: task.user.name }}
                        onChange={(choice) => setUserChoice(choice)}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label for="description">Описание:</label>
                    <textarea className="form-control" rows="5" id="description" defaultValue={task.description} />
                </div>
                <div className="row"  style={{ marginBottom: "10px" }}>
                    <div data-mdb-input-init className="form-outline col-md-6">
                        <label className="form-label" for="proposedTime">Выделенное время</label>
                        <input type="number" min="0" id="proposedTime" className="form-control col-md-6" defaultValue={task.proposedTime} />
                    </div>
                    <div data-mdb-input-init className="form-outline col-md-6">
                        <label className="form-label" for="remainingTime">Потраченное время</label>
                        <input type="number" min="0" id="remainingTime" className="form-control col-md-6" defaultValue={task.remainingTime} />
                    </div>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" style={{ marginRight: "5px"}}
                            onClick={() =>{saveTaskInfo(props.projectId, props.taskId, {
                                name: document.getElementById("name").value,
                                description: document.getElementById("description").value,
                                userId: userChoice.value ? userChoice.value : task.user.id,
                                proposedTime: document.getElementById("proposedTime").value,
                                remainingTime: document.getElementById("remainingTime").value 
                            }); close()}}>
                        Сохранить
                    </button>
                    <button type="button" className="btn btn-secondary"  style={{ marginLeft: "5px"}}
                            onClick={() => close()}>
                        Закрыть
                    </button>
                </div>
            </div>
            )
        }
        </Popup>
    )
  }

class TaskCard extends React.Component {
    render() {
        return (
            <div className="card task-card">
                <div className="card-body">
                    <h5 className="card-title truncated-text" style={{ width: 250, textAlign: "left", fontWeight: "normal" }}>{this.props.task.name}</h5>
                    <p className="card-subtitle mb-2 text-muted truncated-text" style={{ width: 200, textAlign: "left" }}>{this.props.task.user.name}</p>
                    <EditTaskPopup taskId={this.props.task.id} projectId={this.props.projectId} users={this.props.users} />
                    <p className="card-text line-clamp" style={{textAlign: "left"}}>{this.props.task.description}</p>
                 </div>
            </div>
        )
    }
}

export default TaskCard;