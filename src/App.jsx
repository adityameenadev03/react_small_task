import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes/routes";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const user = useSelector((state) => state?.user);
  console.log(user);
  const routing = useRoutes(routes(user));
  return (
    <>
      <NavBar></NavBar>

      {routing}
    </>
  );
}

export default App;
