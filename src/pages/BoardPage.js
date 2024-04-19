import React from "react";
import { useParams } from 'react-router-dom';

import NavBar from "../components/NavBar"
import TasksFilter from "../components/TasksFilter";
import Board from "../components/Board";

function BoardPage() {
  let { projectId } = useParams();
  return (
    <div>
      <NavBar />
      <TasksFilter projectName={projectId} />
      <Board />
    </div>
  );
}

export default BoardPage;
