import React from 'react';
import { Form, Modal } from "react-bootstrap";
import numberWithCommas from '../../../utils/numberWithCommas';

function ImportOrderDetailTable(props) {
    const {isShow, onTableFormClose, activeImportOrderDetail} = props

    function handleClose() {
        if(onTableFormClose)
            onTableFormClose()
    }
    
    return (
        activeImportOrderDetail ? 
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Sản phẩm nhập vào</Form.Label>
                        <Form.Control
                                type="text"
                                value={activeImportOrderDetail.product.name}
                                readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Số lượng nhập</Form.Label>
                        <Form.Control
                                type="number"
                                value={activeImportOrderDetail.productQuantity}
                                readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Giá nhập</Form.Label>
                        <Form.Control
                                type="text"
                                value={numberWithCommas(activeImportOrderDetail.productPrice)}
                                readOnly
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
            </Modal>
        </>  
        : <></>
    );
}

export default ImportOrderDetailTable;