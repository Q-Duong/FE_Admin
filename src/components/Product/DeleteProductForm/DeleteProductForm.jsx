import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteProductForm(props) {
    const {activeProduct, onDeleteProduct, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedProduct() {
      if(onDeleteProduct)
         onDeleteProduct(activeProduct._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete Product: {activeProduct.productName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletedProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteProductForm;