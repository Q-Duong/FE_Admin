import React from 'react';
import { Form, Modal } from "react-bootstrap";
import numberWithCommas from '../../../utils/numberWithCommas';

function ExportOrderDetailTable(props) {
    const {isShow, onTableFormClose, activeExportOrderDetail} = props

    function handleClose() {
        if(onTableFormClose)
            onTableFormClose()
    }
    
    return (
        activeExportOrderDetail ? 
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Sản phẩm bán ra</Form.Label>
                        <Form.Control
                                type="text"
                                value={activeExportOrderDetail.product.name}
                                readOnly
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Số lượng bán</Form.Label>
                        <Form.Control
                                type="number"
                                value={activeExportOrderDetail.productQuantity}
                                readOnly
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Giá bán</Form.Label>
                        <Form.Control
                                type="text"
                                value={numberWithCommas(activeExportOrderDetail.productPrice)}
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

export default ExportOrderDetailTable;