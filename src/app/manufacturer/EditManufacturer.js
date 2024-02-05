import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
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

const EditManufacturer = (props) => {

    let history = useHistory();

    const params = useParams();

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-manufacturer-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setManufacturer(res.data.manufacturer)
      
          });
        }, []);

    const [manufacturer, setManufacturer] = useState({
        manufacturer_name: "",
        manufacturer_address: "",
        manufacturer_state: "",
        manufacturer_mobile: "",
        manufacturer_email: "",
        manufacturer_status: ""
    });

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }

    const onInputChange = (e) => {
        
        if(e.target.name=="manufacturer_mobile"){
            if(validateOnlyDigits(e.target.value)){
                setManufacturer({
                  ...manufacturer,
                  [e.target.name]: e.target.value,
                });
            }
        }else{
            setManufacturer({
                ...manufacturer,
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
      
        let data = {
            manufacturer_name: manufacturer.manufacturer_name,
            manufacturer_address: manufacturer.manufacturer_address,
            manufacturer_state: manufacturer.manufacturer_state ,
            manufacturer_mobile: manufacturer.manufacturer_mobile,
            manufacturer_email: manufacturer.manufacturer_email,
            manufacturer_status: manufacturer.manufacturer_status, 
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-manufacturer/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Manufacturer Updated Sucessfully");
                history.push("/manufacturer");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Edit Manufacturer </h3>
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
                                            label="Full Name"
                                            autoComplete="Name"
                                            name="manufacturer_name"
                                            value={manufacturer.manufacturer_name}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Mobile"
                                            autoComplete="Name"
                                            name="manufacturer_mobile"
                                            value={manufacturer.manufacturer_mobile}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            autoComplete="Name"
                                            name="manufacturer_email"
                                            value={manufacturer.manufacturer_email}
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
                                            name="manufacturer_address"
                                            value={manufacturer.manufacturer_address}
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
                                            name="manufacturer_state"
                                            value={manufacturer.manufacturer_state}
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
                                            name="manufacturer_status"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={manufacturer.manufacturer_status}
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
                                    <Link to="../manufacturer">
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

export default EditManufacturer;