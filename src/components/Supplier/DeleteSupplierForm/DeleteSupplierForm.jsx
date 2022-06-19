import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteSupplierForm(props) {
    const {activeSupplier, onDeleteSupplier, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedSupplier() {
      if(onDeleteSupplier)
         onDeleteSupplier(activeSupplier._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Supplier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete Supplier: {activeSupplier.supplierName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletedSupplier}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteSupplierForm;