import React from 'react';
import { Button, Modal } from "react-bootstrap";

function DeleteNewsCategoryForm(props) {
    const {activeNewsCategory, onDeleteNewsCategory, isShow, onCloseDeleteform} = props;
    
    function handleClose ()  {
        onCloseDeleteform()
    };
  
    function handleDeletedNewsCategory() {
      if(onDeleteNewsCategory)
         onDeleteNewsCategory(activeNewsCategory._id);
    }

    return (
    <>                  
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa tin tức</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc muốn xóa danh mục tin tức: {activeNewsCategory.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDeletedNewsCategory}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default DeleteNewsCategoryForm;