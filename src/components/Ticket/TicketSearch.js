import React, { useEffect, useState } from 'react';
import TicketTitle from './TicketTitle';
import TicketDetails from './TicketDetails';
import useAuth from '../../hooks/useAuth';

const TicketSearch = () => {

    const { setTickets } = useAuth()
    const [searchKey, setSearchKey] = useState('')
    const [searchedTickets, setSearchedTickets] = useState([])

    useEffect(() => {
        const handler = setTimeout(() => {
            searchKey.length > 0 ?
                fetch(`http://localhost:8000/search-tickets?search=${searchKey}`)
                    .then(response => response.json())
                    .then(data => {
                        setSearchedTickets(data.tickets)
                    })
                :
                setSearchedTickets([])
        }, 800)
        return () => {
            clearTimeout(handler);
        };
    }, [searchKey, setTickets])

    return (
        <div>
            <input type="text" onChange={(e) =>
                // handleChange(e.target.value)
                setSearchKey(e.target.value)
            } className='home-hero-search' placeholder='Search' />

            {
                searchedTickets.length > 0 &&
                <section className='mt-3 mb-5'>
                    <h2 className='h5 font-ibm'>Search Results</h2>
                    <TicketTitle />
                    {searchedTickets.map(ticket => <TicketDetails key={ticket._id} ticket={ticket} />)}
                    <hr />
                </section>
            }
        </div>
    );
};

export default TicketSearch;