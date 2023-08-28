import { useEffect, useState } from "react";

const useCredential = () => {

    const id = localStorage.getItem('uId')
    const [user, setUser] = useState({});
    const [tickets, setTickets] = useState([])
    const [pickerTickets, setPickerTickets] = useState([])
    const [sorterTickets, setSorterTickets] = useState([])
    const [vehicleTickets, setVehicleTickets] = useState([])
    const [notice, setNotice] = useState([])
    const [sto, setSto] = useState([])
    const [viewSto, setViewSto] = useState([])
    const [dn, setDn] = useState([])
    const [viewDn, setViewDn] = useState([])
    const [assignedSto, setAssignedSto] = useState([])
    const [selectedZone, setSelectedZone] = useState([])
    const [productCategory, setProductCategory] = useState([])
    const [startDate, setStartDate] = useState(new Date()); // new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const [endDate, setEndDate] = useState(new Date());

    // getting userInfo from localStorage id and backend API
    const userData = () => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://shwapnodc.onrender.com/user/${id}`);
                const result = await response.json();
                setUser(result.user)
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    // persist login
    useEffect(() => {
        if (id) {
            userData()
        } else {
            setUser({})
        }
        //eslint-disable-next-line
    }, [])

    // tickets
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://shwapnodc.onrender.com/tickets`);
                const data = await response.json();
                setTickets(data.tickets);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [])

    // notice
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://shwapnodc.onrender.com/notice`);
                const data = await response.json();
                setNotice(data.notice);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [])

    // vehicle management
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://shwapnodc.onrender.com/categorized-tickets/Vehicle Management`);
                const data = await response.json();
                setVehicleTickets(data.tickets);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [])

    // picker management
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://shwapnodc.onrender.com/categorized-tickets/Picker Management`);
                const data = await response.json();
                setPickerTickets(data.tickets);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [])

    // sorter management
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://shwapnodc.onrender.com/categorized-tickets/Sorter Management`);
                const data = await response.json();
                setSorterTickets(data.tickets);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }, [])

    // sto by email
    // useEffect(() => {
    //     if (user.email) {
    //         fetch(`https://shwapnodc.onrender.com/sto-email/${user.email}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data.status === true) {
    //                     setStoDates([...new Set(data.sto.map(item => item.date))])
    //                     setSto(data.sto)
    //                 }
    //             })
    //     }
    // }, [user.email])

    // email
    const logOut = () => {
        localStorage.removeItem('uId')
        setUser({})
    }

    return {
        user,
        setUser,
        tickets,
        setTickets,
        sto,
        setSto,
        dn, 
        setDn,
        notice,
        setNotice,
        pickerTickets,
        sorterTickets,
        vehicleTickets,
        selectedZone,
        setSelectedZone,
        viewSto,
        setViewSto,
        viewDn, 
        setViewDn,
        productCategory,
        setProductCategory,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        assignedSto,
        setAssignedSto,
        logOut
    }
};

export default useCredential;