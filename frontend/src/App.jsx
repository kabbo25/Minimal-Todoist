import "./styles/bootstrap.min.css";
import "./styles/style.css";
import {Route, Routes} from "react-router-dom";
import {Signup} from "./pages/signup";
import {Login} from "./pages/login";
import {Todo} from "./pages/Todo/todo";
import {NoRoute} from "./pages/404";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import {ChakraProvider} from '@chakra-ui/react'

function App() {
    return (
        <ChakraProvider>
            <Todo/>
        </ChakraProvider>
    );
}

export default App;
