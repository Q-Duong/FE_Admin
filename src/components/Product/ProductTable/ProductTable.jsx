import React, { useEffect, useState } from 'react';
import { productAPI } from '../../../axios/exeAPI';
import CreateProductForm from '../CreateProductForm/CreateProductForm';
import DeleteProductForm from '../DeleteProductForm/DeleteProductForm';
import UpdateProductForm from '../UpdateProductForm/UpdateProductForm';

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ProductTable.css";

import { Button, Dropdown } from "react-bootstrap";
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

function ProductTable() {
    const [products, setProducts] =
        useState([]);
    const [activeProduct, setactiveProduct] = 
        useState({category: "???",brand: "???",_id:"123",name:"???",image: "???",unit: "???",expireNumber: "???",expireUnit: "???",status: "???"});
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);

    function handleUpdateFormClose ()  {
        setShowUpdateForm(false)
      };

    function handleUpdateFormShow(product) {
        setactiveProduct(product)
        setShowUpdateForm(true)
    };

    function handleCreateFormClose ()  {
        setShowCreateForm(false)
      };

    function handleCreateFormShow() {
        setShowCreateForm(true)
    };

    function handleDeleteFormClose ()  {
        setShowDeleteForm(false)
      };

    function handleDeleteFormShow(product) {
        setactiveProduct(product)
        setShowDeleteForm(true)
    };
        
    async function handleUpdatedProduct(formRef){
        const updateForm = formRef.current
        const updateFormData = new FormData(updateForm)
        updateFormData.append('_id',activeProduct._id)
        const response = await productAPI.update(updateFormData);
        const updatedProduct = response.data;
        let tempProducts = [...products];
        tempProducts = tempProducts.map(product => product._id === updatedProduct._id ? updatedProduct : product);
        setProducts(tempProducts);
        setShowUpdateForm(false)
    }

    async function handleCreateProduct(formRef){
        const createForm = formRef.current
        const createFormData = new FormData(createForm)
        const response = await productAPI.create(createFormData);
        const createdProduct = response.data;
        console.log(response.data)
        let tempProducts = [...products];
        tempProducts.unshift(createdProduct)
        setProducts(tempProducts);
        setShowCreateForm(false)
    }

    async function handleDeleteProduct(id) {
        const response = await productAPI.delete(id);
        if(response.status === 200) {
            let tempProducts = [...products];
            tempProducts = tempProducts.filter(product => product._id !== activeProduct._id)
            setactiveProduct({_id:"123",name:"???",image: "???"})
            setProducts(tempProducts);
            setShowDeleteForm(false);
        }
    };

    useEffect(()=> {
        async function getProducts() {
            const res = await productAPI.getAll();
            console.log(res.data)
            setProducts(res.data);
        }
        getProducts()
        
    },[])
    
    return (
        <>
        <div className="Table">
            <h3>Sản phẩm</h3>
            <ProtectedRoute permission={"create_products"}>
                <Button variant="primary" onClick={handleCreateFormShow}>
                    Thêm
                </Button>
            </ProtectedRoute>
            <TableContainer
                component={Paper}
                style={{ boxShadow: "0px 13px 20px 0px #80808029"}}
                className="tableContainer"
                
            >
                <Table  responsive="xl" sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Danh mục</TableCell>
                            <TableCell align="left">Thương hiệu</TableCell>
                            <TableCell align="left">Tên hàng hóa</TableCell>
                            <TableCell align="left">Hình ảnh</TableCell>
                            <TableCell align="left">Đơn vị</TableCell>
                            <TableCell align="left">Tình trạng</TableCell>
                            <TableCell align="left">Mô tả sản phẩm</TableCell>
                            
                            <TableCell align="left">Tác động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{ color: "white" }}>
                        {products.map((product) => (
                            <TableRow
                                key={product._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                               
                                <TableCell align="left">{product.category.name}</TableCell>
                                <TableCell align="left">{product.brand.name}</TableCell>
                                <TableCell align="left">{product.name}</TableCell>
                                <TableCell align="left"><img className="imageProduct" src={`https://res.cloudinary.com/anhtuanpham1507/image/upload/v1616603933/${product.image}`} /></TableCell>
                                <TableCell align="left">{product.unit}</TableCell>
                                <TableCell align="left">{product.status}</TableCell>
                                <TableCell align="left">{product.expireNumber}</TableCell>
                                
                                <TableCell align="left" className="Details">
                                    <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Hành động
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item ></Dropdown.Item>
                                        <Dropdown.Item onClick={() => {handleUpdateFormShow(product)}}>
                                        Cập nhật
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {handleDeleteFormShow(product)}}>Xóa</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
            <CreateProductForm
                isShow={showCreateForm}
                onCreateProduct={handleCreateProduct}
                onCloseCreateform={handleCreateFormClose}
            />
            <UpdateProductForm 
                activeProduct={activeProduct}
                isShow={showUpdateForm}
                onUpdateProduct={handleUpdatedProduct}
                onCloseUpdateform={handleUpdateFormClose}
            />
            <DeleteProductForm
                activeProduct={activeProduct}
                isShow={showDeleteForm}
                onDeleteProduct={handleDeleteProduct}
                onCloseDeleteform={handleDeleteFormClose}
            />
        </>
    );
}

export default ProductTable;