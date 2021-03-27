import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";
import Bookings from "../Bookings/Bookings";

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = React.useState({
        checkIn: new Date(),
        checkOut: new Date(),
    });

    const handleCheckIn = (date) => {
        const newDates = {...selectedDate};
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };
    const handleCheckOut = (date) => {
        const newDates = {...selectedDate};
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };

    const handleBooking = () => {
        const newBooking = {...loggedInUser, ...selectedDate};
        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Hello, {loggedInUser.name}!</h1>
            <h1>Let's book a {bedType} Room.</h1>
            <p>
                Want a <Link to="/home">different room?</Link>{" "}
            </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check in date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckIn}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check out date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOut}
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                    />
                </Grid>
                <Button variant="contained" color="primary" onClick={handleBooking}>
                    Book now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings />
        </div>
    );
};

export default Book;
