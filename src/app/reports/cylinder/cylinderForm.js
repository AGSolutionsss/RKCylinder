import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import {baseURL} from '../../../api';
import { useHistory } from "react-router-dom";
import axios from "axios";
import {  NotificationManager,} from "react-notifications";
import { Button } from "reactstrap";
import MenuItem from "@material-ui/core/MenuItem";

const CylinderForm = (props) => {

    let history = useHistory();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    var todayback = yyyy + "-" + mm + "-" + dd;

    const [cylinderDownload, setCylinderDownload] = useState({
        cylinder_date_from: "2023-04-01",
        cylinder_date_to: todayback,
        cylinder_vendor: "",
        
    });

    const [vendor, setVendor] = useState([]);
    useEffect(() => {
        var theLoginToken = localStorage.getItem('login');       
        const requestOptions = {
              method: 'GET', 
              headers: {
                 'Authorization': 'Bearer '+theLoginToken,
              }             
        };     
  
  
      fetch(baseURL+'/web-fetch-vendor', requestOptions)
      .then(response => response.json())
      .then(data => setVendor(data.vendor)); 
    }, []);

    const onInputChange = (e) => {
        
        setCylinderDownload({
        ...cylinderDownload,
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

    const onSubmit = (e) => {
      
        let data = {
            cylinder_date_from: cylinderDownload.cylinder_date_from,
            cylinder_date_to: cylinderDownload.cylinder_date_to,
            cylinder_vendor: cylinderDownload.cylinder_vendor,
        };
        e.preventDefault();
        var v = document.getElementById("addIndiv").checkValidity();
        var v = document.getElementById("addIndiv").reportValidity();
        if (v) {
        setIsButtonDisabled(true)
        axios({
            url: baseURL+"/download-cylinder-report",
            method: "POST",
            data,
            headers: {
            Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'cylinder.csv');
            document.body.appendChild(link);
            link.click();
            NotificationManager.success("Report is Downloaded Successfully");
            setIsButtonDisabled(false)
            
        }).catch((err) =>{
            NotificationManager.error("Report is Not Downloaded");
            setIsButtonDisabled(false)
        });
    }
    };

    const onReportView = (e) => {
        e.preventDefault();

        localStorage.setItem('cylinder_date_from',cylinderDownload.cylinder_date_from);
        localStorage.setItem('cylinder_date_to',cylinderDownload.cylinder_date_to);
        localStorage.setItem('cylinder_vendor',cylinderDownload.cylinder_vendor);
        history.push("/reportCylinder");
        
    }

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> Cylinder Report </h3>
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
                                            label="From Date"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            autoComplete="Name"
                                            name="cylinder_date_from"
                                            value={cylinderDownload.cylinder_date_from}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            required
                                            label="To Date"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                            autoComplete="Name"
                                            name="cylinder_date_to"
                                            value={cylinderDownload.cylinder_date_to}
                                            onChange={(e) => onInputChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4 col-xl-4">
                                        <div className="form-group">
                                            <TextField
                                            fullWidth
                                            label="Vendor Name"
                                            autoComplete="Name"
                                            SelectProps={{
                                                MenuProps: {},
                                            }}
                                            select
                                            name="cylinder_vendor"
                                            value={cylinderDownload.cylinder_vendor}
                                            onChange={(e) => onInputChange(e)}
                                            >
                                                {vendor.map((vendorName, key) => (
                                                    <MenuItem key={key} value={vendorName.id}>
                                                        {vendorName.vendor_name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-12 col-xl-12">
                                        <div className="form-group">
                                        <Button
                                            type="submit"
                                            className="btn btn-gradient-primary mr-2"
                                            color="primary"
                                            onClick={(e) => onSubmit(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            Download
                                            </Button>
                                            <Button
                                            
                                            className="btn btn-gradient-primary mr-2"
                                            color="primary"
                                            onClick={(e) => onReportView(e)}
                                            disabled={isButtonDisabled}
                                            >
                                            View
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default CylinderForm;