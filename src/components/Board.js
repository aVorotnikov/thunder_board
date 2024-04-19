import React from "react";
import TaskCard from "./TaskCard";
import "./Common.css"
import "./Board.css"

class Board extends React.Component {
    render() {
        return (
            <div className="container-fluid" style={{ marginTop: "30px" }}>
                <div className="row d-flex flex-nowrap board-row">
                    <div className="mx-3 board-column">
                        <div>
                            <h3 className="truncated-text column-name">Создана</h3>
                        </div>
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </div>
                    <div className="mx-3 board-column">
                        <div>
                            <h3 className="truncated-text column-name">В работе</h3>
                        </div>
                        <TaskCard />
                    </div>
                    <div className="mx-3 board-column">
                        <div>
                            <h3 className="truncated-text column-name">На проверке</h3>
                        </div>
                        <TaskCard />
                        <TaskCard />
                    </div>
                    <div className="mx-3 board-column">
                        <div>
                            <h3 className="truncated-text column-name">Закрыта</h3>
                        </div>
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </div>
                    <div className="mx-3 board-column">
                        <div>
                            <h3 className="truncated-text column-name">Ваще жесть закрыта закрыта закрыта</h3>
                        </div>
                        <TaskCard />
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;