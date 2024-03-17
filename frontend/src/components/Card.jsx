import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export const Card = ({ title, desc, tag, id, completed, del, update }) => {
  const [tododone, setTodoDone] = useState(completed);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatetodoTitle, setUpdateTodoTitle] = useState(title);
  const [updateTodoDesc, setUpdateTodoDesc] = useState(desc);
  const [updateSelectedTag, setUpdateSelectedTag] = useState(tag);
  const jwt = localStorage.getItem("jwtToken");
  const updateUrl = "https://todo-app-brown-ten.vercel.app/updatetodo/";
  const deleteUrl = "https://todo-app-brown-ten.vercel.app/deletetodo/";
  const todocheck = () => {
    setTodoDone(!tododone);
  };
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const tagObject = {
    work: "purple",
    study: "red",
    self: "green",
    other: "blue",
  };
  const onCheckboxChangeHandler = async () => {
    todocheck();
    try {
      const response = await axios.put(
        updateUrl + id,
        {
          completed: !tododone,
        },
        {
          headers: {
            Authorization: jwt,
          },
        }
      );
      const data = {
        _id: id,
        completed: !tododone,
      };
      update(data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTodo = async () => {
    try {
      const response = await axios.delete(deleteUrl + id, {
        headers: {
          Authorization: jwt,
        },
      });
      del(id);
      handleCloseDeleteModal();
    } catch (error) {
      console.log(error);
      handleCloseDeleteModal();
    }
  };
  const updateTodoDetails = async () => {
    const data = {
      title: updatetodoTitle,
      description: updateTodoDesc,
      tag: updateSelectedTag,
    };
    try {
      const response = await axios.put(updateUrl + id, data, {
        headers: {
          Authorization: jwt,
        },
      });
      if (response.status == 200) {
        data._id = id;
        update(data);
      }
      handleCloseUpdateModal();
      console.log(response);
    } catch (error) {
      console.log(error);
      handleCloseUpdateModal();
    }
  };
  return (
    <div className="todocard bg-secondary px-4 py-3">
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
                <option value="work">Work</option>
                <option value="study">Study</option>
                <option value="self">Self</option>
                <option value="other">Other</option>
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
          <Form className="ms-auto">
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
