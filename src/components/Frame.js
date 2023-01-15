import { Display } from "./Display"
import { Backspace, Resolve } from "./Buttons"
import React, {useState} from "react";
import { deleteLeft, displayFunc, calculateFunc} from "./utils";


const Frame = ({advanced}) => {
    const [displayText, alterDisplay] = useState([])
    let operatorsArr
    if (!advanced) {
        operatorsArr = ['(', ')', 'mod', 'pi', '7', '8', '9', '/', '√(', '4', '5', '6', '*', '^2', '1', '2', '3', '-', '0', '.', '%', '+']
    } else {
        operatorsArr = ['(', ')', 'mod', 'pi', '7', '8', '9', '/', '√(', '4', '5', '6', '*', '^2', '1', '2', '3', '-', '0', '.', '%', '+', 'cos(', 'sin(', 'tan(', 'cosh(', 'sinh(', 'tanh(', 'log(', 'ln(', '^', 'e']
    }
    const resolveRef = React.useRef(null)

    React.useEffect(() => {
        window.addEventListener('keydown', function (e) {
            e.preventDefault()
            console.log(e.key)
            if (operatorsArr.includes(e.key) || e.key === '^') {
                displayFunc(e.key, alterDisplay)
            } else if (e.key === '=' || e.key === 'Enter') {
                e.preventDefault()
                // using references
                const resolve = resolveRef.current
                resolve.click();
                // normally
                calculateFunc(alterDisplay)
            } else if (e.key === 'Backspace') {
                deleteLeft(alterDisplay)
            }
        })    
    }, [])

    return <div className="grid">
        <Display displayText={displayText}/>
        <Backspace display={alterDisplay}/>
        {operatorsArr.map((operator) => {
            return (<button key={operator} 
                onClick={() => {
                displayFunc(operator, alterDisplay)
                }}
            >{operator}</button>)
        })}
        <Resolve innerRef={resolveRef} calculate={alterDisplay}/>
    </div>
}

export default Frame