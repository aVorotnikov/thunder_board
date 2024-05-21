import React, { useState } from "react";
import Popup from 'reactjs-popup';
import { Search } from "react-bootstrap-icons";
import { PlusSquare } from "react-bootstrap-icons";
import Select from 'react-select';


function createTask(projectId, task) {
    fetch('http://localhost:3000/project/' + projectId + '/task', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(task)
    })
    .then((response) => {
        if (response.ok) {
          alert("Задача успешно создана")
        }
        else {
          alert("Ошибка при создании задачи")
        }
      })
}

function CreateTaskPopup(props) {
    const [task, setTask] = useState(
        {
            "name": "",
            "description": "",
            "proposedTime": 0,
            "remainingTime": 0
        }
    )
    const [userChoice, setUserChoice] = useState("")

    return (
      <Popup trigger={
            <PlusSquare size={30} style={{marginLeft: "30px"}}/>
        } 
        modal nested lockScroll closeOnDocumentClick={false} >
        {
            close => (
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
                            onClick={() =>{createTask(props.projectId, {
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

class TasksFilter extends React.Component {
    render() {
        return (
            <div className="d-flex flex-row justify-content-between" style={{ marginTop: "10px", height: "38px" }}>
                <h4 style={{ marginLeft: "10px" }}>Задачи проекта {this.props.projectName}</h4>
                <CreateTaskPopup projectId={this.props.projectId} users={this.props.users} />
                <div className="d-flex flex-row w-75" style={{ backgroundColor: "#EFEFEF"}}>
                   <div className="input-group rounded w-25 mr-3" style={{ marginRight: "30px" }}>
                        <input type="search" className="form-control rounded" 
                            placeholder="Текст задачи" aria-label="Search"
                            aria-describedby="search-addon"
                            onChange={(e) => {this.props.textFilterHandler(e.target.value)}} />
                        <span className="input-group-text border-0" id="search-addon" style={{ background: "transparent" }}>
                            <Search style={{ position: "absolute", right: "35px" }}/>
                        </span>
                    </div>
                    <Select
                        isMulti
                        name="User"
                        options={this.props.users.map((user) => ({ value: user.name, label: user.name}))}
                        className="basic-multi-select w-25 ml-3"
                        classNamePrefix="select"
                        placeholder="Исполнитель"
                        onChange={(options) => this.props.usersFilterHandler(options.map((option) => option.value))}
                    />
                </div>
            </div>
        );
    }
}

export default TasksFilter