import React, {useState, useEffect} from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { productAPI } from '../../../axios/exeAPI';
import moment from 'moment';

function CreateImportOrderDetail(props) {
    const {isShow, onCreateFormClose, activeSupplier, onCreateImportOrderDetail} = props
    const [products, setProducts] = useState([])
    const [activeProduct, setActiveProduct] = useState(null)
    const [stockPrice, setStockPrice] = useState(0)
    const [manufacturingDate, setManufacturingDate] = useState(null)
    const [expireIn, setExpireIn] = useState(null)
    const [stockQuantity, setStockQuantity] = useState(1)

    function handleClose() {
        if(onCreateFormClose)
            onCreateFormClose()
    }
    
    function handleCreateImportOrderDetail() {
        const product = products.find(product => product._id === activeProduct)
        console.log(product)
        if(onCreateImportOrderDetail)
            onCreateImportOrderDetail({...product, stockPrice, stockQuantity, manufacturingDate, expireIn})
    }

    useEffect(() => {
        async function getProducts() {
            try {
                const res = await productAPI.getBySupplier(activeSupplier)
                if(res.status === 200) {
                    const data = res.data
                    setProducts(data)
                    setActiveProduct(data[0]._id)
                } else {
                    console.log(res)
                }
    
            } catch (error) {
                console.log(error)
            }  
        }
        getProducts()
    },[activeSupplier])
    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Tạo đơn nhập hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Sản phẩm</Form.Label>
                        <select 
                            name="categoryId" 
                            class="form-control m-bot15"
                            onChange={(e) => setActiveProduct(e.target.value)}
                        >
                            {products.map((product) => (
                                <option key={product._id} value={product._id}>{product.name}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Giá mua</Form.Label>
                        <Form.Control
                                type="number"
                                name="stockPrice"
                                placeholder="Giá mua vào"
                                value={stockPrice}
                                onChange={(e) => setStockPrice(parseInt(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Số lượng mua vào</Form.Label>
                        <Form.Control
                                type="number"
                                name="stockQuantity"
                                placeholder="Số lượng mua vào"
                                value={stockQuantity}
                                onChange={(e) => setStockQuantity(parseInt(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Ngày sản xuất</Form.Label>
                        <Form.Control
                                type="date"
                                name="manufacturingDate"
                                value={manufacturingDate}
                                onChange={(e) => setManufacturingDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Ngày hết hạn</Form.Label>
                        <Form.Control
                                type="date"
                                name="expireIn"
                                value={expireIn}
                                onChange={(e) => setExpireIn(e.target.value)}
                                disabled = {manufacturingDate === null ? true : false}
                                min={moment(manufacturingDate).add(1,'days').format('YYYY-MM-DD')}
                        />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleCreateImportOrderDetail}>
                    Lưu
                </Button>
                </Modal.Footer>
            </Modal>
        </>  
    );
}

export default CreateImportOrderDetail;