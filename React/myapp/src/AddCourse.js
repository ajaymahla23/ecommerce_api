import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
import base_url from "./api/bootapi";
const AddCourse = () => {

    useEffect(() => {
        document.title = "Add courses";
        postData();
    }, []);

   // const [courses, setCourse] = useState({});
    const [firstName, setFirstName] = useState('');
    const saveData = (e) => {
      //  console.log(courses);
        //e.preventDefault(courses);
        e.preventDefault();
        const data={firstName}
        console.log("chkdf :",data);
        postData(data);
    }

    const postData=(data)=>{
        axios.post(`${base_url}/add_data`,data).then(
            (response) =>{
                console.log(response.data);
                console.log("success");
            },
            (error)=>{
                console.log(error);
                console.log("error");
            }
        )
    }

    return (
        <Fragment>
            <Form >
                {/* <FormGroup>
                    <label for="userId">Id</label>
                    <Input type="text" placeholder="id" name="userid" id="userid"
                     onChange={(e)=> {
                        setCourse({...courses,id: e.target.value});
                     }}></Input>
                </FormGroup> */}
                <FormGroup>
                    <label for="username">Name</label>
                    <input type="text" placeholder="Name" id="name" name="name" 
                    value={firstName}
                      onChange={(e)=> setFirstName(e.target.value)}></input>
                </FormGroup>
                {/* <FormGroup>
                    <label for="email">Email</label>
                    <input type="email" placeholder="email" id="email" name="email" 
                      onChange={(e)=> {
                        setCourse({...courses,email: e.target.value});
                     }}></input>
                </FormGroup> */}
               
                <Container>
                    <Button type="submit" onClick={(e)=>saveData(e)}>Add</Button>
                    <Button type="reset" color="warning ml-2">Clear</Button>
                </Container>
            </Form>
        </Fragment>
    )
}
export default AddCourse;