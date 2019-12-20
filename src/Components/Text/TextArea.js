import React, {useState,useEffect} from 'react';
import './TextArea.css'

const TextArea = (props) => {

    const [text,setText] = useState('');

    useEffect(() => {
        props.text(text)
    });

    return (
        <textarea className={"TextArea"} onChange={e => setText(e.target.value)}/>
    )
};

export default TextArea;