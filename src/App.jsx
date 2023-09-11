import { useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "./routes/routes";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const { isLoggedIn } = useSelector((state) => state?.user);
  const routing = useRoutes(routes(isLoggedIn));
  return (
    <>
      <NavBar></NavBar>
      {routing}
    </>
  );
}

export default App;
