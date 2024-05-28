import React, { useEffect } from "react";
import Course from "./course";
import { useState } from "react";
import axios from "axios";
import base_url from "./api/bootapi";

const Allcourse = () => {


    useEffect(() => {
        document.title = "All";
        getServicedata();
    }, []);

    const getServicedata = () => {
        axios.get(`${base_url}/users`)
            .then(
                (response) => {
                    console.log(response.data);
                    //  Toast.success("courses has been loaded");
                    setCourses(response.data);
                },
                (error) => {
                    console.log(error);
                    //  Toast.success("something went wrong")
                }
            )
    }


    const [course, setCourses] = useState([]);

    return (
        <div>
            <h1 className="text-center"> Users List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>

                        <td> User Id</td>
                        <td> User First Name</td>
                        <td> User Email Id</td>
                    </tr>

                </thead>
                <tbody>
                    {/* {course.length > 0 ? course.map((item) => <Course key={item.id} course={item} />) : "No courses"} */}
                    {
                        course.map(
                            item =>
                                // <tr key={item.id}>
                                <tr>
                                    <td> {item.id}</td>  
                                    <td> {item.firstName}</td>
                                    <td> {item.email}</td>
                                </tr>
                        )
                    }
                </tbody>

            </table>
            {/* {course.length > 0 ? course.map((item) => <Course key={item.id} course={item} />) : "No courses"} */}
        </div>
    )

}
export default Allcourse;