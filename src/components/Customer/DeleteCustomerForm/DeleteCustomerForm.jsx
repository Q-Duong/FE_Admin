import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteCustomerForm(props) {
    const {activeCustomer, onDeleteCustomer, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedCustomer() {
      if(onDeleteCustomer)
         onDeleteCustomer(activeCustomer._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete Customer: {activeCustomer.customerName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletedCustomer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteCustomerForm;