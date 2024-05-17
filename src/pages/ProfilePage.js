import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from "../components/NavBar"
import Image from 'react-bootstrap/Image';
import profile from "../assets/images/profile.png"

function ProfilePage() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  
  let getUser = () => {
    fetch('http://localhost:3000/user', {
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
      setUser(json)
    })
    .catch((path) => {
      navigate(path)
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  if (!user) {
    return null;
  }

  return (
    <div>
        <NavBar />
        <div className="d-flex flex-row" style={{ marginTop: "30px" }}>
            <Image src={profile} roundedCircle style={{ marginLeft: "30px" }} />
            <div className="align-self-center" style={{ marginLeft: "30px" }}>
                <h5>{user.name}</h5>
                <p className="text-muted">{user.email}</p>
            </div>
        </div>
    </div>
  );
}

export default ProfilePage;
