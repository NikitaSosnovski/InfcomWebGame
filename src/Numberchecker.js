import React, { useState, useRef } from 'react'
import { Group, Text, Rect } from 'react-konva'
import useImage from './useImage'
import Button from './Button'
import CoinCounter from './CoinCounter'
import { addCoins } from './CoinCounter'

const i = 32
let numbersLeft = 3
let nextNumber = true
let decimal_number
let binary_number

function getNumber(){
    numbersLeft-=1
    decimal_number = Math.floor(Math.random() * i)
    binary_number = Number(decimal_number).toString(2).padStart(5, '0')
    nextNumber = false
}


const Numberchecker = ({ x, y }) => {
  const { image: CheckButton} = useImage('check_button.png')

  if(nextNumber){
    getNumber()
  }

  const [textValues, setTextValues] = useState(['0', '0', '0', '0', '0'])

  const handleTextClick = (index) => {
    setTextValues((prevValues) =>
      prevValues.map((val, i) => (i === index ? (val === '0' ? '1' : '0') : val))
    )
  }

  const handleGetTextValues = () => {
    if (binary_number == textValues.join('')){
        nextNumber = true
        addCoins()
    }
  }

  return (
    <Group>
      <Button 
        x={1536/2-50}
        y={670} 
        width={100} 
        height={60}
        image={CheckButton}
        onClick={handleGetTextValues}
      />
      <Rect
        x={1536/2 - 100} 
        y={y} 
        width={200}
        height={150}
        stroke={'grey'}
        fill='transparent'
      />
      <Text 
        x={1536/2 - 100} 
        y={y} 
        width={200}
        height={150}
        text={decimal_number} 
        fontSize={100} 
        fill="red"
        align="center"
        verticalAlign="middle"
        fontFamily='pixelFont'
      />

      {[...Array(5)].map((_, index) => (
        <React.Fragment key={index}>
          <Rect x={x - 75 + index * 50} y={y + 200} width={50} height={50} fill="white" stroke="grey" />
          <Text
            x={x - 75 + index * 50}
            y={y + 200}
            width={50}
            height={50}
            fontSize={32}
            fontFamily='pixelFont'
            align="center"
            verticalAlign="middle"
            text={textValues[index]}
            fill="black"
            onClick={() => handleTextClick(index)}
          />
        </React.Fragment>
      ))}
    </Group>
  );
};

export default Numberchecker
export {numbersLeft}