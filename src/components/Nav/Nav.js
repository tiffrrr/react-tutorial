import React, { useState, useEffect, useRef } from 'react';
import './nav.scss';

const Nav = () => {
    const MenuItemOnMobile = () => {
        const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
        return (
            <>
                <div onClick={() => { setIsSubMenuOpen(!isSubMenuOpen) }}>

                    <div>title</div>
                    <div >{isSubMenuOpen == true ? '^' : 'v'}</div>
                </div>
                {isSubMenuOpen && <div >content</div>}
            </>
        )

    }
    return (
        <div>
            <ul className={`header__content--left`}>
                <li className="cmc-navHeader__item">
                    <a href="/content/cmc/us.html">
                        <div className="cmc-link cmc-link-default cmc-link-large cmc-link__color--black cmc-link__align--left cmc-navHeader__item__content" style={{ display: "inline-block" }}>
                            品牌介紹
                        </div>
                    </a>
                </li>

                <li className="cmc-navHeader__item">
                    <div className="cmc-navHeader__item__content">
                        <span>測試測試</span>
                        <div className="cmc-navHeader__down"></div>
                    </div>
                    <div className="cmc-navHeader__subNav">
                        <div className='cmc-navHeader__subNav__block'>
                            <a href="/signin/login.html">
                                <div className="cmc-link cmc-link-default cmc-link-normal cmc-link__color--black cmc-link__align--left cmc-navHeader__subNav__link" style={{ display: "inline-block" }}>subnav1</div>
                            </a>
                            <a href="/signin/login.html">
                                <div className="cmc-link cmc-link-default cmc-link-normal cmc-link__color--black cmc-link__align--left cmc-navHeader__subNav__link" style={{ display: "inline-block" }}>subnav2</div>
                            </a>
                            <a href="/signin/login.html">
                                <div className="cmc-link cmc-link-default cmc-link-normal cmc-link__color--black cmc-link__align--left cmc-navHeader__subNav__link" style={{ display: "inline-block" }}>subnav2</div>
                            </a>
                        </div>

                    </div>
                </li>
            </ul>
            <div>手機版</div>
            <MenuItemOnMobile></MenuItemOnMobile>
        </div>
    )
}
export default Nav;
