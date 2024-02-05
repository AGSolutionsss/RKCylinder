import React,{ useState } from "react";
import { QrReader } from 'react-qr-reader';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScannerModel = (props) => {
    return(
        <>
        <BarcodeScannerComponent
            onUpdate={(err, result) => {
                if (result) props.barcodeScannerValue(result.text);
                
              }}
        />
        
        </>
    )
}

export default ScannerModel;