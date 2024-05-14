import React from "react";
import NavBar from "../components/NavBar"
import Image from 'react-bootstrap/Image';
import profile from "../assets/images/profile.png"

function ProfilePage() {
  return (
    <div>
        <NavBar />
        <div className="d-flex flex-row" style={{ marginTop: "30px" }}>
            <Image src={profile} roundedCircle style={{ marginLeft: "30px" }} />
            <div className="align-self-center" style={{ marginLeft: "30px" }}>
                <h5>Иванов Иван</h5>
                <p className="text-muted">ivanov@company.ru</p>
            </div>
        </div>
    </div>
  );
}

export default ProfilePage;
