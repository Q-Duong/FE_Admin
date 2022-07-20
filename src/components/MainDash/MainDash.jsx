import React from "react";
import "./MainDash.css";
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import DashBoard from "../DashBoard/DashBoard";
import Login from "../Login/Login"
import BrandTable from "../Brand/BrandTable/BrandTable";
import CategoryTable from "../Category/CategoryTable/CategoryTable";
import SupplierTable from "../Supplier/SupplierTable/SupplierTable";
import ProductTable from "../Product/ProductTable/ProductTable";
import EmployeeTable from "../Employee/EmployeeTable/EmployeeTable";
import CustomerTable from "../Customer/CustomerTable/CustomerTable";
import ImportOrderTable from "../ImportOrder/ImportOrderTable/ImportOrderTable";
import ExportOrderTable from "../ExportOrder/ExportOrderTable/ExportOrderTable";
import WareHouseTable from "../WareHouse/WareHouseTable/WareHouseTable";
import Sidebar from '../Sidebar/Sidebar'
import Navbar from "../Navbar/Navbar";
import { removeToken } from "../../Actions/tokenAction";
import {useDispatch} from 'react-redux'
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const MainDash = () => {
  const dispatch = useDispatch()
  const navigate  = useNavigate()

  function handleLogout (){
    dispatch(removeToken())
    navigate('/')
}
  return (
    <>
      <Navbar onLogout={handleLogout}/>
      <Sidebar/>
      <div className="MainDash">
        <Routes>
          <Route exec path="/" element={< DashBoard />} />
          <Route path="/login" element={< Login />} />
          <Route path="/dashboard" element={
            < ProtectedRoute  permission={'read_dashboard'}>
              <DashBoard />
            </ProtectedRoute>
          }/>
          <Route path="/brands" element={
            < ProtectedRoute  permission={'read_brands'}>
              < BrandTable />
            </ProtectedRoute>
          }/>
          <Route path="/categories" element={
            < ProtectedRoute  permission={'read_categories'}>
              < CategoryTable />
            </ProtectedRoute>
          }/>
          <Route path="/suppliers" element={
            < ProtectedRoute  permission={'read_suppliers'}>
              < SupplierTable />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            < ProtectedRoute  permission={'read_products'}>
              < ProductTable />
            </ProtectedRoute>
          } />
          <Route path="/wareHouses" element={
            < ProtectedRoute  permission={'read_warehouses'}>
              < WareHouseTable />
            </ProtectedRoute>
          } />
          <Route path="/importorders" element={
            < ProtectedRoute  permission={'read_importorders'}>
              < ImportOrderTable />
            </ProtectedRoute>
          } />
          <Route path="/exportorders" element={
            < ProtectedRoute  permission={'read_exportorders'}>
              < ExportOrderTable />
            </ProtectedRoute>
          } />
          <Route path="/employees" element={
            < ProtectedRoute  permission={'read_employees'}>
              < EmployeeTable />
            </ProtectedRoute>
          } />
          <Route path="/customers" element={
            < ProtectedRoute  permission={'read_customers'}>
              < CustomerTable />
            </ProtectedRoute>
          } />
          
        </Routes>
      </div>
    </>
  );
};

export default MainDash;
