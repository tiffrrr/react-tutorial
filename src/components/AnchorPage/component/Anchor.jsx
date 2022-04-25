import  React,{useState,useEffect,useRef} from 'react';

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
    useEffect(() => {
        document.addEventListener('scroll', () => {
            let anchorScrollTop = anchorRef.current.getBoundingClientRect().top;
            if(anchorScrollTop <= 0 ){
                dispatch({
                    type: "TOGGLE_ANCHOR_FIXED",
                    payload: true,
                })
                // setAnchorFixed(true)
            }else{
                dispatch({
                    type: "TOGGLE_ANCHOR_FIXED",
                    payload: false,
                })
                // setAnchorFixed(false)
            }
            });
        }, []);
    return(
        <div className = 'fake-anchor' ref={anchorRef}>
            <div className={`${anchorFixed ? 'is-fixed' : ''}`} onClick={onClick}>
                <div className="anchor"  >
                    <div>anchor</div>
                </div>
            </div>
        </div>
    )
}

export default Anchor;