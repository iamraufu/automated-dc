import React from 'react';

const PoData = () => {

    const createPO = async () => {

        const details = {
            "PoData": [
                    {
                        "VENDOR": "0000201161",
                        "PO_ITEM": "10",
                        "MATERIAL": "3101349",
                        "PLANT": "DK02",
                        "QUANTITY": 10,
                        "COND_VALUE": 28,
                        "Price": 27
                    }, {
                        "VENDOR": "0000201161",
                        "PO_ITEM": "20",
                        "MATERIAL": "3101350",
                        "PLANT": "DK02",
                        "QUANTITY": 10,
                        "COND_VALUE": 28,
                        "Price": 26
                    }
                ],
            "AuthData": [
                {"UserID":"rupom", "Password":"bd1975"}
            ]
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`http://202.74.246.133:81/sap/outlet_automation/createpo.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(details)
                });
                const result = await response.json();
                console.log(result)
            } 
            catch (error) {
                // fetchData();
                console.log(error)
            }
        };
        fetchData();
    }

    return (
        <div>
            <button onClick={() => createPO()} className='mx-auto d-block mt-5 btn btn-success px-5 py-3'>Create PO</button>
        </div>
    );
};

export default PoData;