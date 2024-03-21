import { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/esm/Button';

const SearchBar = ({ setSearchKeyword }) => {
const [searchTerm, setSearchTerm] = useState('');

const handleChange = (event) => {
    setSearchTerm(event.target.value);
};

const handleSubmit = (event) => {
    event.preventDefault();
    setSearchKeyword(searchTerm);
};

return (
        <Form onSubmit={handleSubmit} className="d-flex">
        <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
        />
        <Button type="submit" variant="outline-success">Search</Button>
    </Form>

);
};

const Header = ({handleShow, setSearchKeyword}) => {
return (
<div className="nav-container mt-3 d-flex align-items-center justify-content-between">
    <Link style={{ textDecoration: "none" }} to={"/"}>
        <p className="fs-2 fw-bold text-primary me-3">todo</p>
    </Link>
<SearchBar setSearchKeyword={setSearchKeyword}/>
    <i onClick={handleShow} className="fa fa-plus text-primary icon ms-auto pt-2 z-1"></i>
</div>
)
}

export default Header