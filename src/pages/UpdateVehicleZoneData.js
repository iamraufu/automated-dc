import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import * as CSV from 'xlsx';
import ViewVehicleZoneData from '../components/ViewVehicleZoneData';
let valid;

const UpdateVehicleZoneData = () => {

    const fileTypes = ["CSV", "XLSX"];

    const [fileUploadError, setFileUploadError] = useState("")
    // eslint-disable-next-line
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState("")
    const [fileSize, setFileSize] = useState("")
    const [data, setData] = useState([])


    const handleChange = (file) => {
        document.getElementById('vehicle_zone-loading-spinner').style.display = 'block'
        setFileUploadError("")
        setFile(file);
        setFileName(file.name)
        setFileSize(bytesToSize(file.size))
        document.getElementById('vehicle_zone-uploaded-container').style.display = 'block'
        document.getElementById('vehicle_zone-upload-container').style.display = 'none'

        const reader = new FileReader()
        reader.onload = (e) => {
            const workbook = CSV.read(e.target.result)
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const json = CSV.utils.sheet_to_json(worksheet)

            const vehicleZoneData = json.map(obj => (
                {
                    id: Number(obj.id),
                    code: obj.code,
                    name: obj.name,
                    zone: obj.zone
                }
            ));

            const filteredArray = vehicleZoneData.filter((obj) => Object.values(obj).every((val) => val !== undefined));

            // setViewSto(filteredArray)
            setData(filteredArray)

            const labels = ['id', 'code', 'name', 'zone']
            const dataLabel = filteredArray.length > 0 ? Object.keys(filteredArray[0]) : valid = false

            valid = labels.every((item, index) => (item === dataLabel[index]) ? true : false)
            if (!valid) {
                document.getElementById('vehicle_zone-loading-spinner').style.display = 'none'
                setFileUploadError("File Format Mismatch. Please Check again and upload")
                document.getElementById('vehicle_zone-upload-container').style.display = 'block'
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
        setData([])
        document.getElementById('vehicle_zone-uploaded-container').style.display = 'none'
        document.getElementById('vehicle_zone-upload-container').style.display = 'block'
    }

    return (
        <div className='ms-2 mt-3'>
            <div className='col-md-4'>
            <h2 className='h6 font-ibm ms-2'>Update Vehicle Zone</h2>
                <div id="vehicle_zone-upload-container">
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

                <div style={{ display: 'none' }} id="vehicle_zone-uploaded-container">
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
                data.length > 0 ?
                    <ViewVehicleZoneData vehicleData={data} />
                    :
                    <div style={{ display: 'none' }} id='vehicle_zone-loading-spinner'>
                        <div className="d-flex justify-content-center align-items-center col-md-4">
                            <div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark" role="status"></div>
                            <p className='font-ibm mt-3 ms-2'>Converting the file...</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default UpdateVehicleZoneData;