import React from "react";
import { useState } from "react";
import { MdDeleteForever,MdModeEdit } from 'react-icons/md';

const Table = ({ handleDelete, handleEdit, formsArray , modelOpen, setModelOpen}) => {
  return (
    <div className="formTable">
      <h2 className="bg-secondary text-white p-3 mb-3">All Users</h2>
      <table className="table table-striped table-bordered">
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
                  <button
                    className="btn  text-light"
                    onClick={() => handleEdit(data.personId)}
                  >
                    <MdModeEdit  color="green" size="1.5em"></MdModeEdit>
                  </button>{" "}
                </td>
                <td>
                  <button
                    className="btn text-light"
                    onClick={() => setModelOpen(true)}
                    // onClick={() => handleDelete(data.personId)}
                  >
              <MdDeleteForever color="red" size="1.5em"></MdDeleteForever>
                   
                  </button>
                  <div className={modelOpen ? "modal d-block" : "modal d-none" }  tabIndex={1}>
                  <div className="modal-dialog modal-dialog-centered"
                  data-backdrop="true" 
        // onClick={()=>setModelOpen(false)}
        > 
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm User Delete</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setModelOpen(false)}

              ></button>
            </div>
            <div className="modal-body">
              <p>Do you want to delete this user record permanently from the table.</p>
              <p>If yes then click on "Delete", otherwise click on "Cancel"</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setModelOpen(false)}

              >
                Cancel
              </button>
              <button 
              className="btn bg-danger text-white"
              onClick={() => handleDelete(data.personId)}
              >
                Delete
              </button>

            </div>
          </div>
        </div>
      </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
     
    </div>
  );
};

export default Table;
