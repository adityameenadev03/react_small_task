import React from "react";
import { useState } from "react";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { Button, Card, Modal, Table } from "react-bootstrap";
import DeleteModal from "./Model/DeleteModal";

const TableData = ({
  handleDelete,
  handleEdit,
  formsArray,
  modelOpen,
  setModelOpen,
}) => {
  return (
    <Card className="border-white shadow-lg p-3 mb-5 bg-white rounded">
      <h2 className="bg-secondary text-white p-3 mb-3">All Users</h2>

      <Table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {formsArray?.map((data, i) => {
            return (
              <tr key={i}>
                <td>{data.personId}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.gender}</td>
                <td>
                  <MdModeEdit
                    onClick={() => handleEdit(data.personId)}
                    color="green"
                    size="1.5em"
                  ></MdModeEdit>
                </td>
                <td>
                  <MdDeleteForever
                    className="align-baseline"
                    onClick={() => setModelOpen(data.personId)}
                    color="red"
                    size="1.5em"
                  ></MdDeleteForever>

                  <DeleteModal
                    setModelOpen={setModelOpen}
                    handleDelete={handleDelete}
                    modelOpen={modelOpen}
                    data={data}
                  ></DeleteModal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};

export default TableData;
