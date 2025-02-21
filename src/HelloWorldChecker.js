import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, TextPath } from 'react-konva'
import useImage from './useImage'
import Colorguesser from './Colorguesser'
import Numberchecker from './Numberchecker'
import TecherJoker from './TeacherJoker'
import Button from './Button'
import CoinCounter from './CoinCounter'
import { addCoins } from './CoinCounter'
import { numbersLeft } from './Numberchecker'
import { resetTipp } from './TeacherJoker'

const tasks = ['programming', 'colors', 'numbers']
let currentTask = 0
let task = tasks[currentTask]
const nextTask = () => {
  resetTipp()
  if(currentTask != tasks.length-1){
    currentTask++
  }
  task = tasks[currentTask]
}
let taskText = 'Du musst hier das bekannteste Programm schreiben, welches "Hello, World!" in der Konsole herausgeben wird.'
let tippText = 'Probiere mit  dem Befehl: console.log()'
let taskText_colors = 'Du musst hier die Farbe, welche mit HEX angegeben ist, richtig erraten.'
let tippText_colors = 'Beim HEX(16 Ziffern System) ist es wie beim RGB erste zwei ziffern(minimal 0, maximal f) stehen rür Menge an Rot, nächste zwei für Grün und die letzten zwei für Blau'
let taskText_binary = 'Du musst hier die gegebene Zahl in das Binärsystem umrechnem.'
let tippText_binary = 'erste Ziffer ^kann 2^0 oder 2^1 sein, zweite 4^0 oder 4^1 usw. die Endzahl bekommst du wenn du alle addierst'

const HelloWorldChecker = ({ isActive, onClose }) => {
  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  
  const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 })

  useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        
        const scaleX = width / 1536
        const scaleY = height / 776

        const textArea = textAreaRef.current

        setStageSize({ width, height })
        setScale({ scaleX, scaleY })
        if (textAreaRef.current) {
          textAreaRef.current.style.transform = `scale(${scaleX}, ${scaleY})`
          textAreaRef.current.style.transformOrigin = "top left"

          textAreaRef.current.style.left = `${250 * scaleX}px` 
          textAreaRef.current.style.top = `${90 * scaleY}px` 
        }
      }

      window.addEventListener('resize', handleResize)
      handleResize()

      return () => {
        window.removeEventListener('resize', handleResize)
      }
  }, [])

  const [userCode, setUserCode] = useState('')
  const [result, setResult] = useState('')
  const [message, setMessage] = useState('')
  const textAreaRef = useRef(null)
  const { image: CompImage} = useImage('comp.png')
  const { image: CheckButton} = useImage('check_button.png')
  const { image: NextButton} = useImage('next_button.png')
  const { image: BackButton} = useImage('back_button.png')
  const { image: RoomImage} = useImage('office.png')

  if(numbersLeft < 0){
    onClose()
  }


  useEffect(() => {
    if (!isActive) {
      setUserCode('')
      setResult('')
      setMessage('')
    }
  }, [isActive])

  const handleRunCode = () => {
    try {
      const userFunction = new Function(userCode)

      const consoleOutput = []
      console.log = (...args) => {
        consoleOutput.push(args.join(' '))
      }

      userFunction()


      const output = consoleOutput.join('\n')
      setResult(output)

      if (output.includes('Hello, World!')) {
        setMessage('Toll du hast es geschafft!')
        nextTask()
        addCoins()
      } else {
        setMessage('Error: probier noch ein Mal, es muss "Hello, World!" herauskommen.')
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
      setResult('Error')
    }
  }

  const prevTask = () =>{
    resetTipp()
    if(currentTask > 0){
      currentTask -= 1
    }
    task = tasks[currentTask]
  }

  if(task === 'programming'){
    return (
      <div >
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <KonvaImage
              x={0}
              y={0}
              width={1536}
              height={776}
              image={RoomImage}
            />
            <KonvaImage
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight}
              image={CompImage}
            />
          </Layer>
          <Layer scaleX={scale.scaleX} scaleY={scale.scaleY}>
            <Rect
              x={235}
              y={39.5}
              width={1066}
              height={400}
              fill='black'
            />
            <CoinCounter x={1536/2 - 150} y={400} width={300} height={50}/>
            <Text 
              x={250} 
              y={50}
              width={1036}
              height={40} 
              text="JavaScript Hello World Checker" 
              fontSize={24} 
              fontStyle="bold"
              fill='white' 
              align="center"
              verticalAlign="top"
              fontFamily='pixelFont'
            />
            <Button 
              x={1536/2-50}
              y={670} 
              width={100} 
              height={60}
              image={CheckButton}
              onClick={handleRunCode}
            />
            <Button 
              x={1536/2-200} 
              y={670} 
              width={100} 
              height={60} 
              image={NextButton} 
              onClick={nextTask} 
            />
            <Button 
              x={1536/2+100} 
              y={670} 
              width={100} 
              height={60} 
              image={BackButton} 
              onClick={onClose} 
            />
            <Rect 
              x={250} 
              y={90}
              width={1036}
              height={200}
              fill='transparent'
              stroke={'grey'}
            />
            <Rect 
              x={250} 
              y={300}
              width={1036}
              height={30}
              fill='white'
              stroke={'grey'}
            />
            <Rect 
              x={250} 
              y={340}
              width={1036}
              height={30}
              fill='white'
              stroke={'grey'}
            />
            <Text 
              x={280} 
              y={300} 
              height={30}
              text={`Result: ${result}`} 
              fontSize={16} 
              fill='green'
              verticalAlign="middle"
              fontFamily='pixelFont'
            />
            <Text 
              x={280} 
              y={340} 
              height={30}
              text={message} 
              fontSize={16} 
              fill="red" 
              verticalAlign="middle"
              fontFamily='pixelFont'
            />
            <TecherJoker text={taskText} tipp={tippText} />
          </Layer>
        </Stage>

        <textarea
          ref={textAreaRef}
          style={{
            position: "absolute",
            top: "90px",
            left: "250px",
            width: "1036px",
            height: "200px",
            fontSize: "16px",
            outline: "none",
            resize: "none"
          }}
          placeholder="Write your JavaScript code here..."
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        />
      </div>
    )
  }
  else if(task === 'colors'){
    return(
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <KonvaImage
            x={0}
            y={0}
            width={1536}
            height={776}
            image={RoomImage}
          />
          <KonvaImage
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            image={CompImage}
            fill='transparent'
          />
        </Layer>
        <Layer scaleX={scale.scaleX} scaleY={scale.scaleY}>
            <Rect
              x={235}
              y={39.5}
              width={1536-235*2}
              height={400}
              fill='black'
            />
            <CoinCounter x={1536/2 - 150} y={400} width={300} height={50}/>
            <Colorguesser x={1536/2-50} y={100} width={100} height={100} />
            <TecherJoker text={taskText_colors} tipp={tippText_colors} />
            <Button 
              x={1536/2-50}
              y={670} 
              width={100} 
              height={60}
              image={CheckButton}
            />
            <Button 
              x={1536/2-200} 
              y={670} 
              width={100} 
              height={60} 
              image={NextButton} 
              onClick={nextTask} 
            />
            <Button 
              x={1536/2+100} 
              y={670} 
              width={100} 
              height={60} 
              image={BackButton} 
              onClick={prevTask} 
            />
        </Layer>
      </Stage>
    )
  }
  else if(task === 'numbers'){
    return(
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <KonvaImage
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            image={CompImage}
          />
        </Layer>
        <Layer scaleX={scale.scaleX} scaleY={scale.scaleY}>
            <Rect
              x={235}
              y={39.5}
              width={1066}
              height={400}
              fill='black'
            />
            <Numberchecker x={1536/2-50} y={100} />
            <CoinCounter x={1536/2 - 150} y={400} width={300} height={50}/>
            <TecherJoker text={taskText_binary} tipp={tippText_binary} />
            <Button 
              x={1536/2-200} 
              y={670} 
              width={100} 
              height={60} 
              image={NextButton} 
              onClick={nextTask} 
            />
            <Button 
              x={1536/2+100} 
              y={670} 
              width={100} 
              height={60} 
              image={BackButton} 
              onClick={prevTask} 
            />
        </Layer>
      </Stage>
    )
  }
}

export default HelloWorldChecker
export {nextTask}