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
            <>
                <Routes>
                    <Route element={<Signup/>} path="/signup"></Route>
                    <Route element={<Login/>} path="/login"></Route>
                    <Route element={<NoRoute/>} path="*"></Route>
                </Routes>
            </>
        </ChakraProvider>
    );
}

export default App;
