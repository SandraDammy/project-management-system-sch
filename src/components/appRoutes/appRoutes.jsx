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
import ViewTeacherProject from "../pages/teacher/project/viewTeacherProject";
import ViewStudentProject from "../pages/student/project/viewStudentProject";
import AdminLayout from "../layouts/adminLayout";
import Admin from "../pages/admin/admin";
import Faculty from "../pages/admin/faculty/faculty";
import FacultyDept from "../pages/admin/faculty/facultyDept";
import DeptCourse from "../pages/admin/faculty/deptCourse";
import AdminUser from "../pages/admin/adminUser";
// import { useAuth } from "../context/authContext";

const AppRoutes = () => {

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
        { path: ":projectName", element: <ViewStudentProject /> },
        { path: "profile", element: <ProfileSetting /> },
      ],
    },

    {
      path: "/staff",
      element: <TeacherLayout />, // <-- Teacher layout
      children: [
        { path: "", element: <TeacherDashboard /> }, // default: /teacher
        { path: "project", element: <TeacherProject /> },
        {
          path: "project/projectProfile/:projectName",
          element: <TeacherProjectProfile />,
        },
        { path: ":projectName", element: <ViewTeacherProject /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />, 
      children: [
        { path: "", element: <Admin /> }, 
        { path: "user", element: <AdminUser/> }, 
        { path: "faculty", element: <Faculty /> }, 
        { path: "faculty/facultyDept/:id", element: <FacultyDept /> }, 
        { path: "faculty/facultyDept/deptCourse/:id", element: <DeptCourse/> }, 
      ],
    },

    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};

export default AppRoutes;
