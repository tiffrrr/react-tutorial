import React, { useState, useEffect, useRef } from 'react';

// redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


// menuOpen

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
    const [headerFixed, setHeaderFixed] = useState(false);
    const isAnchorFixed = useSelector(state => {
        return state.anchorReducer.isAnchorFixed
    })
    function toggleHeaderFix() {
        let scrollTop = window.pageYOffset
            || document.documentElement.scrollTop
            || document.body.scrollTop;

        if (scrollTop > 0) {
            if (!headerFixed) {
                setHeaderFixed(true);
            }
        } else {
            if (!headerFixed) {
                setHeaderFixed(false);
            }
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', toggleHeaderFix);
        return () => {
            document.removeEventListener('scroll', toggleHeaderFix);
        };
    }, []);
    return (
        <>
            <div className='fake-header'>
                <div className={`${headerFixed ? 'is-fixed' : ''} ${isAnchorFixed ? 'is-hide' : ''}`}>
                    <header>
                        <div className="logo">logo</div>
                        <div className="menu-icon" onClick={toggleMenu}>三</div>
                        {
                            menuOpen ?
                                (<div className="header-menu">
                                    <div className="menu-icon" onClick={toggleMenu}>三</div>
                                    content
                                    content
                                </div>)
                                : null
                        }
                    </header>

                </div>
            </div>
        </>
    )
}

export default Header;