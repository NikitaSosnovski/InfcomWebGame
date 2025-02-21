import React, { useState } from 'react';
import './flexbox.css';

const justifyOptions = ["center", "flex-start", "flex-end", "space-evenly"]
const alignOptions = ["center", "flex-start", "flex-end", "stretch"]
let currentAlign
let currentJustify

const WebStyler = ({ x, y, width, height }) => {

    const [chosenJustifyContent, setChosenJustifyContent] = useState("center")
    const [chosenAlignItems, setChosenAlignItems] = useState("center")

    const setAlign = (e) => {
        currentAlign = e.target.value
        setChosenAlignItems(currentAlign)
        console.log(currentAlign)
    }
    const setJustify = (e) => {
        currentJustify = e.target.value
        setChosenJustifyContent(currentJustify)
        console.log(currentJustify)
    }

    return (
        <div 
            style={{ 
                position: 'absolute', 
                left: x-width/2, 
                top: y-height/2,
                width: width,
                height: height,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center' ,
                fontFamily: 'pixelFont'
                }}
        >


            <div className="control-container">
                <div className="dropdown-container">
                    <label htmlFor="justifyContent">Justify Content:</label>
                    <select id="justifyContent" value={chosenJustifyContent} onChange={(e) => setJustify(e)}>
                        {justifyOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="dropdown-container">
                    <label htmlFor="alignItems">Align Items:</label>
                    <select id="alignItems" value={chosenAlignItems} onChange={(e) => setAlign(e)}>
                        {alignOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="flexcontainer" style={{ 
                justifyContent: chosenJustifyContent, 
                alignItems: chosenAlignItems 
            }}>
                <div className="flexbox"></div>
                <div className="flexbox"></div>
                <div className="flexbox"></div>
                <div className="flexbox"></div>
            </div>


        </div>
    )
}
export default WebStyler
export {currentAlign}
export {currentJustify}