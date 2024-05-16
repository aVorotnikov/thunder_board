import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar"
import ProjectsFilter from "../components/ProjectsFilter";
import ProjectsTable from "../components/ProjectsTable";
import { PaginationControl } from "react-bootstrap-pagination-control";

function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [page, setPage] = useState(1)

  const navigate = useNavigate()

  const perPage = 8

  let getProjects = (page) => {
    fetch('http://localhost:3000/projects?' + new URLSearchParams({
      "page": page - 1,
      "per_page": perPage
    }), {
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
      setProjects(json.projects)
    })
    .catch((path) => {
      navigate(path)
    })
  }

  useEffect(() => {
    getProjects(1)
  }, [])

  return (
    <div>
      <NavBar />
      <ProjectsFilter />
      <ProjectsTable projects={projects} />
      <PaginationControl
        page={page}
        between={2}
        total={2} // TODO: получать количество проектов
        limit={perPage}
        last={true}
        changePage={(page) => {
          setPage(page)
          setProjects(getProjects(page))
        }}
        ellipsis={1}
      />
    </div>
  );
}

export default ProjectsPage;
