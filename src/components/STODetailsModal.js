import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const STODetailsModal = ({ data }) => {

    const { user } = useAuth()
    const { code, name, sku, sto } = data
    const [products, setProducts] = useState({})

    useEffect(() => {
        const fetchData = async() => {
            const response = await fetch(`http://localhost:8000/sto-email/${user.email}/${sto}`)
            const result = await response.json()
            setProducts(result.sto)
        }
        sto && fetchData()
        // fetch(`http://localhost:8000/sto-email/${user.email}/${sto}`)
        //     .then(response => response.json())
        //     .then(result => setProducts(result.sto))
    }, [user.email, sto])

    return (
        <div className="modal fade" id="stoDetailsModal" tabIndex="-1" aria-labelledby="stoDetailsModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="">
                            <h1 className="modal-title h6 font-inter" id="stoDetailsModalLabel">STO: {sto}</h1>
                            <h2 className="modal-title h6 font-inter">Outlet Code: {code}</h2>
                            <h2 className="modal-title h6 font-inter">Outlet Name: {name}</h2>
                            <h3 className="modal-title h6 font-inter">Total SKU: {sku}</h3>
                            <h3 className="modal-title h6 font-inter">Total Quantity: {products.length && products.reduce((a, c) => a + c.quantity, 0).toLocaleString()}</h3>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div style={{ maxHeight: '450px', overflowY: 'auto' }} className="table-responsive mt-3 bg-white">
                            <table style={{ fontSize: "13px" }} className="table table-bordered font-ibm m-0">
                                <thead style={{ top: '-2px' }} className='sticky-top bg-white'>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Article</th>
                                        <th scope="col">Article Description</th>
                                        <th scope="col">SAP Stock</th>
                                        <th scope="col">Store Stock</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.length > 0 ?
                                            products.map((product, index) =>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{product.article}</td>
                                                    <td>{product.product}</td>
                                                    <td>{product.sap_stock}</td>
                                                    <td>{product.store_stock}</td>
                                                    <td>{product.quantity}</td>
                                                </tr>)
                                            :
                                            <tr>
                                                <td colSpan="6" className='font-ibm'>
                                                    <div>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <div style={{ width: '18px', height: '18px' }} className="spinner-border text-dark" role="status"></div>
                                                            <p className='font-ibm mt-3 ms-2'>Loading...</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default STODetailsModal;