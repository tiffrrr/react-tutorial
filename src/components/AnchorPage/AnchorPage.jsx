import  React,{useState,useEffect,useRef} from 'react';

// redux
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';

import Anchor from './component/Anchor';
import Block from './component/Block';
import Header  from './component/Header';
import './anchorPage.scss';
const Test = () => {
    return(
        <Anchor></Anchor>

    )
}

const AnchorPage = () => {

    return(
        <div className='anchor-page'>
            <Header></Header>
            <Block></Block>
            <Test></Test>
            <Block></Block>
            <Block></Block>
            <Block></Block>
            <Block></Block>
            <Block></Block>
        </div>
    )
}

export default AnchorPage;