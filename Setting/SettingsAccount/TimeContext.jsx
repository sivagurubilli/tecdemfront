
import React, { createContext, useState, useEffect, useContext } from 'react';
import moment from 'moment-timezone';

const TimeZoneContext = createContext();

export const TimeZoneProvider = ({ children }) => {
    const systemTimeZone = moment.tz.guess();
    const systemDateTime = moment().format('YYYY-MM-DD HH:mm:ss');  // Default system date and time

    // const [selectedTimeEntry, setSelectedTimeEntry] = useState(localStorage.getItem('timeZone') || systemTimeZone);
    const [timeFormat, setTimeFormat] = useState(localStorage.getItem('timeFormat') || 'HH:mm:ss');
    const [dateFormat, setDateFormat] = useState(localStorage.getItem('dateFormat') || 'YYYY-MM-DD');
    const [dateTime, setDateTime] = useState(localStorage.getItem('dateTime') || systemDateTime);

    // useEffect(() => {
    // }, [selectedTimeEntry]);

    useEffect(() => {
    }, [timeFormat]);

    useEffect(() => {
    }, [dateFormat]);

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(moment().format(`${dateFormat} ${timeFormat}`));
        }, 1000); // Update every second


        return () => clearInterval(interval);
    }, [dateFormat, timeFormat, dateTime]);

    return (
        <TimeZoneContext.Provider 
            value={{ 
                selectedTimeEntry, 
                setSelectedTimeEntry,
                timeFormat, 
                setTimeFormat, 
                dateFormat, 
                setDateFormat,
                dateTime, 
                setDateTime 
            }}
        >
            {children}
        </TimeZoneContext.Provider>
    );
};

export const useTimeZone = () => {
    return useContext(TimeZoneContext);
};
