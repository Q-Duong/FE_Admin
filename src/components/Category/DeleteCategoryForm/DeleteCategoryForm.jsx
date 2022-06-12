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
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to delete Category: {activeCategory.categoryName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeletedCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteCategoryForm;