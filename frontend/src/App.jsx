import "./styles/bootstrap.min.css";
import "./styles/style.css";
import { Routes, Route } from "react-router-dom";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Todo } from "./pages/Todo/todo.jsx";
import { NoRoute } from "./pages/404";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import {ChakraProvider} from "@chakra-ui/react";
function App() {
    return (
        <ChakraProvider>

        <div>
            <Routes>
                <Route element={<Signup />} path="/signup"></Route>
                <Route element={<Login />} path="/login"></Route>
                <Route element={<Todo />} path="/"></Route>
                <Route element={<NoRoute />} path="*"></Route>
            </Routes>
        </div>
        </ChakraProvider>
    );
}
// go to previous state
export default App;