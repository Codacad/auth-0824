import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {


  return (
    <>
      <div className="app font-spaceGrotesk bg-global">
        <Header />
        <div className="container md:p-8 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
