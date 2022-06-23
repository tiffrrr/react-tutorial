import React, { useState, useEffect, useRef } from 'react';

// redux
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import RcCollapse from 'rc-collapse';
import './collapse.scss';
import 'rc-collapse/assets/index.css';
const collapseIndexArr = [];

// document.querySelectorAll('.rc-collapse-header').forEach((item, key) => {
//     collapseIndexArr.push(item.offsetTop)
// })
// console.log(collapseIndexArr)


const DemoBlock = () => {
    return (
        <div style={{ 'height': 300 }}>
            this is panel content this is panel content this is panel content
        </div>
    )
}
const Collapse = () => {
    function collapseScroll(key) {
        // const activeItem = document.querySelector('.rc-collapse-item-active')
        const firstItem = document.querySelectorAll('.rc-collapse-header')[0]
        const activeItem = document.querySelectorAll('.rc-collapse-header')[key]
        if (activeItem) {
            console.log(firstItem.offsetTop + firstItem.offsetHeight * key)
            window.scrollTo(0, Number(firstItem.offsetTop + firstItem.offsetHeight * key))
        }
    }
    return (
        <div className='collapse-component'>
            <div>頁面會scroll到滾動到打開的那一項標題的位置</div>
            <DemoBlock />
            <DemoBlock />
            <RcCollapse accordion={true} onChange={collapseScroll} defaultActiveKey={0}>
                <RcCollapse.Panel header="title1" ><DemoBlock /></RcCollapse.Panel>
                <RcCollapse.Panel header="title2"><DemoBlock /></RcCollapse.Panel>
                <RcCollapse.Panel header="title3" ><DemoBlock /></RcCollapse.Panel>
                <RcCollapse.Panel header="title4"><DemoBlock /></RcCollapse.Panel>
                <RcCollapse.Panel header="title5" ><DemoBlock /></RcCollapse.Panel>
                <RcCollapse.Panel header="title6"><DemoBlock /></RcCollapse.Panel>
            </RcCollapse>
            <DemoBlock />
            <DemoBlock />
        </div>
    )
}

export default Collapse;