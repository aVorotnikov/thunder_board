import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import BoardPage from './pages/BoardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function RedirectToProjects()
{
  const navigate = useNavigate();
  React.useEffect(_ => {
    navigate('/projects')
  })
  return <div></div>
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <RedirectToProjects />
            </PrivateRoute>}
      />
      <Route
        path="login"
        element={<LoginPage />}
      />
      <Route
        path="board/:projectId"
        element={
          <PrivateRoute>
            <BoardPage />
          </PrivateRoute>}
      />
      <Route
        path="projects"
        element={
          <PrivateRoute>
            <ProjectsPage />
          </PrivateRoute>}
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>}
      />
      <Route
        path="error"
        element={<ErrorPage />}
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
