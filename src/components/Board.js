import React from "react";
import TaskCard from "./TaskCard";
import "./Common.css"
import "./Board.css"

class Board extends React.Component {
    render() {
        return (
            <div className="container-fluid" style={{ marginTop: "30px" }}>
                <div className="row d-flex flex-nowrap board-row">
                    {this.props.project.statuses.map((status, i) =>
                         <div className="mx-3 board-column">
                            <div>
                                <h3 className="truncated-text column-name">{status.name}</h3>
                            </div>
                            {this.props.tasks.filter((task) => task.status === status.name).map((task) =>
                                <TaskCard task={task} projectId={this.props.project.id} users={this.props.users} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Board;