import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Drawer } from 'antd';
import './calendar.scss';
import moment from 'moment';
import calendarPageData from './data.js'

const CalendarPage = () => {
    const [chosenDateInfo, setChosenDateInfo] = useState({ type: 'init' });
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [calendarPaddingBottom, setCalendarPaddingBottom] = useState(0);
    const showDrawer = () => {
        setDrawerVisible(true);
        setCalendarPaddingBottom(378);

    };
    const closeDrawer = () => {
        setDrawerVisible(false);
        setCalendarPaddingBottom(0);
    };
    const onSelect = (newValue) => {
        setChosenDateInfo(calendarPageData[newValue.format('YYYY-MM-DD')] || {})
        showDrawer();
    };

    return (
        <div className="component-calendarPage">
            <Calendar onSelect={onSelect} style={{ 'padding-bottom': calendarPaddingBottom }}></Calendar>
            <Drawer
                title="Basic Drawer"
                placement={'bottom'}
                closable={true}
                onClose={closeDrawer}
                visible={drawerVisible}
                key={'bottom'}
                mask={false}
            >
                <div>{chosenDateInfo.type || 'none'}</div>

            </Drawer>
        </div>
    )
}

export default CalendarPage;