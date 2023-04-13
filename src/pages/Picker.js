import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FileUploader } from "react-drag-drop-files";
import * as CSV from 'xlsx';
import ViewSTOList from '../components/STO/ViewSTOList';
import UploadedSTO from '../components/STO/UploadedSTO';
// import TicketDetails from '../components/Ticket/TicketDetails';
// import TicketTitle from '../components/Ticket/TicketTitle';
// import useAuth from '../hooks/useAuth';

let valid

const Picker = () => {

    // const { pickerTickets } = useAuth()
    // const tickets = pickerTickets
    const fileTypes = ["CSV", "XLSX"];

    const [fileUploadError, setFileUploadError] = useState("")
    // eslint-disable-next-line
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState("")
    const [data, setData] = useState([])

    const handleChange = (file) => {
        setFileUploadError("")
        setFile(file);
        setFileName(file.name)
        setFileSize(bytesToSize(file.size))
        // document.getElementById('file-upload-container').style.display = 'none'
        document.getElementById('file-uploaded-container').style.display = 'block'

        const reader = new FileReader()
        reader.onload = (e) => {
            const workbook = CSV.read(e.target.result)
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const json = CSV.utils.sheet_to_json(worksheet)

            const stoData = json.map(obj => ({
                code: obj.Site,
                name: obj["Receiving Site Name"],
                sto: obj["Purch.Doc."],
                sku: obj.Quantity
            }));

            const uniqueStoArray = [...new Set(stoData.map(item => item.sto))];

            const resultArray = uniqueStoArray.map(sto => {
                return {
                    sto: sto,
                    // items: stoData.filter(item => item.sto === sto),
                    code: stoData.filter(item => item.sto === sto)[0].code,
                    name: stoData.filter(item => item.sto === sto)[0].name,
                    sku: stoData.filter(item => item.sto === sto).reduce((accumulator, currentValue) => {
                        const skuValue = typeof currentValue.sku === 'undefined' ? 0 : currentValue.sku;
                        return accumulator + skuValue;
                    }, 0)
                };
            });

            setData(resultArray)

            const labels = ['code', 'name', 'sto', 'sku']
            const dataLabel = Object.keys(stoData[0])

            valid = labels.every((item, index) => (item === dataLabel[index]) ? true : false)
            valid === false && setFileUploadError("File Format Mismatch. Please Check again and upload")
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
        // document.getElementById('file-upload-container').style.display = 'block'
        document.getElementById('file-uploaded-container').style.display = 'none'
    }

    return (
        <section className='bg-brand container-fluid p-0'>
            <div className="d-flex">
                <div style={{ width: '116px' }} className="col-md-2 bg-white">
                    <Sidebar />
                </div>

                <div style={{ maxHeight: '100vh', overflow: 'auto' }} className="col-md-10 px-4 py-3 mx-auto d-block">

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

                        {/* <div style={{ display: 'none', width: '15px', height: '15px' }} className="spinner-border" role="status"><p style={{ fontSize: '14px' }} id='convert-loading'>Converting </p></div> */}

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

                    {data.length > 0 && <ViewSTOList stoData={data} />}

                    {/* <TicketTitle />
                    {
                        tickets.length > 0 ?
                            tickets.map(ticket => <TicketDetails key={ticket._id} ticket={ticket} />)
                            :
                            <div className="">
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                                <p className="placeholder-glow">
                                    <span className="placeholder col-12"></span>
                                </p>
                            </div>
                    } */}
                    <UploadedSTO />
                </div>
            </div>
        </section>
    );
};

export default Picker;