import React, { useState, useEffect, useRef } from 'react';

// redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const Anchor = () => {
    // const [anchorFixed, setAnchorFixed] = useState(false);
    const anchorRef = useRef(null);

    // demo: redux state and dispatch
    const anchorFixed = useSelector(state => {
        // console.log('redux state',state)
        return state.anchorReducer.isAnchorFixed;
    });
    const dispatch = useDispatch();
    const onClick = () => {
        console.log('anchor on click')
    }
    function toggleAnchorFix() {
        // console.log('scroll anchorRef', window.scrollY, anchorRef.current)
        // 實測隨機出現的bug: router切換component時，會觸發scroll事件，但DOM已卸載，抓不到anchorRef，就會error，才會remove scroll事件
        let anchorScrollTop = anchorRef.current ? anchorRef.current.getBoundingClientRect().top : 0;
        if (anchorScrollTop <= 0) {
            dispatch({
                type: "TOGGLE_ANCHOR_FIXED",
                payload: true,
            })
            // setAnchorFixed(true)
        } else {
            dispatch({
                type: "TOGGLE_ANCHOR_FIXED",
                payload: false,
            })
            // setAnchorFixed(false)
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', toggleAnchorFix);
        // 一定要記得remove!!!
        return () => {
            document.removeEventListener('scroll', toggleAnchorFix);
            // console.log('anchorbar remove')
        };
    }, []);
    return (
        <div className='fake-anchor' ref={anchorRef}>
            <div className={`${anchorFixed ? 'is-fixed' : ''}`} onClick={onClick}>
                <div className="anchor"  >
                    <div>anchor</div>
                </div>
            </div>
        </div>
    )
}

export default Anchor;