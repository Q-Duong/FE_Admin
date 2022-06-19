import React, {useState, useEffect} from 'react';
import { supplierAPI} from '../../../axios/exeAPI'
import { Button, Form, Modal } from "react-bootstrap";
import CreateImportOrderDetail from '../CreateImportOrderDetail/CreateImportOrderDetail';
import numberWithCommas from '../../../utils/numberWithCommas';


function CreateImportOrder(props) {
    const {isShow, onCreateImportOrder, onCloseCreateform} = props
    const [suppliers, setSuppliers] = useState([])
    const [products, setProducts] = useState([])
    const [activeSupplier, setActiveSupplier] = useState({})
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [total, setTotal] = useState(0)
    function handleClose() {
        if(onCloseCreateform)
            onCloseCreateform()
    }

    function handleCreateImportOrder() {
        if(onCreateImportOrder)
            onCreateImportOrder({products, activeSupplier, total})
    }

    function handleCreateFormClose() {
        setShowCreateForm(false)
    }

    function handleCreateFormShow() {
        setShowCreateForm(true)
    }

    function handleCreateImportOrderDetail(data) {
        const temp = [...products];
        const foundProduct = temp.find(product => product._id === data._id)
        if(foundProduct)
            foundProduct.stockQuantity += data.stockQuantity
        else
            temp.push(data)
        setProducts(temp)
        setShowCreateForm(false)
    }

    useEffect(()=> {
        async function getSupplier() {
            try {
                const res = await supplierAPI.getAll()
                if(res.status === 200 ) {
                    const data = res.data
                    setSuppliers(data)
                    setActiveSupplier(data[0]._id)
                } else {
                    console.log(res)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getSupplier()
    },[])

    useEffect(() => {
        const tempTotal = products.reduce((total,product) => total + (product.stockPrice * product.stockQuantity),0)
        setTotal(tempTotal)
    },[products])
    
    return (
        <>
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create Import Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nhà cung cấp</Form.Label>
                        <select 
                            name="categoryId" 
                            className="form-control m-bot15"
                            onChange={(e) => setActiveSupplier(e.target.value)}
                        >
                            {suppliers.map((supplier) => (
                                <option value={supplier._id}>{supplier.name}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Sản phẩm</Form.Label>
                        {
                            products.map(product => (
                                <Form.Check 
                                    type={"checkbox"}
                                    id={`${product._id}`}
                                    label={`${product.name } - ${numberWithCommas(product.stockPrice)} - ${product.stockQuantity} ${product.unit}`}
                                    defaultChecked={true}
                                />
                            ))
                        }
                    </Form.Group>
                    <p>Tổng tiền: {numberWithCommas(total)}</p>
                    <Button onClick={handleCreateFormShow}>thêm sản phẩm</Button>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleCreateImportOrder}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
            <CreateImportOrderDetail
                isShow={showCreateForm}
                activeSupplier={activeSupplier}
                onCreateFormClose={handleCreateFormClose}
                onCreateImportOrderDetail={handleCreateImportOrderDetail}
            />
        </>  
    );
}

export default CreateImportOrder;