import React, { useEffect, useState,useRef } from "react";
import {baseURL} from '../../api';
import { useHistory } from "react-router-dom";
import Moment from 'moment';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ScannerModel from "./ScannerModel";

const table_label = {
    border:'1px solid #ebedf2',
    width: '40px',
    fontSize:'13px',
    padding:'10px',
}
const table_label2 = {
    border:'1px solid #ebedf2',
    width: '100px',
    fontSize:'13px',
    padding:'10px',
}
const table_comb = {
    border:'1px solid #ebedf2',
    width: '135px',
    textAlign:'center',
    fontSize:'13px',
    padding:'10px',
}
const table_comb_2 = {
    border:'1px solid #ebedf2',
    width: '135px',
    fontSize:'13px',
    verticalAlign:'top',
    whiteSpace: 'pre-wrap',
    overflowWrap:'break-word',
    padding:'10px',
}
const table_comb3 = {
    border:'1px solid #ebedf2',
    width: '135px',
    verticalAlign:'top',
    fontSize:'13px',
    whiteSpace: 'pre-wrap',
    overflowWrap:'break-word',
    padding:'10px',
}

const table_terms = {
    border:'1px solid #ebedf2',
    fontSize:'11px',
    whiteSpace: 'pre-wrap',
    overflowWrap:'break-word',
    textAlign:'justify',
    lineHeight:'1.2',
    with:'80%',
    padding:'10px',
}
const table_terms_no = {
    border:'1px solid #ebedf2',
    fontSize:'11px',
    padding:'10px',
}
const table_comb1 = {
    border:'1px solid #ebedf2',
    width: '135px',
    fontSize:'12px',
    padding:'10px',
}
const table_combLast = {
    border:'1px solid #ebedf2',
    width: '135px',
    textAlign:'center',
    fontSize:'13px',
    padding:'0px',
}
const table2 = {
    border:'1px solid #ebedf2',
    padding:'10px',
}
const table_app = {
    border:'1px solid #ebedf2',
    width: '1px',
    textAlign:'center',
    fontSize:'13px',
    padding:'10px',
}

const ViewCylinder = (props) => {

    const componentRef = useRef();

    let history = useHistory();
    
    const [cylinders, setCylinder] = useState([]);

    const [ids, setId] = useState();

    const [showmodal, setShowmodal] = useState(true);

    const closegroupModal = () => {
        setShowmodal(false);
    };

    const openmodal = () => {
        setShowmodal(true);
    };


    

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    useEffect(() => {
        var isLoggedIn = localStorage.getItem("user_type_id");
        if(!isLoggedIn){

        window.location = "/login";
        
        }else{

        }
        
    });

    useEffect(() => {
        const fetchData =  async() => {
            var theLoginToken = localStorage.getItem('login');       
          
            const requestOptions = {
                method: 'GET', 
                headers: {
                    'Authorization': 'Bearer '+theLoginToken
                }             
            };  
            fetch(baseURL+'/web-fetch-cylinder-by-scan/'+ids, requestOptions)
            .then(response => response.json())
            .then(data => setCylinder(data.cylinderSub));
            
        };
        fetchData();
    }, [ids]);

    const barcodeScannerValue = (selectedProduct) => {
        console.log("debug",selectedProduct);
        setShowmodal(false);
        setId(selectedProduct);
    }

    return(
        <div>
            <div className="page-header">
                <h3 className="page-title"> View Cylinder </h3>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="row" ref={componentRef}>
                            <div className="table-responsive">
                                {cylinders.map((cylinder) =>(
                                <table className="table" style={{border:'1px solid #ebedf2', tableLayout: 'fixed',marginLeft:'20px',marginRight:'20px', width:'96%'}}>
                                    <tr>
                                       <td style={table_label}>Barcode</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{cylinder.cylinder_sub_barcode }</b></td>
                                       <td style={table_label}>Date</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{Moment(cylinder.cylinder_date).format('DD-MM-YYYY') }</b></td>
                                    </tr>
                                    <tr>
                                       <td style={table_label}>Vendor</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{cylinder.vendor_name }</b></td>
                                       <td style={table_label}>Batch No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{cylinder.cylinder_batch_nos }</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>Company No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{cylinder.cylinder_sub_company_no }</b></td>
                                       <td style={table_label}>Batch No</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{cylinder.cylinder_sub_batch_no }</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>Manufacturer</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{cylinder.manufacturer_name }</b></td>
                                       <td style={table_label}>Month</td>
                                       <td style={table_app}>:</td>
                                       <td style={table_label2}><b>{cylinder.cylinder_sub_manufacturer_month }</b></td>
                                    </tr>
                                    <tr>
                                        <td style={table_label}>Year</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{cylinder.cylinder_sub_manufacturer_year}</b></td>
                                        <td style={table_label}>Weight</td>
                                        <td style={table_app}>:</td>
                                        <td style={table_label2}><b>{cylinder.cylinder_sub_weight}</b></td>
                                    </tr>
                                    
                                 </table>
                                 ))}
                            </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={showmodal} toggle={() => closegroupModal()}>
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

export default ViewCylinder;