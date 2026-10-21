import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/login";
import LandingPage from "../pages/landingPage";
import StudentLayout from "../layouts/studentLayout";
import StudentDashboard from "../pages/student/studentDashboard";
import AllProjects from "../pages/student/project/allProjects";
import Project from "../pages/student/project/project";
import ProjectProfile from "../pages/student/project/projectProfile";
import ProfileSetting from "../pages/student/profileSetting";
import LecturerLayout from "../layouts/lecturerLayout";
import LecturerDashboard from "../pages/lecturer/lecturerDashboard";
import LecturerCourse from "../pages/lecturer/course/lecturerCourse";
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
import ViewAdminProject from "../pages/admin/viewAdminProject";
import AllCourse from "../pages/lecturer/course/allCourse";
import LecturerAllProject from "../pages/lecturer/project/lecturerAllProject";
import StudentCourse from "../pages/student/course/studentCourse";
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
        { path: "course", element: <AllCourse /> },
        { path: "course/studentCourse", element: <StudentCourse /> },
        { path: "project", element: <AllProjects /> },
        { path: "myProject", element: <Project /> },
        {
          path: "myProject/projectProfile/:projectId",
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
        { path: "course", element: <AllCourse /> },
        { path: "course/lecturerCourse", element: <LecturerCourse /> },
        { path: "projects", element: <LecturerAllProject /> },
        { path: "project", element: <LecturerProject /> },
        {
          path: "project/projectProfile/:projectId",
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
        { path: ":projectName", element: <ViewAdminProject /> },

        { path: "user", element: <AdminUser /> },
        { path: "user/allLecturer/", element: <AllLecturer /> },
        { path: "user/allStudent", element: <AllStudent /> },
        { path: "faculty", element: <Faculty /> },
        { path: "faculty/facultyDept/:id", element: <FacultyDept /> },
        { path: "faculty/facultyDept/deptCourse/:id", element: <DeptCourse /> },
      ],
    },

    { path: "*", element: <Navigate to="/" /> },
  ]);

  return routes;
};

export default AppRoutes;
