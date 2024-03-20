import  { useState } from 'react'
import { Modal } from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';

const NewTaskModal = ({show, setShow, addTodoState}) => {

    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [newTodoDesc, setNewTodoDesc] = useState("");
    const [defSelectedTag, setDefSelectedTag] = useState("pending");
    const [newTodoPriority, setNewTodoPriority] = useState("Low");

    const handleClose = () => setShow(false);
    const addTodo = () => {
        const newTodoWithId = {
            title: newTodoTitle,
            description: newTodoDesc,
            tag: defSelectedTag,
            priority: newTodoPriority,
            _id: Date.now().toString(),
        };
        addTodoState(newTodoWithId);
        handleClose();
    };


  return (
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
                                            onChange={(e) => setDefSelectedTag(e.target.value)}
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
                                            onChange={(e) => setNewTodoPriority(e.target.value)}
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
                                <Button variant="outline-dark" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="success" onClick={addTodo}>
                                    Add todo
                                </Button>
                            </Modal.Footer>
                        </Modal> 
  )
}

export default NewTaskModal;