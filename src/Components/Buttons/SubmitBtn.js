import React  from 'react'
import './SubmitBtn.css';

const SubmitBtn = (props) => {

    return (
        <button onClick={ () => props.submit()} className={'SubmitBtn'}>{props.text}</button>
    );

};

export default SubmitBtn;