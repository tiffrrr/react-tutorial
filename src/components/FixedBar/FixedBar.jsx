import React, { useState, useEffect, useRef } from 'react';

// redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import style from './fixedbar.module.css';


const Page = () => {

    // demo: redux state and dispatch
    const info = useSelector(state => {
        // console.log('redux state', state)
        return state.infoReducer.info;
    });
    const dispatch = useDispatch();


    // // state
    const [isButtonBarFixed, setButtonBarFixed] = useState(true);
    const [buttonBarHeight, setButtonBarHeight] = useState(0);
    const barRef = useRef(null);
    const footerRef = useRef(null);
    const buttonBarHeightRef = useRef(buttonBarHeight)

    function toggleFix() {
        let windowHeight = window.innerHeight;
        // console.log('scroll footerRef', window.scrollY, footerRef)
        // 實測隨機出現的bug: router切換component時，會觸發scroll事件，但DOM已卸載，抓不到footerRef，就會error，然後才remove scroll事件
        var footerOffsetTop = footerRef.current ? footerRef.current.getBoundingClientRect().top : 0;
        // console.log(footerOffsetTop > windowHeight && !buttonBarHeightRef.current)
        // footerOffsetTop > windowHeight ? setButtonBarFixed(true):setButtonBarFixed(false);

        // fix
        if (footerOffsetTop > windowHeight && !buttonBarHeightRef.current) {
            setButtonBarFixed(true)
            buttonBarHeightRef.current = true;
            dispatch({
                type: "CHANGE",
                payload: 'fix',
            })
            // console.log('Fix')
        }
        // no fix 
        if (footerOffsetTop <= windowHeight && buttonBarHeightRef.current) {
            setButtonBarFixed(false);
            buttonBarHeightRef.current = false;
            dispatch({
                type: "CHANGE",
                payload: 'no fix',
            })
            // console.log('set noFix')
        }
    }
    function resize() {
        console.log('resize')
        setButtonBarHeight(barRef.current.offsetHeight);
        toggleFix();
    }
    useEffect(() => {
        let barHeight = barRef.current.offsetHeight;
        setButtonBarHeight(barHeight);
        document.addEventListener('resize', resize);
        document.addEventListener('scroll', toggleFix);
        return () => {
            document.removeEventListener('resize', resize);
            document.removeEventListener('scroll', toggleFix);
            // console.log('fixedbar remove')
        };
    }, []);

    return (
        <>
            <div className={style['block']}>1</div>
            <div className={style['block']}>1</div>
            <div className={style['block']}>{info}</div>
            <div style={{ height: buttonBarHeight || 0 }}>
                <div ref={barRef} className={`${style['bar']} ${style[isButtonBarFixed ? 'is-fixed' : '']}`}>bar</div>

            </div>
            <footer ref={footerRef}>footer</footer>
        </>
    )
}
export default Page;