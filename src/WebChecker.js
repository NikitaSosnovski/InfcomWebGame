import React, { useState, useEffect, useRef } from 'react'
import { Stage, Layer, Rect, Text, Image as KonvaImage, TextPath } from 'react-konva'
import useImage from './useImage'
import TecherJoker from './TeacherJoker'
import Button from './Button'
import WebStyler from './WebStyler'
import { currentAlign } from './WebStyler'
import { currentJustify } from './WebStyler'
let anwserNum = Math.floor(Math.random()*4)
const justifyOptions = ["center", "flex-start", "flex-end", "space-evenly"]
const alignOptions = ["center", "flex-start", "flex-end", "stretch"]
const justifyText = ["im Zenter", "am Anfang", "am Ende", "mit gleichem Abstand zueinander"]
const alignText = ["im Zenter", "am Anfang", "am Ende", "gestreckt"]
let anwserAlign = alignOptions[anwserNum]
let anwserJustify = justifyOptions[anwserNum]
let taskText = 'Du musst die orangen Quadrate so anordnen, dass sie  ' + justifyText[anwserNum] + ' zugerichtet werden mit Textausrichtung ' + alignText[anwserNum]
let tippText = 'anordnen ist justifyContent und Ausrichtung ist alignItems'
const WebCHecker = ({isActive, onClose}) => {
    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
      })
      
    const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 })
    
    
    useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
          
          const scaleX = width / 1536;
          const scaleY = height / 776;
    
          setStageSize({ width, height });
          setScale({ scaleX, scaleY });
        }
    
        window.addEventListener('resize', handleResize)
        handleResize()
    
        return () => {
          window.removeEventListener('resize', handleResize)
        }
    }, [])
    const { image: CheckButton} = useImage('check_button.png')
    const { image: NextButton} = useImage('next_button.png')
    const { image: BackButton} = useImage('back_button.png')
    const { image: ScreenImage} = useImage('screen.png')

    const checkAnwser = () => {
        if(currentAlign === anwserAlign && currentJustify === anwserJustify){
            console.log(true)
            onClose()
        }
    }

    return(
        <>
            <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <KonvaImage
                    x={0}
                    y={0}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    image={ScreenImage} 
                />
            </Layer>
            </Stage>
            <WebStyler x={window.innerWidth/2} y={window.innerHeight/2} width={600*scale.scaleX} height={300*scale.scaleY} />
            <Stage width={window.innerWidth} height={window.innerHeight}
                    style={{
                    position: 'fixed',
                    top: 0,
                    left: 0
                }}
            >
                <Layer scaleX={scale.scaleX} scaleY={scale.scaleY}>
                    <TecherJoker text={taskText} tipp={tippText} />
                    <Button
                        x={65}
                        y={50}
                        width={100}
                        height={60}
                        image={CheckButton}
                        onClick={checkAnwser} 
                    />
                    <Button
                        x={1370}
                        y={50}
                        width={100}
                        height={60}
                        image={BackButton}
                        onClick={onClose} 
                    />
                </Layer>

            </Stage>
        </>
    )

}
export default WebCHecker