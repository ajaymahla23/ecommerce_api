import React, { useState } from "react";
import './css/header.css';
import { Bell } from 'react-bootstrap-icons';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardBody,

} from 'reactstrap';
import PropTypes from 'prop-types';

function Header({ direction, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    return (
        <nav className="navbar">
            <Card className="col-md-12">
                <CardBody>
                    <div className="navbar-container">
                        <div className="d-flex">
                            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                                <DropdownToggle caret style={{ background: 'white', color: 'black' }}>EN</DropdownToggle>
                                <DropdownMenu {...args}>
                                    <DropdownItem>EN</DropdownItem>
                                    <DropdownItem>中文</DropdownItem>
                                    <DropdownItem>Tiếng Việt</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="menu-container">
                            <ul className="navbar-menu">
                                <li className="navbar-item">
                                    <a href="#" className="navbar-link">Help-line link</a>
                                </li>
                                <span className="navbar-separator">|</span>
                                <li className="navbar-item">
                                    <a href="#" className="navbar-link">Message</a>
                                </li>
                                <span className="navbar-separator">|</span>
                                <li className="navbar-item">
                                    <a href="#" className="navbar-link"><Bell /></a>
                                </li>
                                <span className="navbar-separator">|</span>
                                <li className="navbar-item">
                                    <a href="#" className="navbar-link">My Manel</a>
                                </li>

                                <span className="navbar-separator">|</span>

                                <li className="navbar-item">
                                    <a href="#" className="navbar-link">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </nav>
    );
}

Header.propTypes = {
    direction: PropTypes.string,
};

export default Header;