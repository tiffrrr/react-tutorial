import React, { useState, useEffect, useRef } from 'react';
const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [bodyWidth, setBodyWidth] = useState(document.body.clientWidth)
    useEffect(() => {
        console.log('use effect isOpen', isOpen)
        if (isOpen) {
            const bodyScrollBarWidth = window.innerWidth - bodyWidth;
            console.log('open', bodyScrollBarWidth)
            // if (bodyScrollBarWidth > 0) {
            document.body.style.paddingRight = bodyScrollBarWidth + 'px';
            // }
        } else {
            document.body.style.paddingRight = '';

            console.log('close')
        }
    }, [isOpen])
    const toggleModal = () => {
        setIsOpen(true);
    }
    return (
        <div>
            <div onClick={toggleModal}>click open</div>
            <div onClick={() => { setIsOpen(false) }}>click close</div>
            {
                isOpen == true &&
                (<div style={{ 'width': '100px', 'height': '100px', 'backgroundColor': '#ccc' }}>modal</div>)

            }
        </div>
    )
}
export default Modal;
