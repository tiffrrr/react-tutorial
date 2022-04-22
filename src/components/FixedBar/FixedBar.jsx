import  React,{useState,useEffect,useRef} from 'react';

// redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import style from './fixedbar.module.css';


const Page = () => {

    // demo: redux state and dispatch
    const info = useSelector(state => {
        console.log('redux state',state)
        return state.infoReducer.info;
    });
    const dispatch = useDispatch();


    // // state
    const [isButtonBarFixed,setButtonBarFixed] = useState(true);
    const [buttonBarHeight,setButtonBarHeight] = useState(0);
    const barRef = useRef(null);
    const footerRef = useRef(null);
    const buttonBarHeightRef = useRef(buttonBarHeight)
    
    function toggleFix(){
        let windowHeight = window.innerHeight;
        var footerOffsetTop = footerRef.current.getBoundingClientRect().top;
        // console.log(footerOffsetTop > windowHeight && !buttonBarHeightRef.current)
        // footerOffsetTop > windowHeight ? setButtonBarFixed(true):setButtonBarFixed(false);

        // fix
        if(footerOffsetTop > windowHeight && !buttonBarHeightRef.current) {
            setButtonBarFixed(true)
            buttonBarHeightRef.current = true;
            dispatch({
                type: "CHANGE",
                payload: 'fix',
            })
            console.log('Fix')
        }
        // no fix 
        if(footerOffsetTop <= windowHeight && buttonBarHeightRef.current){
            setButtonBarFixed(false);
            buttonBarHeightRef.current = false;
            dispatch({
                type: "CHANGE",
                payload: 'no fix',
            })
            console.log('set noFix')
        }
    }
    function resize(){
        setButtonBarHeight(barRef.current.offsetHeight);
        toggleFix();
    }
    useEffect(() => {
        let barHeight = barRef.current.offsetHeight;
        setButtonBarHeight(barHeight);
        toggleFix();
        window.addEventListener('resize', resize);
        window.addEventListener('scroll', toggleFix);
        return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', toggleFix);
        };
    }, []);

    return(
        <>
            <div className={style['block']}>1</div>
            <div className={style['block']}>1</div>
            <div className={style['block']}>{info}</div>
            <div style={{height:buttonBarHeight|| 0 }}>
                <div ref={barRef} className={`${style['bar']} ${style[isButtonBarFixed?'is-fixed':'']}`}>bar</div>

            </div>
            <footer ref={footerRef}>footer</footer>
        </>
    )
}
export default Page;