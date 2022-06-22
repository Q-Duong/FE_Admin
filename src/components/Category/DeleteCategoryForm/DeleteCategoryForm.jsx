import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteCategoryForm(props) {
    const {activeCategory, onDeleteCategory, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedCategory() {
      if(onDeleteCategory)
         onDeleteCategory(activeCategory._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete Category: {activeCategory.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedCategory}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteCategoryForm;