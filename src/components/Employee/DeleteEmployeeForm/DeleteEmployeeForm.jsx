import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteEmployeeForm(props) {
    const {activeEmployee, onDeleteEmployee, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedEmployee() {
      if(onDeleteEmployee)
         onDeleteEmployee(activeEmployee._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete Employee: {activeEmployee.employeeName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletedEmployee}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteEmployeeForm;