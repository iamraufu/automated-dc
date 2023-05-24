import React, { useState } from 'react';
// import Sidebar from '../Sidebar';
import { FileUploader } from "react-drag-drop-files";
import * as CSV from 'xlsx';
import ViewSTOList from './ViewSTOList';
import UploadedSTO from './UploadedSTO';

let valid

const STOAssign = () => {

    const fileTypes = ["CSV", "XLSX"];

    const [fileUploadError, setFileUploadError] = useState("")
    // eslint-disable-next-line
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState("")
    const [data, setData] = useState([])

    const handleChange = (file) => {
        document.getElementById('file-loading-spinner').style.display = 'block'
        setFileUploadError("")
        setFile(file);
        setFileName(file.name)
        setFileSize(bytesToSize(file.size))
        document.getElementById('file-uploaded-container').style.display = 'block'

        const reader = new FileReader()
        reader.onload = (e) => {
            const workbook = CSV.read(e.target.result)
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const json = CSV.utils.sheet_to_json(worksheet)

            const stoData = json.map(obj => (
                {
                    code: obj.Site,
                    name: obj["Receiving Site Name"],
                    sto: obj["Purch.Doc."],
                    sku: obj.Quantity,
                    article: obj.Article,
                    product: obj["Article Description"],
                    dc: obj.SPlt
                }
            ));

            const filteredArray = stoData.filter((obj) => Object.values(obj).every((val) => val !== undefined));

            // const uniqueStoArray = [...new Set(stoData.map(item => item.sto))];
            // const resultArray = uniqueStoArray.map(sto => {
            //     return {
            //         sto: sto,
            //         // items: stoData.filter(item => item.sto === sto),
            //         code: stoData.filter(item => item.sto === sto)[0].code,
            //         name: stoData.filter(item => item.sto === sto)[0].name,
            //         sku: stoData.filter(item => item.sto === sto).reduce((accumulator, currentValue) => {
            //             const skuValue = typeof currentValue.sku === 'undefined' ? 0 : currentValue.sku;
            //             return accumulator + skuValue;
            //         }, 0)
            //     };
            // });
            setData(filteredArray)

            const labels = ['code', 'name', 'sto', 'sku', 'article', 'product', 'dc']
            const dataLabel = filteredArray.length > 0 ? Object.keys(filteredArray[0]) : valid = false

            valid = labels.every((item, index) => (item === dataLabel[index]) ? true : false)
            if(valid === false){
                document.getElementById('file-loading-spinner').style.display = 'none'
                setFileUploadError("File Format Mismatch. Please Check again and upload")
            }
            // valid === false && setFileUploadError("File Format Mismatch. Please Check again and upload")
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
        setData([])
        document.getElementById('file-uploaded-container').style.display = 'none'
    }

    return (
        // <section className='bg-brand container-fluid p-0'>
        //     <div className="d-flex">
        //         <div style={{ width: '116px' }} className="col-md-2 bg-white">
        //             <Sidebar />
        //         </div>

        //         <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">

        //             <div className='col-md-4'>
        //                 <div id="file-upload-container">
        //                     <FileUploader
        //                         children={
        //                             <div className="mx-auto d-block p-2">
        //                                 <p style={{ fontSize: '14px' }} className='text-center pt-2'>Click here to browse <br /> or drag and drop file here</p>
        //                             </div>
        //                         }
        //                         onTypeError={(err) => setFileUploadError(err)}
        //                         classes='d-flex justify-content-center align-items-center border-dashed'
        //                         multiple={false}
        //                         handleChange={handleChange}
        //                         name="file"
        //                         types={fileTypes} />
        //                 </div>

        //                 <div style={{ display: 'none' }} id="file-uploaded-container">
        //                     {
        //                         fileUploadError && <p className='fw-bold font-ibm text-danger m-0'>{fileUploadError}</p>
        //                     }
        //                     <div className="d-flex justify-content-between align-items-center px-1">
        //                         <p style={{ fontSize: '14px' }} className='text-brand fw-bold pt-3 mx-3 font-ibm'>{fileName}</p>
        //                         <p style={{ border: '1px solid #898A8D', fontSize: '13px' }} className='text-brand fw-bold rounded px-1 mt-3 mx-3 font-ibm'>{fileSize}</p>
        //                         <p style={{ fontSize: '14px', cursor: 'pointer' }} onClick={() => handleUndo()} className='font-ibm pt-3 text-primary'>undo</p>
        //                     </div>
        //                 </div>
        //             </div>

        //             {data.length > 0 && <ViewSTOList stoData={data} />}
        //             <UploadedSTO />
        //         </div>
        //     </div>
        // </section>
        <div className="">
            <div className='col-md-4'>
                <div id="file-upload-container">
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

                <div style={{ display: 'none' }} id="file-uploaded-container">
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
                data.length > 0 ? <ViewSTOList stoData={data} /> :
                    <div style={{ display: 'none' }} id='file-loading-spinner'>
                        <div className="d-flex justify-content-center align-items-center col-md-4">
                            <div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark" role="status"></div>
                            <p className='font-ibm mt-3 ms-2'>Converting the file...</p>
                        </div>
                    </div>
            }
            <UploadedSTO />
        </div>
    );
};

export default STOAssign;