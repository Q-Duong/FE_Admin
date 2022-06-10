import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteBrandForm(props) {
    const {activeBrand, onDeleteBrand, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedBrand() {
      if(onDeleteBrand)
         onDeleteBrand(activeBrand._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete Brand: {activeBrand.brandName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletedBrand}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteBrandForm;