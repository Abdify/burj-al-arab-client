import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        fetch("http://localhost:5000/bookings?email=" + loggedInUser.email, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setBookings(data));
    }, [])
    return (
        <div>
            <h1>Total bookings: { bookings && bookings.length }</h1>
            {
                bookings && bookings.map(booking => {
                    return <div style={{border: '2px solid'}} key={booking._id}>
                        <p>name: {booking.name}</p>
                        <p>From: {booking.checkIn}</p>
                        <p>To: {booking.checkOut}</p>
                    </div>
                })
            }
        </div>
    );
};

export default Bookings;