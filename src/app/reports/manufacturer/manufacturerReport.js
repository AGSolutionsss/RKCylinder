import React, { useEffect, useState, useRef } from "react";
import {baseURL} from '../../../api';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactToPrint from "react-to-print";
import { NotificationManager,} from "react-notifications";
import { savePDF } from '@progress/kendo-react-pdf';

const table_head = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "12px"
};

const table_row = {
    fontSize: "11px"
};

const ManufacturerReport = (props) => {

    const componentRef = useRef();

    const [loader, setLoader]= useState(true);

    const [manufacturerDownload, setManufacturerDownload] = useState([]);

        useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        axios({
            url: baseURL+"/fetch-manufacturer-report",
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setManufacturerDownload(res.data.manufacturer);
            setLoader(false);

          });
        }, []);

        const onSubmit = (e) => {
            e.preventDefault();
            
            axios({
                url: baseURL+"/download-manufacturer-report",
                method: "POST",
                headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
            }).then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'manufacturer_list.csv');
                document.body.appendChild(link);
                link.click();
                NotificationManager.success("Manufacturer Report is Downloaded Successfully");
                
                
            }).catch((err) =>{
                NotificationManager.error("Vendor Report is Not Downloaded");
                
            });
        
        };

        const  handleExportWithFunction  = (e) => {
            savePDF(componentRef.current, { 
                paperSize:  "A4", 
                orientation: "vertical",
                scale: 0.8,
            });
        }

    return(
        <div>
            { loader && <CircularProgress disableShrink style={{marginLeft:"600px", marginTop:"300px", marginBottom:"300px"}} color="secondary" />}
            {!loader && 
            <>
            <div className="page-header">
                <h3 className="page-title"> Manufacturer Report </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row icons-list">
                                <div className="col-sm-6 col-md-4 col-lg-4" style={{justifyContent:'center'}}>
                                    <a className="btn btn-gradient-primary" onClick={(e) => handleExportWithFunction(e)}>
                                        <i className=" mdi mdi-file" style={{color:'white'}}></i> PDF
                                    </a>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-4" style={{justifyContent:'center'}}>
                                    <a className="btn btn-gradient-primary" onClick={(e) => onSubmit(e)}>
                                        <i className=" mdi mdi-download" style={{color:'white'}}></i> Download
                                    </a>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-4" style={{justifyContent:'center'}}>
                                    <ReactToPrint
                                        trigger={() => (
                                            <a className="btn btn-gradient-primary">
                                                <i className=" mdi mdi-printer" style={{color:'white'}}></i> Print
                                            </a>
                                        )}
                                        content={() => componentRef.current}
                                        
                                        />
                                </div> 
                            </div>
                            <div className="row mt-4" ref={componentRef}>
                                <div className="table-responsive" style={{margin:'10px'}}>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={table_head}>Manufacturer Name</th>
                                                <th style={table_head}>Address</th>
                                                <th style={table_head}>State</th>
                                                <th style={table_head}>Mobile</th>
                                                <th style={table_head}>Email</th>
                                                <th style={table_head}>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {manufacturerDownload.map((dataSumm, key)=>(
                                                <tr>
                                                    <td style={table_row}>{dataSumm.manufacturer_name}</td>
                                                    <td style={table_row}>{dataSumm.manufacturer_address}</td>
                                                    <td style={table_row}>{dataSumm.manufacturer_state}</td>
                                                    <td style={table_row}>{dataSumm.manufacturer_mobile}</td>
                                                    <td style={table_row}>{dataSumm.manufacturer_email}</td>
                                                    <td style={table_row}>{dataSumm.manufacturer_status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>}
        </div>
    );

}

export default ManufacturerReport;