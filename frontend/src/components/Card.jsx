// Card.jsx

import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Card = ({ title, desc, tag, priority, id, completed, del, update }) => {
  const [tododone, setTodoDone] = useState(completed);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatetodoTitle, setUpdateTodoTitle] = useState(title);
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
    Low: "low-priority text-success fw-bold fs-4",
    Medium: "medium-priority text-warning fw-bold fs-4",
    High: "high-priority text-danger fw-bold fs-4",
  };

  const todocheck = () => {
    setTodoDone(!tododone);
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);

  const onCheckboxChangeHandler = () => {
    todocheck();
    const updatedTodos = JSON.parse(localStorage.getItem("todos")).map(todo =>
      todo.id === id ? { ...todo, completed: !tododone, tag: !tododone ? "Completed" : tag } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    update({ _id: id, completed: !tododone, tag: !tododone ? "Completed" : tag });
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
            title: updatetodoTitle,
            description: updateTodoDesc,
            tag: updateSelectedTag,
            priority: updateSelectedPriority,
          }
        : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    update({
      _id: id,
      title: updatetodoTitle,
      description: updateTodoDesc,
      tag: updateSelectedTag,
      priority: updateSelectedPriority,
    });
    handleCloseUpdateModal();
  };

  return (
    <div className={`todocard bg-secondary px-4 py-3 ${priorityClass[priority]}`}>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Action</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-primary">
          Are you sure you want to delete this task?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleCloseDeleteModal}>
            Close
          </Button>
          <Button className="text-white" variant="danger" onClick={deleteTodo}>
            Delete
          </Button>
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
                value={updatetodoTitle}
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
          <Button variant="outline-dark" onClick={handleCloseUpdateModal}>
            Close
          </Button>
          <Button variant="success" onClick={updateTodoDetails}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="vstack">
        <div className="todo-nav d-flex align-items-center">
          <p
            className={`fs-4 fw-bold text-primary overflow-hidden ${
              tododone ? `checkedtodo` : ``
            }`}
          >
            {title}
          </p>
          <Dropdown className="ms-auto" drop="start">
            <Dropdown.Toggle id="dropdown-basic" variant="secondary">
              <i className="fa fa-ellipsis-h icon light me-n2"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleShowUpdateModal} className="light">
                Edit...
                <Dropdown.Divider />
              </Dropdown.Item>
              <Dropdown.Item onClick={handleShowDeleteModal} className="light">
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="todo-desc pt-3">
          <p
            className={`fw-light text-primary todo-desc-body overflow-hidden ${
              tododone ? `checkedtodo` : ``
            }`}
          >
            {desc}
          </p>
        </div>
        <div className="todo-footer d-flex align-items-center pt-4">
          <div className={`tag tag-${tagObject[tag]} rounded-circle`}></div>
          <div className={`priority-badge ms-auto ${priorityClass[priority]}`}>
            {priority}
          </div>
          <Form className="ms-3">
            <Form.Check
              type="checkbox"
              id="default-checkbox"
              checked={tododone}
              onChange={onCheckboxChangeHandler}
            ></Form.Check>
          </Form>
        </div>
      </div>
    </div>
  );
};
