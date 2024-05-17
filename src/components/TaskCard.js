import React from "react";
import { PencilSquare } from "react-bootstrap-icons";
import "./Common.css"
import "./TaskCard.css"

class TaskCard extends React.Component {
    render() {
        return (
            <div className="card task-card">
                <div className="card-body">
                    <h5 className="card-title truncated-text" style={{ width: 250, textAlign: "left", fontWeight: "normal" }}>{this.props.task.name}</h5>
                    <p className="card-subtitle mb-2 text-muted truncated-text" style={{ width: 200, textAlign: "left" }}>{this.props.task.user.name}</p>
                    <button className="task-edit-button">
                        <PencilSquare size={30} />
                     </button>
                    <p className="card-text line-clamp" style={{textAlign: "left"}}>{this.props.task.description}</p>
                 </div>
            </div>
        )
    }
}

export default TaskCard;