import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import * as CSV from 'xlsx';
import ViewDN from './ViewDN';
import useAuth from '../hooks/useAuth';
let valid

const UploadDN = () => {

    const fileTypes = ["CSV", "XLSX"];

    const [fileUploadError, setFileUploadError] = useState("")
    // eslint-disable-next-line
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState("")
    const { setViewDn, setDn, dn } = useAuth()

    const handleChange = (file) => {
        document.getElementById('dn-loading-spinner').style.display = 'block'
        setFileUploadError("")
        setFile(file);
        setFileName(file.name)
        setFileSize(bytesToSize(file.size))
        document.getElementById('dn-upload-container').style.display = 'none'
        document.getElementById('dn-uploaded-container').style.display = 'block'

        const reader = new FileReader()
        reader.onload = (e) => {
            const workbook = CSV.read(e.target.result)
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const json = CSV.utils.sheet_to_json(worksheet)

            console.log(json)

            const dnData = json.map(obj => (
                {
                    article: obj.Article,
                    category: String(obj.Article).slice(0, 2),
                    code: obj.Site,
                    dc: obj.SPlt,
                    name: obj["Receiving Site Name"],
                    product: obj["Article Description"],
                    quantity: obj.Quantity,
                    sap_stock: obj["DC Present Stock"],
                    status: 'Pending',
                    sto: obj["Purch.Doc."],
                    dn: obj["Delivery Doc."],
                    dn_quantity: obj["Delivery Pending"],
                    amount: obj["Stock Tr. Value."],
                    store_stock: obj["Store Present Stock"]
                }
            ));

            const dnData2 = json.reduce((result, obj) => {
                const sto = obj["Purch.Doc."];
                const dn = obj["Delivery Doc."];
                // const catCode = obj["Article"];

                const existingItem = result.find(item => {
                    return ('Article' in obj && item.sto === sto && item.dn === dn)
                });

                if (existingItem) {
                    existingItem.sku += 1;
                }
                else if ('Article' in obj) {
                    const item = {
                        code: obj.Site,
                        name: obj["Receiving Site Name"],
                        sto: sto,
                        dn: obj["Delivery Doc."],
                        sku: 1,
                        dc: obj.SPlt,
                        status: 'Delivering'
                    };
                    result.push(item);
                }
                return result;
            }, []);

            const filteredArray = dnData.filter((obj) => Object.values(obj).every((val) => val !== undefined && val !== ""));
            const filteredArray2 = dnData2.filter((obj) => Object.values(obj).every((val) => val !== undefined && val !== ""));

            setViewDn(filteredArray)
            setDn(filteredArray2)

            const labels = ['article', 'category', 'code', 'dc', 'name', 'product', 'quantity', 'sap_stock', 'status', 'sto', 'dn','dn_quantity', 'amount', 'store_stock']
            const dataLabel = filteredArray.length > 0 ? Object.keys(filteredArray[0]) : valid = false

            valid = labels.every((item, index) => (item === dataLabel[index]) ? true : false)

            if (!valid) {
                document.getElementById('dn-loading-spinner').style.display = 'none'
                setFileUploadError("File Format Mismatch. Please Check again and upload")
                document.getElementById('dn-upload-container').style.display = 'block'
            }
        }
        reader.readAsArrayBuffer(file)
    };

    const bytesToSize = bytes => {
        const KB = 1024;
        const MB = KB * KB;

        if (bytes < KB) {
            return bytes + " bytes";
        } else if (bytes < MB) {
            return (bytes / KB).toFixed(2) + " KB";
        } else {
            return (bytes / MB).toFixed(2) + " MB";
        }
    }

    const handleUndo = () => {
        setFile(null)
        setDn([])
        document.getElementById('dn-uploaded-container').style.display = 'none'
        document.getElementById('dn-upload-container').style.display = 'block'
    }

    return (
        <div className='ms-2 mt-3'>
            <div className='col-md-4'>
                <h2 className='h6 font-ibm ms-2'>Update Delivery Note</h2>
                <div id="dn-upload-container">
                    <FileUploader
                        children={
                            <div className="mx-auto d-block p-2">
                                <p style={{ fontSize: '14px' }} className='text-center pt-2'>Click here to browse <br /> or drag and drop file here</p>
                            </div>
                        }
                        onTypeError={(err) => setFileUploadError(err)}
                        classes='d-flex justify-content-center align-items-center border-dashed'
                        multiple={false}
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes} />
                </div>

                <div style={{ display: 'none' }} id="dn-uploaded-container">
                    {
                        fileUploadError && <p className='fw-bold font-ibm text-danger m-0'>{fileUploadError}</p>
                    }
                    <div className="d-flex justify-content-between align-items-center px-1">
                        <p style={{ fontSize: '14px' }} className='text-brand fw-bold pt-3 mx-3 font-ibm'>{fileName}</p>
                        <p style={{ border: '1px solid #898A8D', fontSize: '13px' }} className='text-brand fw-bold rounded px-1 mt-3 mx-3 font-ibm'>{fileSize}</p>
                        <p style={{ fontSize: '14px', cursor: 'pointer' }} onClick={() => handleUndo()} className='font-ibm pt-3 text-primary'>undo</p>
                    </div>
                </div>
            </div>

            {
                dn.length > 0 ?
                    <ViewDN dnData={dn} />
                    :
                    <div style={{ display: 'none' }} id='dn-loading-spinner'>
                        <div className="d-flex justify-content-center align-items-center col-md-4">
                            <div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark" role="status"></div>
                            <p className='font-ibm mt-3 ms-2'>Converting the file...</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default UploadDN;