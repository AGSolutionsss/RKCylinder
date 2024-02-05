import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {  NotificationManager } from "react-notifications";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

const status = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
];

const tds = [
    {
      value: "Yes",
      label: "Yes",
    },
    {
      value: "No",
      label: "No",
    },
];

const EditVendor = (props) => {

    let history = useHistory();

    const params = useParams();

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-vendor-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setVendor(res.data.vendor);
            
          });
    }, []);

    const [vendor, setVendor] = useState({
        vendor_name: "",
        vendor_address: "",
        vendor_state: "",
        vendor_mobile: "",
        vendor_email: "",
        vendor_status: "",
    });

    const [selectedFile, setSelectedFile] = React.useState(null);

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) => {
        if(e.target.name=="vendor_mobile"){
            if(validateOnlyDigits(e.target.value)){
                setVendor({
                  ...vendor,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setVendor({
                ...vendor,
                [e.target.name]: e.target.value,
            });
        }
    };

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });

    const onUpdate = (e) => {
      
        const data = {
            vendor_name: vendor.vendor_name,
            vendor_address: vendor.vendor_address,
            vendor_state: vendor.vendor_state,
            vendor_mobile: vendor.vendor_mobile,
            vendor_email: vendor.vendor_email,
            vendor_status: vendor.vendor_status,
        }

        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-vendor/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Vendor Updated Sucessfully");
                history.push("/vendor");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Edit Vendor </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="Vendor Name"
                                            autoComplete="Name"
                                            name="vendor_name"
                                            value={vendor.vendor_name}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Mobile No"
                                            autoComplete="Name"
                                            name="vendor_mobile"
                                            value={vendor.vendor_mobile}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            type="email"
                                            label="Email"
                                            autoComplete="Name"
                                            name="vendor_email"
                                            value={vendor.vendor_email}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12 col-xl-12">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Address"
                                            autoComplete="Name"
                                            name="vendor_address"
                                            value={vendor.vendor_address}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="State"
                                            autoComplete="Name"
                                            name="vendor_state"
                                            value={vendor.vendor_state}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Status"
                                            autoComplete="Name"
                                            name="vendor_status"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={vendor.vendor_status}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {status.map((fabric, key) => (
                                                <MenuItem key={fabric.value} value={fabric.value}>
                                                    {fabric.label}
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
                                    onClick={(e) => onUpdate(e)}
                                    disabled={isButtonDisabled}
                                    >
                                    Update
                                    </Button>
                                    <Link to="../vendor">
                                    <Button className="btn btn-light" color="success">
                                    Cancel
                                    </Button>
                                    </Link>               
                  
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditVendor;