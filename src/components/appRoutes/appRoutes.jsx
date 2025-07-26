import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/login";
import LandingPage from "../pages/landingPage";
import StudentLayout from "../layouts/studentLayout";
import StudentDashboard from "../pages/student/studentDashboard";
import Project from "../pages/student/project/project";
import ProjectProfile from "../pages/student/project/projectProfile";
import ProfileSetting from "../pages/student/profileSetting";
import LecturerLayout from "../layouts/lecturerLayout";
import LecturerDashboard from "../pages/lecturer/lecturerDashboard";
import LecturerProject from "../pages/lecturer/project/lecturerProject";
import LecturerProjectProfile from "../pages/lecturer/project/lecturerProjectProfile";
import AllProject from "../pages/project/allProject";
import ViewProject from "../pages/project/viewProject";
import ProjectLayout from "../layouts/projectLayout";
import ViewLecturerProject from "../pages/lecturer/project/viewLecturerProject";
import ViewStudentProject from "../pages/student/project/viewStudentProject";
import AdminLayout from "../layouts/adminLayout";
import Admin from "../pages/admin/admin";
import Faculty from "../pages/admin/faculty/faculty";
import FacultyDept from "../pages/admin/faculty/facultyDept";
import DeptCourse from "../pages/admin/faculty/deptCourse";
import AdminUser from "../pages/admin/user/adminUser";
import AllLecturer from "../pages/admin/user/allLecturer";
import AllStudent from "../pages/admin/user/allStudent";
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
      path: "/lecturer",
      element: <LecturerLayout />, // <-- Lecturer layout
      children: [
        { path: "", element: <LecturerDashboard /> }, // default: /Lecturer
        { path: "project", element: <LecturerProject /> },
        {
          path: "project/projectProfile/:projectName",
          element: <LecturerProjectProfile />,
        },
        { path: ":projectName", element: <ViewLecturerProject /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />, 
      children: [
        { path: "", element: <Admin /> }, 
        { path: "user", element: <AdminUser/> }, 
        { path: "user/allLecturer/", element: <AllLecturer/> }, 
        { path: "user/allStudent", element: <AllStudent/> }, 
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
