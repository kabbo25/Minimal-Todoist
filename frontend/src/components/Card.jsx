// Card.jsx

import {Button as ChakraButton, Stack} from '@chakra-ui/react';
import {useState} from "react";
import BootstrapButton from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {FlagFill} from 'react-bootstrap-icons';
// Use BootstrapButton and ChakraButton throughout your component
import Modal from "react-bootstrap/Modal";

export const Card = ({title, desc, tag, priority, id, completed, del, update}) => {
    const [todoDone, setTodoDone] = useState(completed);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateTodoTitle, setUpdateTodoTitle] = useState(title);
    const [updateTodoDesc, setUpdateTodoDesc] = useState(desc);
    const [updateSelectedTag, setUpdateSelectedTag] = useState(tag);
    const [updateSelectedPriority, setUpdateSelectedPriority] = useState(priority);

    const tagObject = {
        pending: "purple",
        Running: "red",
        Completed: "green",
        other: "blue",
    };

    const priorityClass = {
        Low: "low-priority  bi-flag text-success fw-bold fs-4",
        Medium: "medium-priority bi-flag text-warning fw-bold fs-4",
        High: "high-priority bi-flag text-danger fw-bold fs-4",
    };


    const todoCheck = () => {
        setTodoDone(!todoDone);
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseUpdateModal = () => setShowUpdateModal(false);
    const handleShowUpdateModal = () => setShowUpdateModal(true);

    const onCheckboxChangeHandler = () => {
        if (!todoDone) {
            todoCheck();
            const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
            const updatedTodos = storedTodos.map(todo =>
                todo.id === id ? {...todo, completed: true, tag: "Completed"} : todo
            );

            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            update({_id: id, completed: true, tag: "Completed"});
        }
    };

    const deleteTodo = () => {
        const updatedTodos = JSON.parse(localStorage.getItem("todos")).filter(
            todo => todo.id !== id
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        del(id);
        handleCloseDeleteModal();
    };

    const updateTodoDetails = () => {
        const updatedTodos = JSON.parse(localStorage.getItem("todos")).map(todo =>
            todo.id === id
                ? {
                    ...todo,
                    title: updateTodoTitle,
                    description: updateTodoDesc,
                    tag: updateSelectedTag,
                    priority: updateSelectedPriority,
                }
                : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        update({
            _id: id,
            title: updateTodoTitle,
            description: updateTodoDesc,
            tag: updateSelectedTag,
            priority: updateSelectedPriority,
        });
        handleCloseUpdateModal();
    };

    return (
        <div className={`todocard  px-4 py-3 ${priorityClass[priority]} bg-${tag}`}>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-primary">
                    Are you sure you want to delete this task?
                </Modal.Body>
                <Modal.Footer>
                    <BootstrapButton variant="light" onClick={handleCloseDeleteModal}>
                        Close
                    </BootstrapButton>
                    <BootstrapButton className="text-white" variant="danger" onClick={deleteTodo}>
                        Delete
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update todo item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={updateTodoTitle}
                                onChange={(e) => setUpdateTodoTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={updateTodoDesc}
                                rows={2}
                                onChange={(e) => setUpdateTodoDesc(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tag</Form.Label>
                            <Form.Control
                                as="select"
                                value={updateSelectedTag}
                                onChange={(e) => setUpdateSelectedTag(e.target.value)}
                                className="me-2"
                            >
                                <option value="pending">pending</option>
                                <option value="Running">Running</option>
                                <option value="Completed">Completed</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control
                                as="select"
                                value={updateSelectedPriority}
                                onChange={(e) => setUpdateSelectedPriority(e.target.value)}
                                className="me-2"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <BootstrapButton variant="outline-dark" onClick={handleCloseUpdateModal}>
                        Close
                    </BootstrapButton>
                    <BootstrapButton variant="success" onClick={updateTodoDetails}>
                        Update
                    </BootstrapButton>
                </Modal.Footer>
            </Modal>
            <div className="vstack">
                <div className="todo-nav d-flex justify-content-between align-items-center">
                    <p
                        className={`fs-4 fw-bold text-primary overflow-hidden todo-title ${
                            todoDone ? "checkedTodo" : ``
                        }`}
                    >
                        {title}
                    </p>
                    <Stack direction='row' spacing={2}>
                        <ChakraButton size='md'
                                      height='40px'
                                      width='60px'
                                      border='0px'
                                      onClick={handleShowUpdateModal} leftIcon={<EditIcon/>}
                                      borderRadius='12px'
                                      hover:bg='white' _hover='bg-white' _active='bg-white' _focus='bg-white'
                                      variant='outline'>
                            Edit
                        </ChakraButton>
                        <ChakraButton size='md'
                                      height='40px'
                                      width='80px'
                                      border='0px'
                                      borderRadius='12px'
                                      onClick={handleShowDeleteModal} leftIcon={<DeleteIcon/>} colorScheme='red'
                                      hover:bg='white' _hover='bg-white' _active='bg-white' _focus='bg-white'
                                      variant='outline'>
                            Delete
                        </ChakraButton>
                    </Stack>
                </div>
                <div className="todo-desc pt-3">
                    <p
                        className={`fw-light text-primary todo-desc-body overflow-hidden ${
                            todoDone ? "checkedTodo" : ``
                        }`}
                    >
                        {desc}
                    </p>
                </div>
                <div className="todo-footer  pt-4">
                    <div className="d-flex">
                        <div className="ms-auto mt-2 text-danger">
                            <FlagFill size={25}/>
                        </div>
                        <Form className="ms-3">
                            <Form.Check
                                type="checkbox"
                                id="default-checkbox"
                                border="1px solid black"
                                checked={todoDone}
                                onChange={onCheckboxChangeHandler}
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};