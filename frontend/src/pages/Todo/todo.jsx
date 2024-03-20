// import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from "react";
import { Card } from "../../components/Card";
import emptyImg from "../../assets/images/DancingDoodle.png";
import SyncLoader from "react-spinners/SyncLoader";
import Header from "./header";
import TaskFilter from "./taskFilter";
import NewTaskModal from "./NewTaskModal";
export const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useState(false);
    const [selectedTag, setSelectedTag] = useState("");
    const [showEmpty, setShowEmpty] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    
    
    const priorityMap = { Low: 1, Medium: 2, High: 3 };
    
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if(storedTodos){
            const filteredTodos = storedTodos.filter((todo) => {
                return todo.title.toLowerCase().includes(searchKeyword.toLowerCase()) || todo.description.toLowerCase().includes(searchKeyword.toLowerCase());
            });
            setTodos(filteredTodos);
        }
    }, [searchKeyword]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowEmpty(true);
        }, 1000);
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
        return () => clearTimeout(timeoutId);
    }, []);

     const sortTodos = (order) => {
        const sortedTodos = todos.sort((a, b) => {
            if (order === "asc") {
                return priorityMap[a.priority] - priorityMap[b.priority];
            } else {
                return priorityMap[b.priority] - priorityMap[a.priority];
            }
            
        });
       setTodos([...sortedTodos]);
    };

    const addTodoState = (newTodoWithId) => {
        const updatedTodos = [newTodoWithId, ...todos];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
        handleClose();
    };

    const deleteTodosState = (id) => {
        const newTodos = todos.filter((todo) => todo._id !== id);
        if (newTodos.length % 4 === 0 && currentPage > 1) {
            paginateBack();
        }
        localStorage.setItem("todos", JSON.stringify(newTodos));
        setTodos(newTodos);
    };

    const updateTodoState = (data) => {
        const todoToUpdateIndex = todos.findIndex((todo) => todo._id === data._id);
        const updatedTodos = [...todos];
        updatedTodos[todoToUpdateIndex] = {
            ...updatedTodos[todoToUpdateIndex],
            title: data.title !== undefined ? data.title : updatedTodos[todoToUpdateIndex].title,
            description:
                data.description !== undefined
                    ? data.description
                    : updatedTodos[todoToUpdateIndex].description,
            tag: data.tag !== undefined ? data.tag : updatedTodos[todoToUpdateIndex].tag,
            priority:
                data.priority !== undefined
                    ? data.priority
                    : updatedTodos[todoToUpdateIndex].priority,
            completed:
                data.completed !== undefined
                    ? data.completed
                    : updatedTodos[todoToUpdateIndex].completed,
        };
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
    };

    const filterTodos =
        selectedTag !== "" ? todos.filter((todo) => todo.tag === selectedTag) : todos;

    const lastTodoIndex = currentPage * 4;
    const firstTodoIndex = lastTodoIndex - 4;
    const currentTodos = filterTodos.slice(firstTodoIndex, lastTodoIndex);
    const isLastPage = lastTodoIndex >= filterTodos.length || filterTodos.length <= 4;
    const noTodos = filterTodos.length === 0;

    const paginateForward = () => {
        setCurrentPage(currentPage + 1);
    };

    const paginateBack = () => {
        setCurrentPage(currentPage - 1);
    };


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="container">
                <Header handleShow={handleShow} setSearchKeyword={setSearchKeyword}/>
                <div className="row pt-5 pt-md-0">
                    <TaskFilter setCurrentPage={setCurrentPage} setSelectedTag={setSelectedTag}/>
                    <div className="col-md-9 pt-md-5">
                        <NewTaskModal show={show} setShow={setShow} addTodoState={addTodoState} />
                        {spinner ? (
                            <div className="h-100 w-100 d-flex justify-content-center align-items-center spinner">
                                <SyncLoader color="#69665c" margin={4} speedMultiplier={0.5} />
                            </div>
                        ) : (
                            <div className="">
                                {noTodos && showEmpty ? (
                                    <div className="d-flex flex-column w-100 emptyDiv align-items-center justify-content-center h-100 ps-5">
                                        <img
                                            src={emptyImg}
                                            className="pt-5 emptyImg"
                                            style={{ width: "30rem" }}
                                            alt=""
                                        />
                                        <p className="fst-italic fw-bolder pt-5 text-primary text-center">
                                            Your {selectedTag ? selectedTag : `todo`} list is
                                            currently on vacation. Must be nice! Feel free to bring it
                                            back to the hustle whenever you're ready.
                                        </p>
                                        <button onClick={handleShow} className="btn btn-primary mt-4">
                                            Add todo
                                        </button>
                                    </div>
                                ) : (
                                    <>{[0, 2].map(r => {
                                        return <div className="row pt-md-5" key={r}>
                                            {[0, 1].map(c => {
                                                return <div className="col-md-6 mb-md-0 mb-3" key={r+c}
                                                >
                                                    {currentTodos[r + c] ? (
                                                        <Card
                                                            title={currentTodos[r + c].title}
                                                            desc={currentTodos[r + c].description}
                                                            tag={currentTodos[r + c].tag}
                                                            priority={currentTodos[r + c].priority}
                                                            id={currentTodos[r + c]._id}
                                                            completed={currentTodos[r + c].completed}
                                                            key={currentTodos[r + c]._id}
                                                            del={deleteTodosState}
                                                            update={updateTodoState}
                                                        ></Card>
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                            
                                            })}
                                        </div>
                                    })}</>
                                    
                                )}
                            </div>
                        )}
                    </div>
                    <div className="col-md-1 d-none d-md-block pt-md-6 pt-lg-0 mt-md-n5">
                        <div className="row h-100 w-100">
                            <div className="col-12">
                                <div className=" d-flex flex-column justify-content-around h-100 align-items-end">
                                    <i
                                        onClick={sortTodos}
                                        // position="absolute" 
                                        // className="position-absolute"
                                        style={{top:'180px'}}
                                        className={`position-absolute fa fa-arrow-up icon text-primary me-n4`}
                                    >Sort</i>
                                    <i
                                        onClick={paginateForward}
                                        className={`fa fa-arrow-right icon text-primary me-n4 ${
                                            isLastPage ? `d-none` : ``
                                        }`}
                                    ></i>
                                    <i
                                        onClick={paginateBack}
                                        className={`fa fa-arrow-left icon text-primary me-n4 ${
                                            currentPage === 1 ? `d-none` : ``
                                        }`}
                                    ></i>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
