import  React,{useState,useMemo,useEffect,useRef} from 'react';

import style from './fixedbar.module.css';


const Page = () => {

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
            console.log('Fix')
        }
        // no fix 
        if(footerOffsetTop <= windowHeight && buttonBarHeightRef.current){
            console.log('set noFix')
            setButtonBarFixed(false);
            buttonBarHeightRef.current = false;

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
            <div className={style['block']}>1</div>
            <div style={{height:buttonBarHeight|| 0 }}>
                <div ref={barRef} className={`${style['bar']} ${style[isButtonBarFixed?'is-fixed':'']}`}>bar</div>

            </div>
            <footer ref={footerRef}>footer</footer>
        </>
    )
}
export default Page;