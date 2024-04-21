import React from "react";
import logo from "../assets/images/logo.png"
import "./LoginForm.css"

function LoginForm() {
  return (
        <form className="Auth-form w-25">
          <div className="Auth-form-content">
            <img src={logo} alt="logo" className="img-fluid"/>
            <div className="form-group mt-3">
              <label>Почта</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Введите email"
              />
            </div>
            <div className="form-group mt-3" style={{ marginBottom: "35px" }}>
              <label>Пароль</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Введите пароль"
              />
            </div>
            <div className="d-grid gap-2 mt-3" style={{ marginBottom: "30px" }}>
              <button type="submit" className="btn btn-primary">
                Войти
              </button>
            </div>
          </div>
      </form>
  );
}

export default LoginForm;