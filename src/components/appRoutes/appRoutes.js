import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/login";
import LandingPage from "../pages/landingPage";
import StudentDashboard from "../pages/student/studentDashboard"
import TeacherDashboard from "../pages/teacher/teacherDashboard"
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { user } = useAuth();

  const routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },

    {
      path: "/student",
      element:
        user?.role === "student" ? (
          <StudentDashboard />
        ) : (
          <Navigate to="/login" />
        ),
    },
    {
      path: "/teacher",
      element:
        user?.role === "teacher" ? (
          <TeacherDashboard />
        ) : (
          <Navigate to="/login" />
        ),
    },
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};

export default AppRoutes;