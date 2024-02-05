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

const EditCylinder = (props) => {

    let history = useHistory();

    const params = useParams();

    const [cylinder, setCylinder] = useState({
        
        cylinder_date: "",
        cylinder_vendor_id: "",
        cylinder_count: "",
        cylinder_status: "",
        cylinder_batch_nos: "",
    });

    const useTemplate = {cylinder_sub_id:"",cylinder_sub_barcode:"", cylinder_sub_batch_no:"", cylinder_sub_company_no:"",cylinder_sub_manufacturer_id:"",cylinder_sub_manufacturer_month:"",cylinder_sub_manufacturer_year:"", cylinder_sub_weight:""};

    const [users, setUsers] = useState([useTemplate]);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/web-fetch-cylinder-by-id/" + params.id,
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setCylinder(res.data.cylinder);
            setUsers(res.data.cylinderSub);
          });
    }, []);

    const onChange = (e, index) =>{
        const updatedUsers = users.map((user, i) => 
        index == i 
        ? Object.assign(user,{[e.target.name]: e.target.value}) 
        : user );
        setUsers(updatedUsers);
    };

    const validateOnlyDigits = (inputtxt) => {
        var phoneno = /^\d+$/;
        if(inputtxt.match(phoneno) || inputtxt.length==0){
            return true;
        }else{
            return false;
        }
    }

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

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendor', requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, []);

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
            
            cylinder_date: cylinder.cylinder_date,
            cylinder_vendor_id: cylinder.cylinder_vendor_id,
            cylinder_count: cylinder.cylinder_count,
            cylinder_sub_data: users,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-update-cylinder/"+ params.id,
            method: "PUT",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Cylinder Updated Sucessfully");
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
                <h3 className="page-title"> Edit Cylinder </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form id="addIndiv" autoComplete="off">
                                <div className="row">
                                    <div className="col-sm-12 col-md-3 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            InputLabelProps={{ shrink: true }}
                                            type="date"
                                            label="Date"
                                            autoComplete="Name"
                                            name="cylinder_date"
                                            value={cylinder.cylinder_date}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-3 col-xl-3">
                                        <div className="form-group">
                                            <TextField
                                            id="select-corrpreffer"
                                            required
                                            label="Batch No"
                                            name="cylinder_batch_nos"
                                            value={cylinder.cylinder_batch_nos}
                                            onChange={(e) => onInputChange(e)}
                                            fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-6 col-xl-6">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Vendor"
                                            required
                                            autoComplete="Name"
                                            name="cylinder_vendor_id"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            value={cylinder.cylinder_vendor_id}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                            {vendor.map((c_vendor, key) => (
                                                <MenuItem key={key} value={c_vendor.id}>
                                                    {c_vendor.vendor_name}
                                                </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                {
                                    users.map((user, index)=> (
                                        <div className="row" key={index}>
                                            <div className="col-sm-12 col-md-4 col-xl-4">
                                                <div className="form-group">
                                                    <TextField
                                                    id="select-corrpreffer"
                                                    required
                                                    label="Barcode"
                                                    name="cylinder_sub_barcode"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={user.cylinder_sub_barcode}
                                                    onChange={e => onChange(e, index)}
                                                    disabled
                                                    fullWidth
                                                    />
                                                    <TextField
                                                    id="select-corrpreffer"
                                                    required
                                                    label="id"
                                                    name="cylinder_sub_id"
                                                    InputLabelProps={{ shrink: true }}
                                                    value={user.id}
                                                    onChange={e => onChange(e, index)}
                                                    hidden
                                                    fullWidth
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-xl-4">
                                                <div className="form-group">
                                                    <TextField
                                                    id="select-corrpreffer"
                                                    required
                                                    label="Company No"
                                                    name="cylinder_sub_company_no"
                                                    value={user.cylinder_sub_company_no}
                                                    onChange={e => onChange(e, index)}
                                                    fullWidth
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-4 col-xl-4">
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
                                                    value={user.cylinder_sub_manufacturer_id}
                                                    onChange={e => onChange(e, index)}
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
                                            <div className="col-sm-12 col-md-2 col-xl-2">
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
                                                    value={user.cylinder_sub_manufacturer_month}
                                                    onChange={e => onChange(e, index)}
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
                                            <div className="col-sm-12 col-md-2 col-xl-2">
                                                <div className="form-group">
                                                    <TextField
                                                    id="select-corrpreffer"
                                                    required
                                                    label="Year"
                                                    name="cylinder_sub_manufacturer_year"
                                                    value={user.cylinder_sub_manufacturer_year}
                                                    onChange={e => onChange(e, index)}
                                                    fullWidth
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-2 col-xl-2">
                                                <div className="form-group">
                                                    <TextField
                                                    id="select-corrpreffer"
                                                    required
                                                    label="Batch No"
                                                    name="cylinder_sub_batch_no"
                                                    value={user.cylinder_sub_batch_no}
                                                    onChange={e => onChange(e, index)}
                                                    fullWidth
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-2 col-xl-2">
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
                                                    value={user.cylinder_sub_weight}
                                                    onChange={e => onChange(e, index)}
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
                                    ))
                                }
                                
                                <Button
                                    type="submit"
                                    className="btn btn-gradient-primary mr-2"
                                    color="primary"
                                    onClick={(e) => onSubmit(e)}
                                    disabled={isButtonDisabled}
                                    >
                                    Update
                                    </Button>
                                    <Link to="../cylinder">
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

export default EditCylinder;