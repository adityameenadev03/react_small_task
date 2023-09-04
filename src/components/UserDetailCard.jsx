import React from "react";
import {
  Button,
  ButtonToolbar,
  Card,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import DeleteModal from "./DeleteModal";

const UserDetailCard = ({
  handleDelete,
  handleEdit,
  formsArray,
  modelOpen,
  setModelOpen,
}) => {
  return (
    <Container fluid className="mt-3">
      <Row>
        {formsArray?.map((data, i) => {
          return (
            <Col
              key={data.personId}
              lg="4"
              md="6"
              sm="12"
              // xl="3"
              className="mb-4"
            >
              <Card
                style={{
                  textAlign: "left",
                  minHeight: "300px",
                  minWidth: "270px",
                  borderRadius: "12px",
                  backgroundColor: "#E2E2E2",
                }}
                variant="light"
              >
                <Card.Body>
                  <Card.Text>
                    <span className="fw-semibold"> Name </span> :{" "}
                    <span className="text-body-secondary">{data.name}</span>{" "}
                  </Card.Text>
                  <Card.Text>
                    <span className="fw-semibold"> Email </span> :{" "}
                    <span className="text-body-secondary">{data.email}</span>{" "}
                  </Card.Text>

                  <Card.Text>
                    <span className="fw-semibold"> Phone </span> :{" "}
                    <span className="text-body-secondary">{data.phone}</span>{" "}
                  </Card.Text>
                  <Card.Text>
                    <span className="fw-semibold"> Gender </span> :{" "}
                    <span className="text-body-secondary">{data.gender}</span>{" "}
                  </Card.Text>

                  <div className="d-flex justify-content-between mt-4">
                    <Button
                      variant="outline-primary "
                      size="sm"
                      onClick={() => handleEdit(data.personId)}
                      className="me-5 pt-1"
                    >
                      <MdModeEdit size="1.5em" variant="light"></MdModeEdit>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className=" pt-1"
                      onClick={() => setModelOpen(data.personId)}
                    >
                      <MdDeleteForever
                        className="align-baseline"
                        size="1.5em"
                      ></MdDeleteForever>
                    </Button>
                    <DeleteModal
                      setModelOpen={setModelOpen}
                      handleDelete={handleDelete}
                      modelOpen={modelOpen}
                      data={data}
                    ></DeleteModal>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default UserDetailCard;
