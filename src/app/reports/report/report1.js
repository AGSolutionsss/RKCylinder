import React, { useEffect, useState, useRef } from "react";
import {baseURL} from '../../../api';
import axios from "axios";
import Moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactToPrint from "react-to-print";
import { NotificationManager,} from "react-notifications";
import { savePDF } from '@progress/kendo-react-pdf';

const table_head = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "10px"
};

const table_row = {
    fontSize: "9px"
};

const Report1 = (props) => {

    const componentRef = useRef();

    const [loader, setLoader]= useState(true);

    const [cylinderDownload, setCylinderDownload] = useState([]);

        useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/signin";
        
        }else{

        }

        let data = {
            cylinder_date_from:localStorage.getItem("cylinder_date_from"),
            cylinder_date_to: localStorage.getItem("cylinder_date_to"), 
        };

        axios({
            url: baseURL+"/fetch-report1-report",
            method: "POST",
            data,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("login")}`,
            },
          }).then((res) => {
            
            setCylinderDownload(res.data.cylinder);
            setLoader(false);

          });
        }, []);

        const onSubmit = (e) => {
      
            let data = {
                cylinder_date_from:localStorage.getItem("cylinder_date_from"),
                cylinder_date_to: localStorage.getItem("cylinder_date_to"), 
            };
            e.preventDefault();
            
            axios({
                url: baseURL+"/download-report1-report",
                method: "POST",
                data,
                headers: {
                Authorization: `Bearer ${localStorage.getItem("login")}`,
                },
            }).then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report1.csv');
                document.body.appendChild(link);
                link.click();
                NotificationManager.success("Report is Downloaded Successfully");
                
                
            }).catch((err) =>{
                NotificationManager.error("Report is Not Downloaded");
                
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
                <h3 className="page-title"> Report </h3>
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
                                                <th style={table_head}>Code No</th>
                                                <th style={table_head}>Serial No</th>
                                                <th style={table_head}>Make</th>
                                                <th style={table_head}>Month & Year</th>
                                                <th style={table_head}>Batch No</th>
                                                <th style={table_head}>Tare Weight</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cylinderDownload.map((dataSumm, key)=>(
                                                <tr key={key}>
                                                    <td style={table_row}>{dataSumm.cylinder_sub_company_no}</td>
                                                    <td style={table_row}>{dataSumm.cylinder_sub_barcode}</td>
                                                    <td style={table_row}>{dataSumm.manufacturer_name}</td>
                                                    <td style={table_row}>{dataSumm.cylinder_sub_manufacturer_month}/{dataSumm.cylinder_sub_manufacturer_year}</td>
                                                    <td style={table_row}>{dataSumm.cylinder_sub_batch_no}</td>
                                                    <td style={table_row}>{dataSumm.cylinder_sub_weight}</td>
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

export default Report1;