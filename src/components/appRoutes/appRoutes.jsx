import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/login";
import LandingPage from "../pages/landingPage";
import StudentDashboard from "../pages/student/studentDashboard";
import TeacherDashboard from "../pages/teacher/teacherDashboard";
import Profile from "../pages/student/Profile";
import Project from "../pages/student/project/project";
import ProjectProfile from "../pages/student/project/projectProfile";
// import { useAuth } from "../context/authContext";

const AppRoutes = () => {
  // const { user } = useAuth();

  const routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/student", element: <StudentDashboard /> },
    
    { path: "/student/project", element: <Project /> },
    { path: "/student/project/projectProfile/:projectName", element: <ProjectProfile/> },



    { path: "/student/profile", element: <Profile/> },
    
    { path: "/teacher", element: <TeacherDashboard/> },
    // {
    //   path: "/student",
    //   element:
    //     user?.role === "student" ? (
    //       <StudentDashboard />
    //     ) : (
    //       <Navigate to="/login" />
    //     ),
    // },
    // {
    //   path: "/teacher",
    //   element:
    //     user?.role === "teacher" ? (
    //       <TeacherDashboard/>
    //     ) : (
    //       <Navigate to="/login" />
    //     ),
    // },
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};

export default AppRoutes;