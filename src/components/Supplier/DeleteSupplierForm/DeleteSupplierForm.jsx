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
          <Modal.Title>Xóa nhà cung cấp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>bạn có chắc muốn xóa nhà cung cấp: {activeSupplier.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedSupplier}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteSupplierForm;