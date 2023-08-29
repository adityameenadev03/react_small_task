import React from 'react'
import { Button, Card, Modal, Table } from "react-bootstrap";

const DeleteModal = ({setModelOpen,handleDelete,modelOpen,data}) => {
  return (
    <Modal show={modelOpen} onHide={() => setModelOpen(false)} 
    centered={true}
    backdropClassName="bg-light opacity-25"
    // fullscreen={false}
    >
      
      <Modal.Header closeButton>
        <Modal.Title>Confirm User Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <p>
          Do you want to delete this user record permanently from
          the table.
        </p>
        <p>
          If yes then click on "Delete", otherwise click on
          "Cancel"
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => setModelOpen(false)}
        >
          Close
        </Button>
        <Button
          className="btn bg-danger text-white"
          onClick={() => handleDelete(modelOpen)}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteModal