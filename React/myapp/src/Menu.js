import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "reactstrap"

const Menu = () => {
    return (

        <ListGroup>
            <div className="p-4 text-xl-center border-bottom bg-dark text-white position-relative" style={{ borderRadius: '4px' }}>
                {/* <Form>
                    <span className="avatar avatar-md mb-3">
                    <img src="#"/>
                    </span>
                    
                </Form> */}
                {/* <h4 class="h5 fs-16 mb-1 fw-600"></h4> */}
                <span>Enter The Store</span>
            </div>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/mainpanel">Dashboard</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/addcourse" action>Add course</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/">All</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/shopsetting">Shop Setting</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/manageprofile">Manage Profile</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/product">Product Management</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/register">Register</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/productlist">Product List</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/addCategory">Category</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/wallet">Wallet</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/shop-verification">Shop Verification</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/shopmanagement">Store Management</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/rechargemanagement">Recharge Management</Link>
            <Link color="warning" className="list-group-item list-group-item-action" tag="a" to="/withdraw_request">Withdrawal Req Management</Link>
        </ListGroup>
    )
}

export default Menu;