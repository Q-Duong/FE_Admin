import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteWareHouseForm(props) {
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
          <Modal.Title>Xóa thương hiệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete Brand: {activeBrand.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedBrand}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteWareHouseForm;