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

    // getting userInfo from localStorage id and backend API
    const userData = () => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${id}`);
                const result = await response.json();
                setUser(result.user)
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    }

    useEffect(() => {
        if (id) {
            userData()
        }
        else {
            setUser({})
        }
        //eslint-disable-next-line
    }, [])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/tickets`);
                const data = await response.json();
                setTickets(data.tickets);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    },[])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/notice`);
                const data = await response.json();
                setNotice(data.notice);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    },[])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/categorized-tickets/Vehicle Management`);
                const data = await response.json();
                setVehicleTickets(data.tickets);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    },[])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/categorized-tickets/Picker Management`);
                const data = await response.json();
                setPickerTickets(data.tickets);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    },[])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/categorized-tickets/Sorter Management`);
                const data = await response.json();
                setSorterTickets(data.tickets);
            } catch (error) {
                fetchData();
            }
        };
        fetchData();
    },[])

    useEffect(()=> {
        if(user.email) {
            fetch(`http://localhost:5000/sto-email/${user.email}`)
            .then(res => res.json())
            .then(data => data.status === true && setSto(data.sto))
        }
    },[user.email])

    const logOut = () => {
        localStorage.removeItem('uId')
        setUser({})
    }

    return {
        setUser,
        user,
        tickets,
        setTickets,
        notice,
        setNotice,
        sto,
        pickerTickets,
        sorterTickets,
        vehicleTickets,
        logOut
    }
};

export default useCredential;