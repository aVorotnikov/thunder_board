import { Navigate } from "react-router-dom"
import LoginForm from "../components/LoginForm";

function LoginPage() {
  let isLoggedIn = localStorage.getItem('loggedIn');
  if (isLoggedIn == "true") {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
