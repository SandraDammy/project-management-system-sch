import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/login";
import LandingPage from "../pages/landingPage";
import StudentLayout from "../layouts/studentLayout";
import StudentDashboard from "../pages/student/studentDashboard";
import Project from "../pages/student/project/project";
import ProjectProfile from "../pages/student/project/projectProfile";
import ProfileSetting from "../pages/student/profileSetting";
import TeacherLayout from "../layouts/teacherLayout";
import TeacherDashboard from "../pages/teacher/teacherDashboard";
import TeacherProject from "../pages/teacher/project/teacherProject";
import TeacherProjectProfile from "../pages/teacher/project/teacherProjectProfile";
import AllProject from "../pages/project/allProject";
import ViewProject from "../pages/project/viewProject";
import ProjectLayout from "../layouts/projectLayout";
// import { useAuth } from "../context/authContext";

const AppRoutes = () => {
  // const { user } = useAuth();

  // const routes = useRoutes([
  //   { path: "/", element: <LandingPage /> },
  //   { path: "/login", element: <Login /> },
  //   { path: "/student", element: <StudentDashboard /> },
  //   { path: "/student/project", element: <Project /> },
  //   { path: "/student/project/projectProfile/:projectName", element: <ProjectProfile/> },
  //   { path: "/student/profile", element: <Profile/> },

  //   { path: "/teacher", element: <TeacherDashboard/> },
  //   { path: "/teacher/project", element: <TeacherDashboard/> },
  //   // {
  //   //   path: "/student",
  //   //   element:
  //   //     user?.role === "student" ? (
  //   //       <StudentDashboard />
  //   //     ) : (
  //   //       <Navigate to="/login" />
  //   //     ),
  //   // },
  //   // {
  //   //   path: "/teacher",
  //   //   element:
  //   //     user?.role === "teacher" ? (
  //   //       <TeacherDashboard/>
  //   //     ) : (
  //   //       <Navigate to="/login" />
  //   //     ),
  //   // },
  //   { path: "*", element: <Navigate to="/" /> },
  // ]);

  const routes = useRoutes([
    { path: "/login", element: <Login /> },

    {
      path: "/",
      element: <ProjectLayout />, // <-- Layout includes navbar + footer
      children: [
        { path: "", element: <LandingPage /> },
        { path: "/projects", element: <AllProject /> },
        {
          path: "projects/:projectName",
          element: <ViewProject />,
        },
      ],
    },

    {
      path: "/student",
      element: <StudentLayout />, // <-- Layout includes sidebar + navbar
      children: [
        { path: "", element: <StudentDashboard /> },
        { path: "project", element: <Project /> },
        {
          path: "project/projectProfile/:projectName",
          element: <ProjectProfile />,
        },
        { path: "profile", element: <ProfileSetting /> },
      ],
    },

    {
      path: "/teacher",
      element: <TeacherLayout />, // <-- Teacher layout
      children: [
        { path: "", element: <TeacherDashboard /> }, // default: /teacher
        { path: "project", element: <TeacherProject /> },
        {
          path: "project/projectProfile/:projectName",
          element: <TeacherProjectProfile />,
        },
      ],
    },

    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};

export default AppRoutes;
