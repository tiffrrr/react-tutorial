import React, { useState, useEffect, useRef,forwardRef } from 'react';

import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
import "./react-datepicker-custom.scss";

const CustomDatePicker = (props) => {
    const {
        // startDate = null,
        selected,
        minDate,
        maxDate,
        placeholder = '請選擇',
        disabled = false,
        onChange
    } = props;
    // const [startDate, setStartDate] = useState(new Date());
  
    const DateCustomInput = forwardRef((props, ref) => {
        const {value,onClick,onChange,disabled,placeholder} = props;
        return(
            <input type='input' readOnly onClick={onClick} onChange={onChange} placeholder={placeholder} value={value} disabled={disabled}/>

        )
    });



    return (
        <>
        <div className='demo-datepicker'>
            <h2> 瀏覽器原生 </h2>
            <input type='date' onChange={(e)=>{console.log(e.target.value)}}></input>
        </div>
        <div className='demo-datepicker'>
            <h2> 使用react-datepicker套件 </h2>
            <DatePicker 
                selected={selected} 
                minDate={minDate}
                maxDate={maxDate}
                placeholderText={placeholder}
                disabled={disabled}
                onChange={onChange}     
    
                showPopperArrow={false}
                todayButton="Today"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                closeOnScroll={true}
                dateFormat="yyyy/MM/dd"
                customInput={<DateCustomInput />}
            />
        </div>
        </>
    )
}

const DatepickerPage = () => {
    const [startDate, setStartDate] = useState(null);
    const formatDate = (date)=> {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
            return yyyy + '-' + mm + '-' +dd ;
    }

    const handleDateChange = (originDate) => {
        console.log('change date',originDate,formatDate(originDate))
        setStartDate(originDate)
    }
   
    return (
        <CustomDatePicker
        minDate={new Date('2022-09-15')}
        maxDate={new Date('2022-09-29')}
        disabled={false}
        onChange={handleDateChange}
        style={{ height: 50 }}
        selected={startDate}
        ></CustomDatePicker>
    )
}

export default DatepickerPage;