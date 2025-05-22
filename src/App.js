import AppRoutes from "./components/appRoutes/appRoutes";
import Navbar from "./components/common/navbar/navbar";
import Sidebar from "./components/common/sidebar/sidebar";

function App() {
  return (
    <div className="container">
      <div className="container-side">
        <Sidebar />
      </div>
      <div className="container-body">
        <Navbar/>
    <AppRoutes/>
      </div>
    </div>

  )
  
}

export default App;
