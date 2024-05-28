import React from 'react';
import './App.css';
import Allcourse from './Allcourse';
import AddCourse from './AddCourse';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Col, Row } from 'reactstrap';
import Header from './Header';
import Menu from './Menu';
import shopSetting from './sidebar/shopsetting';
import ManageProfile from './sidebar/manageprofile';
import Register from './api/login/register';
import Login from './api/login/login';
import Productlibrary from './sidebar/productlibrary';
import ProductList from './sidebar/productlist';
import AddCategory from './dashboard/addcategory';
import Mainpanel from './sidebar/dashboard';
import ProducManagement from './sidebar/productmanagement';
import EditProductForm from './sidebar/edit/editDiscount';
import Wallet from './sidebar/wallet';
import ShopVerification from './sidebar/shopverificaton';
import StoreManagement from './dashboard/storemanagement';
import RechargeManagement from './dashboard/rechargemanagement';
import WithdrawReqManagement from './dashboard/withdrawRequestManagement';

function App() {

  return (
    <section>
      <Router>

        <Header />
        <Row className='mt-3'>

          <Col md={2} className='ml-2'>
            {/* {location.pathname !== "/login" && <Menu/>} */}
            <MenuWrapper />
          </Col>

          <Col md={10}>
            {/* <Register></Register> */}
            <Routes>
              <Route path="/login" Component={Login} exact></Route>
              <Route path="/" Component={Allcourse} exact></Route>
              <Route path="/addcourse" Component={AddCourse} exact></Route>
              <Route path="/shopsetting" Component={shopSetting} exact></Route>
              <Route path="/manageprofile" Component={ManageProfile} exact></Route>
              <Route path='/register' Component={Register} exact></Route>
              <Route path='/productlist' Component={ProductList} exact></Route>
              <Route path='/productlibary' Component={Productlibrary} exact></Route>
              <Route path='/addCategory' Component={AddCategory} exact></Route>
              <Route path='/mainpanel' Component={Mainpanel} exact></Route>
              <Route path='/product' Component={ProducManagement} exact></Route>
              <Route path="/updateProduct/:id" element={<EditProductForm />} />
              <Route path='/wallet' Component={Wallet} exact></Route>
              <Route path='/shop-verification' Component={ShopVerification} exact></Route>
              <Route path='/shopmanagement' Component={StoreManagement} exact></Route>
              <Route path='/rechargemanagement' Component={RechargeManagement} exact></Route>
              <Route path='/withdraw_request' Component={WithdrawReqManagement} exact></Route>
            </Routes>
          </Col>
        </Row>
      </Router>
    </section>
  );
}
function MenuWrapper() {
  const location = useLocation();
  if (location.pathname !== "/login") {
    return <Menu />;
  }
  return null;
}


export default App;
