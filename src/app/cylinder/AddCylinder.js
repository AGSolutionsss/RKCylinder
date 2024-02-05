import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import dateyear from "../dateyear";


const AddCylinder = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    var todayback = yyyy + "-" + mm + "-" + dd;

    const [cylinder, setCylinder] = useState({
        cylinder_year: dateyear,
        cylinder_date: todayback,
        cylinder_vendor_id: "",
        cylinder_count: 0,
        cylinder_batch_nos: "",
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
        if(e.target.name=="cylinder_batch_nos"){
            if(validateOnlyDigits(e.target.value)){
                setCylinder({
                    ...cylinder,
                    [e.target.name]: e.target.value,
                });
            }
        }else{
            setCylinder({
                ...cylinder,
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

    const [latestid, setLatestid] = useState([]);
    useEffect(() => {
      var theLoginToken = localStorage.getItem('login');       
          
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-batch-no', requestOptions)
      .then(response => response.json())
      .then(data => setLatestid(data.latestid.cylinder_batch_nos + 1)); 
    }, []);

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

    const onSubmit = (e) => {
      
        let data = {
            cylinder_year: dateyear,
            cylinder_date: cylinder.cylinder_date,
            cylinder_vendor_id: cylinder.cylinder_vendor_id,
            cylinder_count: '0',
            cylinder_batch_nos: latestid,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/web-create-cylinder",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            if(res.data.code == '200'){
                NotificationManager.success("Cylinder Created Sucessfully");
                history.push("cylinder");
            }else{
                NotificationManager.error("Duplicate Entry");
            }
            
        });
    }
    };

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Add Cylinder </h3>
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
                                            value={latestid}
                                            onChange={(e) => setLatestid(e.target.value)}
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
                    
                </div>
            </div>
        </div>
    );

}

export default AddCylinder;