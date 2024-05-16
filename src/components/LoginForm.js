import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import logo from "../assets/images/logo.png"
import "./LoginForm.css"

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const logIn = () => {
    fetch('http://localhost:3000/log-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "email": email, "password": password }),
    })
    .then((response) => {
       if (response.ok) {
        return response.json()
       }
       else {
        throw 'Неверный email или пароль'
       }
    })
    .then((json) =>{
      localStorage.setItem('loggedIn', "true");
      localStorage.setItem('token', json.token);
      navigate('/')
    })
    .catch((error) => {
        setPasswordError(error ? error : 'Что-то пошло не так, попробуйте позже')
      })
  }

  const onLoginButtonClick = () => {
    setEmailError('')
    setPasswordError('')

    if ('' === email) {
      setEmailError('Введите email')
      return
    }
  
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Некорректный email')
      return
    }
    logIn()
  }

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
                onChange={e => setEmail(e.target.value)}
              />
              <label style={{color: 'red'}}>{emailError}</label>
            </div>
            <div className="form-group mt-3" style={{ marginBottom: "35px" }}>
              <label>Пароль</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Введите пароль"
                onChange={e => setPassword(e.target.value)}
              />
              <label style={{color: 'red'}}>{passwordError}</label>
            </div>
            <div className="d-grid gap-2 mt-3" style={{ marginBottom: "30px" }}>
              <button type="button" className="btn btn-primary" onClick={onLoginButtonClick}>
                Войти
              </button>
            </div>
          </div>
      </form>
  );
}

export default LoginForm;