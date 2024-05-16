import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import NavBar from "../components/NavBar"
import TasksFilter from "../components/TasksFilter";
import Board from "../components/Board";

function BoardPage() {
  let { projectId } = useParams();
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState(null)
  const navigate = useNavigate()

  let getProject = () => {
    fetch('http://localhost:3000/project/' + projectId, {
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
      else if (response.status === 401)
      {
        localStorage.setItem('loggedIn', false)
        throw '/login'
      }
      else
      {
        throw '/error'
      }
    })
    .then((json) => {
      setProject(json)
    })
    .catch((path) => {
      navigate(path)
    })
  }

  let getTasks = () => {
    fetch('http://localhost:3000/project/' + projectId + "/tasks", {
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
      else if (response.status === 401)
      {
        localStorage.setItem('loggedIn', false)
        throw '/login'
      }
      else
      {
        throw '/error'
      }
    })
    .then((json) => {
      setTasks(json.tasks)
    })
    .catch((path) => {
      navigate(path)
    })
  }

  useEffect(() => {
    getProject()
    getTasks()
  }, [])

  if (!project || !tasks) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <TasksFilter projectName={project.name} />
      <Board project={project} tasks={tasks} />
    </div>
  );
}

export default BoardPage;
