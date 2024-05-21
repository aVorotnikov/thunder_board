import React, {useState} from "react";
import TaskCard from "./TaskCard";
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import "./Common.css"
import "./Board.css"

function updateStatus(projectId, taskId, newStatus) {
    fetch('http://localhost:3000/project/' + projectId + '/task/' + taskId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({"status": newStatus})
    })
    .then((response) => {
        alert(response.ok)
        return response.status === 200
    })
}

function Board(props) {
    let onDragEnd = ({ source, destination }) => {
        if (destination === undefined || destination === null)
            return null

        if (destination.droppableId === source.droppableId)
            return null

        fetch('http://localhost:3000/project/' + props.project.id + '/task/' + source.index, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({"status": destination.droppableId})
        })
        .then((response) => {
            if (response.ok) {
                let tasksCopy = Array.from(props.allTasks)
                tasksCopy[tasksCopy.findIndex(task => task.id == source.index)].status = destination.droppableId
                props.setTasks(tasksCopy)
            }
            else {
                alert('Something wrong')
            }
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="container-fluid" style={{ marginTop: "30px" }}>
                <div className="row d-flex flex-nowrap board-row">
                    {props.project.statuses.map((status, i) =>
                        <Droppable droppableId={status.name}>
                            {
                                (provided) => (
                                    <div className="mx-3 board-column"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div>
                                            <h3 className="truncated-text column-name">{status.name}</h3>
                                        </div>
                                        {props.tasks.filter((task) => task.status === status.name).map((task) =>
                                            <TaskCard task={task} projectId={props.project.id} users={props.users} />
                                        )}
                                    {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    )}
                </div>
            </div>
        </DragDropContext>
    );
}

export default Board;