import React,{ useState } from "react";
import { QrReader } from 'react-qr-reader';


const ScannerModel = (props) => {
    return(
        <>
        <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    props.barcodeScannerValue(result?.text);
                }
            }}
            style={{ width: '100%' }}
        />
        </>
    )
}

export default ScannerModel;