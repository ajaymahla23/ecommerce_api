import React from "react";
import { Button, Card, CardBody, CardSubtitle, CardText, Container } from "reactstrap";

const Course=({course})=> {
    return(
        <Card>
            <CardBody>
                <CardText className="font-weight-bold">{course.abc}</CardText>
                <CardSubtitle>{course.title}</CardSubtitle>
                <Container className="text-center">
                    <Button>Update</Button>
                    <Button color="warning ml-3">Delete</Button>
                </Container>
            </CardBody>
        </Card>
    )
}

export default Course;