import "./styles/bootstrap.min.css";
import "./styles/style.css";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Todo } from "./pages/todo";
import { NoRoute } from "./pages/404";
import "../node_modules/font-awesome/css/font-awesome.min.css";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Signup />} path="/signup"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Todo />} path="/todo"></Route>
        <Route element={<NoRoute />} path="*"></Route>
      </Routes>
    </div>
  );
}

export default App;
