import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import RegistrationPage from "./Components/RegistrationPage/RegistrationPage";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/:place/register" component={RegistrationPage} />
    </Router>
  );
}

export default App;
