import "../../node_modules/font-awesome/css/font-awesome.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Card } from "../components/Card";
import React from "react";
import emptyImg from "../assets/images/DancingDoodle.png";
import appImg from "../assets/images/MeditatingDoodle.png";
import { Link } from "react-router-dom";
import purple from "../assets/images/purple.png";
import green from "../assets/images/green.png";
import red from "../assets/images/red.png";
import blue from "../assets/images/blue.png";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

export const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [show, setShow] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDesc, setNewTodoDesc] = useState("");
    const [defselectedTag, setdefSelectedTag] = useState("pending");
    const [selectedTag, setSelectedTag] = useState("");
    const [showEmpty, setShowEmpty] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowEmpty(true);
        }, 1);

        return () => clearTimeout(timeoutId);
    }, []);

    const addTodo = () => {
        const newTodoWithId = {
            title: newTodoTitle,
            description: newTodoDesc,
            tag: defselectedTag,
            _id: Date.now().toString(),
        };

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
            title:
                data.title !== undefined
                    ? data.title
                    : updatedTodos[todoToUpdateIndex].title,
            description:
                data.description !== undefined
                    ? data.description
                    : updatedTodos[todoToUpdateIndex].description,
            tag:
                data.tag !== undefined ? data.tag : updatedTodos[todoToUpdateIndex].tag,
            completed:
                data.completed !== undefined
                    ? data.completed
                    : updatedTodos[todoToUpdateIndex].completed,
        };
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTodos(updatedTodos);
    };

    const handleTagClick = (e) => {
        setCurrentPage(1);
        const clickedTag = e.currentTarget
            .querySelector(".tagname")
            .getAttribute("value");
        document.querySelectorAll(".tag-button").forEach((button) => {
            if (button !== e.currentTarget) {
                button.classList.remove("active");
            }
        });
        e.currentTarget.classList.toggle("active");
        setSelectedTag((prevSelectedTag) =>
            prevSelectedTag === clickedTag ? "" : clickedTag
        );
    };

    const filterTodos =
        selectedTag !== ""
            ? todos.filter((todo) => todo.tag === selectedTag)
            : todos;

    const lastTodoIndex = currentPage * 4;
    const firstTodoIndex = lastTodoIndex - 4;
    const currentTodos = filterTodos.slice(firstTodoIndex, lastTodoIndex);
    const isLastPage =
        lastTodoIndex >= filterTodos.length || filterTodos.length <= 4;
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
                <div className="nav-container mt-3 d-flex align-items-center">
                    <Link style={{ textDecoration: "none" }} to={"/"}>
                        <p className="fs-2 fw-bold text-primary">todo</p>
                    </Link>

                    <i
                        onClick={handleShow}
                        className="fa fa-plus text-primary icon ms-auto pt-2 z-1"
                    ></i>
                </div>
                <div className="row pt-5 pt-md-0">
                    <div className="col-md-2 pt-md-7">
                        <div className="d-flex flex-md-column gap-md-4 gap-3 justify-content-center">
                            <button
                                className="btn tag-button d-flex align-items-center gap-md-3 gap-2 mb-2"
                                onClick={(e) => handleTagClick(e)}
                            >
                                <img src={purple} className="tag" alt="" />
                                <p value={"pending"} className="fs-5 tagname">
                                    pending
                                </p>
                            </button>

                            <button
                                className="btn tag-button d-flex align-items-center gap-md-3 gap-2 mb-2"
                                onClick={(e) => handleTagClick(e)}
                            >
                                <img src={red} className="tag" alt="" />
                                <p value={"Running"} className="fs-5 tagname">
                                    Running
                                </p>
                            </button>
                            <button
                                className="btn tag-button d-flex align-items-center gap-md-3 gap-2 mb-2"
                                onClick={(e) => handleTagClick(e)}
                            >
                                <img src={green} className="tag" alt="" />
                                <p value={"Completed"} className="fs-5 tagname">
                                    Completed
                                </p>
                            </button>
                            <button
                                className="btn tag-button d-flex align-items-center gap-md-3 gap-2 mb-2"
                                onClick={(e) => handleTagClick(e)}
                            >
                                <img src={blue} className="tag" alt="" />
                                <p value={"other"} className="fs-5 tagname">
                                    other
                                </p>
                            </button>
                            <div className="d-none  d-lg-block">
                                <img src={appImg} className="pt-5 w-100" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex py-2 d-md-none justify-content-start w-100">
                        <i
                            onClick={paginateBack}
                            className={`fa fa-arrow-left icon text-primary ${
                                currentPage === 1 ? `d-none` : ``
                            }`}
                        ></i>
                        <i
                            onClick={paginateForward}
                            className={`fa fa-arrow-right icon text-primary ms-auto ${
                                isLastPage ? `d-none` : ``
                            }`}
                        ></i>
                    </div>
                    <div className="col-md-9 pt-md-5">
                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Add todo item</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            autoFocus
                                            onChange={(e) => setNewTodoTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            onChange={(e) => setNewTodoDesc(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Tag</Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={(e) => setdefSelectedTag(e.target.value)}
                                            className="me-2"
                                        >
                                            <option value="pending">pending</option>
                                            <option value="Running">Running</option>
                                            <option value="Completed">Completed</option>
                                            <option value="other">Other</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-dark" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="success" onClick={addTodo}>
                                    Add todo
                                </Button>
                            </Modal.Footer>
                        </Modal>
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
                                        <button
                                            onClick={handleShow}
                                            className="btn btn-primary mt-4"
                                        >
                                            Add todo
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="row pt-3 pt-md-5">
                                            <div className="col-md-6 mb-md-0 mb-3">
                                                {currentTodos[0] ? (
                                                    <Card
                                                        title={currentTodos[0].title}
                                                        desc={currentTodos[0].description}
                                                        tag={currentTodos[0].tag}
                                                        id={currentTodos[0]._id}
                                                        completed={currentTodos[0].completed}
                                                        key={currentTodos[0]._id}
                                                        del={deleteTodosState}
                                                        update={updateTodoState}
                                                    ></Card>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col-md-6 mb-md-0 mb-3">
                                                {currentTodos[1] ? (
                                                    <Card
                                                        title={currentTodos[1].title}
                                                        desc={currentTodos[1].description}
                                                        tag={currentTodos[1].tag}
                                                        id={currentTodos[1]._id}
                                                        completed={currentTodos[1].completed}
                                                        key={currentTodos[1]._id}
                                                        del={deleteTodosState}
                                                        update={updateTodoState}
                                                    ></Card>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                        <div className="row pt-md-5">
                                            <div className="col-md-6 mb-md-0 mb-3">
                                                {currentTodos[2] ? (
                                                    <Card
                                                        title={currentTodos[2].title}
                                                        desc={currentTodos[2].description}
                                                        tag={currentTodos[2].tag}
                                                        id={currentTodos[2]._id}
                                                        completed={currentTodos[2].completed}
                                                        key={currentTodos[2]._id}
                                                        del={deleteTodosState}
                                                        update={updateTodoState}
                                                    ></Card>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                            <div className="col-md-6 mb-md-0 mb-3">
                                                {currentTodos[3] ? (
                                                    <Card
                                                        title={currentTodos[3].title}
                                                        desc={currentTodos[3].description}
                                                        tag={currentTodos[3].tag}
                                                        id={currentTodos[3]._id}
                                                        completed={currentTodos[3].completed}
                                                        key={currentTodos[3]._id}
                                                        del={deleteTodosState}
                                                        update={updateTodoState}
                                                    ></Card>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="col-md-1 d-none d-md-block pt-md-6 pt-lg-0 mt-md-n5">
                        <div className="row h-100 w-100">
                            <div className="col-12">
                                <div className="d-flex flex-column justify-content-around h-100 align-items-end">
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
