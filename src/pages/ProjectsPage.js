import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar"
import ProjectsFilter from "../components/ProjectsFilter";
import ProjectsTable from "../components/ProjectsTable";
import { PaginationControl } from "react-bootstrap-pagination-control";

function ProjectsPage() {
  const [projects, setProjects] = useState(null)
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState(null)
  const [usersFilter, setUsersFilter] = useState([])
  const [textFilter, setTextFilter] = useState('')

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

  let getUsers = () => {
    fetch('http://localhost:3000/users', {
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
      setUsers(json.users)
    })
    .catch((path) => {
      navigate(path)
    })
  }

  useEffect(() => {
    getProjects(1)
    getUsers()
  }, [])

  let filteredProjects = () => {
    return projects.filter((project) => (project.name.toLowerCase().includes(textFilter.toLowerCase()) ||
                                         project.description.toLowerCase().includes(textFilter.toLowerCase())) &&
                                        (usersFilter.length == 0 || usersFilter.includes(project.user.name) )
                       )
  }

  if (!projects || !users) {
    return null
  }

  return (
    <div>
      <NavBar />
      <ProjectsFilter users={users} usersFilterHandler={setUsersFilter} textFilterHandler={setTextFilter} />
      <ProjectsTable projects={filteredProjects()} />
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
