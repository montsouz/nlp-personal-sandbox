import React, {useState,useEffect} from 'react';
import './App.css';
import TextArea from './Components/Text/TextArea'
import SubmitBtn from './Components/Buttons/SubmitBtn';
import axios from './axios'
import enc from './lib/encoder'
import Keyword from './Components/Keyword/Keyword';


function App() {

    const [text, setText] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [keyContainer,setKeyContainer] = useState();
    const [gender,setGender] = useState();
    const [spam, setSpam] = useState();

    const keywordExtractions = (req) => {
        axios.post("KeywordExtraction.json", enc(req)).then(res => {
            setKeywords(Object.keys(res.data.output.result[1]).map(word => {
                return <Keyword key={word} keyword={word}/>
            }));
        }).catch(err => {
            console.log(err)
        })
    };

    const genderDetectionHandler = (req) => {
        axios.post("GenderDetection.json", enc(req)).then(res => {
            let ress = JSON.parse(JSON.stringify(res));
            setGender(ress.data.output.result)
        }).catch(err => {
            console.log(err)
        })
    };

    const spamDetectionHandler = (req) => {
        axios.post("SpamDetection.json", enc(req)).then(res => {
            let ress = JSON.parse(JSON.stringify(res));
            setSpam(ress.data.output.result)
        }).catch(err => {
            console.log(err)
        })
    };

    const checkTextHandler = () => {

        let req = {
            api_key: "dc47a8b180e720bb5793deb980255ad9",
            text: text
        };
        let reqNum = {...req};
        reqNum.n = 2;

        Promise.all([
            genderDetectionHandler(req),
            keywordExtractions(reqNum),
            spamDetectionHandler(req)
        ]).then(res => {
          //nothing
        })
    };

    useEffect(() => {
        if (keywords.length > 0) {
            setKeyContainer(
                <div style={{textAlign: "left",overflowWrap: 'break-word'}}>
                    <h4>Your keywords : </h4>
                    {keywords}
                    <h4>Gender : </h4>
                    <Keyword keyword={gender}/>
                    <h4>Is Spam : </h4>
                    <Keyword keyword={spam}/>
                </div>
            )
        }
    },[keywords,gender,spam]);


    return (
        <div className="App">
            <h3>Natural language processing test</h3>
            <div className={"minContent"}>
                <p>This is a tiny small project to test natural language processing.
                    I'm currently using the Datum Box Api for this.Please, use only text queries :).</p>
                <TextArea text={setText}/>
                <div style={{textAlign: "right"}}>
                    <SubmitBtn submit={checkTextHandler} text={'Check'}/>
                </div>
                {keyContainer}
            </div>
        </div>
    );
}

export default App;
