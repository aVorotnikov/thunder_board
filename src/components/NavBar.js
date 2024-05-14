import React from "react";
import logo from "../assets/images/thunderboard_sign.png"

class NavBar extends React.Component {
    render() {
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
                                    <a className="dropdown-item" href="/board/2">Другой проект</a>
                                    <a className="dropdown-item" href="/board/3">Ещё один проект</a>
                                    <a className="dropdown-item" href="/board/4">И ещё один</a>
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
}

export default NavBar;