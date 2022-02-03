import React, { useEffect, useState } from 'react';
import './style.css';

/**
* @author
* @function reflexCalculator
**/

const initialBgColor = 'red';
const initialButtonClass = {
    ButtonSet1 : 'inputContainer',
    ButtonSet2 : 'noneDisplay'
};
export const ReflexCalculator = () => {
    let elasped = '';
    const [buttonClass,setButtonClass] = useState(initialButtonClass);
    const [bgColor,setBgColor] = useState(initialBgColor);
    const [start, setStart] = useState('');
    const [TestStarted, setTestStarted] = useState(false);
    const [data, setData] = useState([]);
    const [numberOfTest, setNumberOfTest] = useState('');

    const dataEnter = () => {
        setNumberOfTest(num => num + 1);
        setData(e => [
            ...e,
            {
                testNumber: numberOfTest + 1,
                testData: elasped
            }
        ]);
    }
    const stop = () => {
        if (start != '') {
            elasped = ((Date.now() - start));
            setBgColor(initialBgColor);
            dataEnter();
            setStart('');
            setTestStarted(false);
            if(numberOfTest>=5){
                setButtonClass( ()=> ({ButtonSet1 : 'noneDisplay',ButtonSet2 : 'inputContainer'}) ) 
            }
            // setStart('');
        }
    }
    const tick = () => {
        setBgColor('green')
        setStart(Date.now());
        console.log('start ');
    }
    const startTest = () => {
        if(!TestStarted){
            setTestStarted(true);
            setBgColor('yellow');
            var afterTime = (Math.ceil(Math.random() * 7000) + 2000);
            setTimeout(tick, afterTime);
        }
    }

    const restart = () => {
        setData([]);
        setStart('');
        elasped = '';
        setTestStarted(false);
        setNumberOfTest(0);
        setBgColor(initialBgColor);
        setButtonClass(initialButtonClass);
    }

    useEffect(() => {
        setNumberOfTest(0);
    }, [])

    // useEffect(() => {
    //     if (TestStarted) {
    //         setBgColor('yellow');
    //         startTest();
    //     }
    //     else {
    //         stop();
    //     }
    // }, [TestStarted])



    return (
        <div>
            <h2>Reflex Calculator</h2>
            <div className='container' style={{backgroundColor: bgColor}}>
                <div className='tableContainer'>
                    <div className='tableHeader'>
                        <div>Number of Tests</div>
                        <div>Time Required</div>
                    </div>
                    <div className='dataContainer'>
                        {data.map((test) => (
                            <div key={test.testNumber} className='tableData'>
                                <div>{test.testNumber}</div>
                                <div>{test.testData}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={ buttonClass.ButtonSet1 }>
                    <button onClick={() => { startTest() }}>Click To Start</button>
                    {/* <button onClick={() => { setTestStarted(true) }}>Click To Start</button> */}
                    <button onClick={() => { stop() }}>Click To Stop</button>
                    {/* <button onClick={() => { setTestStarted(false) }}>Click To Stop</button> */}
                    <h2>{numberOfTest}</h2>
                </div>
                <div className={ buttonClass.ButtonSet2 }>
                <button onClick={() => { restart() }}>Click To Restart</button>
                </div>
            </div>
        </div>
    )

}

export default ReflexCalculator;