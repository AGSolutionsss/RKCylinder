import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import { Button } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import month from "../month";
import weight from "../weight";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ScannerModel from "./ScannerModel";

const AddCylinderSub = (props) => {

    let history = useHistory();

    const params = useParams();

    const [cylinder, setCylinder] = useState({
        id: params.id,
        cylinder_sub_barcode: "",
        cylinder_sub_batch_no: "",
        cylinder_sub_company_no: "",
        cylinder_sub_manufacturer_id: "",
        cylinder_sub_manufacturer_month: "",
        cylinder_sub_manufacturer_year: "",
        cylinder_sub_weight: "",
    });

    const [showmodal, setShowmodal] = useState(true);

    const closegroupModal = () => {
        setShowmodal(false);
    };

    const openmodal = () => {
        setShowmodal(true);
    };

    const onInputChange = (e) => {
        
        setCylinder({
            ...cylinder,
            [e.target.name]: e.target.value,
        });
        
    };

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });
    
    const barcodeScannerValue = (selectedProduct) => {
        setCylinder({
            ...cylinder,
            cylinder_sub_barcode: selectedProduct,
        });
        setShowmodal(false);
    }

    

    const [manufacturer, setManufacturer] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-manufacturer', requestOptions)
      .then(response => response.json())
      .then(data => setManufacturer(data.manufacturer)); 
    }, []);
    
    const onSubmit = (e) => {
      
        let data = {
            id: params.id,
            cylinder_sub_barcode: cylinder.cylinder_sub_barcode,
            cylinder_sub_batch_no: cylinder.cylinder_sub_batch_no,
            cylinder_sub_company_no: cylinder.cylinder_sub_company_no,
            cylinder_sub_manufacturer_id: cylinder.cylinder_sub_manufacturer_id,
            cylinder_sub_manufacturer_month: cylinder.cylinder_sub_manufacturer_month,
            cylinder_sub_manufacturer_year: cylinder.cylinder_sub_manufacturer_year,
            cylinder_sub_weight: cylinder.cylinder_sub_weight,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-cylinder-sub",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Cylinder Sub Created Sucessfully");
                history.push("/cylinder");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Add Sub Cylinder </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            id="select-corrpreffer"
                                            required
                                            label="Barcode"
                                            name="cylinder_sub_barcode"
                                            value={cylinder.cylinder_sub_barcode}
                                            onChange={e => onInputChange(e)}
                                            onClick={() => {
                                                openmodal();
                                                }}
                                            fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            id="select-corrpreffer"
                                            required
                                            label="Company No"
                                            name="cylinder_sub_company_no"
                                            value={cylinder.cylinder_sub_company_no}
                                            onChange={e => onInputChange(e)}
                                            fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            id="select-corrpreffer"
                                            required
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            label="Manufacturer"
                                            name="cylinder_sub_manufacturer_id"
                                            value={cylinder.cylinder_sub_manufacturer_id}
                                            onChange={e => onInputChange(e)}
                                            fullWidth
                                            >
                                            {manufacturer.map((c_manufacturer, key) => (
                                            <MenuItem key={key} value={c_manufacturer.id}>
                                                {c_manufacturer.manufacturer_name}
                                            </MenuItem>
                                            ))}
                                        </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            id="select-corrpreffer"
                                            required
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            label="Month"
                                            name="cylinder_sub_manufacturer_month"
                                            value={cylinder.cylinder_sub_manufacturer_month}
                                            onChange={e => onInputChange(e)}
                                            fullWidth
                                            >
                                            {month.map((c_month, key) => (
                                                <MenuItem key={key} value={c_month.value}>
                                                    {c_month.label}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            id="select-corrpreffer"
                                            required
                                            label="Year"
                                            name="cylinder_sub_manufacturer_year"
                                            value={cylinder.cylinder_sub_manufacturer_year}
                                            onChange={e => onInputChange(e)}
                                            fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            id="select-corrpreffer"
                                            required
                                            label="Batch No"
                                            name="cylinder_sub_batch_no"
                                            value={cylinder.cylinder_sub_batch_no}
                                            onChange={e => onInputChange(e)}
                                            fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            id="select-corrpreffer"
                                            required
                                            label="Weight"
                                            name="cylinder_sub_weight"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={cylinder.cylinder_sub_weight}
                                            onChange={e => onInputChange(e)}
                                            fullWidth
                                            >
                                            {weight.map((c_weight, key) => (
                                                <MenuItem key={key} value={c_weight.value}>
                                                    {c_weight.label}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <Button
                                    type="submit"
                                    className="btn btn-gradient-primary mr-2"
                                    color="primary"
                                    onClick={(e) => onSubmit(e)}
                                    disabled={isButtonDisabled}
                                    >
                                    Submit
                                    </Button>
                                    <Link to="cylinder">
                                    <Button className="btn btn-light" color="success">
                                    Cancel
                                    </Button>
                                    </Link>               
                  
                            </form>
                        </div>
                    </div>
                    <Modal className="modal-lg" isOpen={showmodal} toggle={() => closegroupModal()}>
                        <ModalHeader toggle={() => closegroupModal()}>Scanner</ModalHeader>
                        <ModalBody>
                        <ScannerModel barcodeScannerValue={barcodeScannerValue}/>
                        </ModalBody>
                        <ModalFooter></ModalFooter>
                    </Modal>
                </div>
            </div>
        </div>
    );

}

export default AddCylinderSub;