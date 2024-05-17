import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import logo from "../assets/images/thunderboard_sign.png"

function NavBar() {
    const [projects, setProjects] = useState(null)
    const navigate = useNavigate()

    let getProjects = () => {
        fetch('http://localhost:3000/projects?' + new URLSearchParams({
          "page": 0,
          "per_page": 3
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
        getProjects()
      }, [])

    if (!projects) {
        return null
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#102E44' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="./">
                    <img src={logo} alt="logo" width={40} height={40}/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <div className="navbar-nav">
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Доска
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {projects.map((project, i) =>
                                    <a className="dropdown-item" href={"/board/" + project.id}>{project.name}</a>
                                )}
                            </div>
                        </div>
                        <a className="nav-item nav-link" href="/projects/">Проекты</a>
                        <a className="nav-item nav-link" href="/profile/">Профиль</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;