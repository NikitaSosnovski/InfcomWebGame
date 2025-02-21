import React, { useState } from 'react'
import { Group, Text, Image as KonvaImage, Rect } from 'react-konva'
import { addCoins } from './CoinCounter'
import { nextTask } from './HelloWorldChecker'

const colorNames = ['red', 'blue', 'green', 'yellow', 'white', 'black', 'orange', 'azure', 'purple']
const colorsHex = ['#ff0000', '#0000ff', '#00ff00', '#ffff00', '#ffffff', '#000000', '#ff8000', '#00ffc8', '#9600ff']
let availibleColors = colorsHex
let i = 9
let currentColor = Math.floor(Math.random()*i)
let possibleColor = Math.floor(Math.random()*i)
let answerReady = false
let answer1 = availibleColors[currentColor]
let answer2 = availibleColors[possibleColor]

function chooseAnwser(){
    let trueanswer = Math.random()
    if(trueanswer < 0.5){
        answer1 = availibleColors[currentColor]
        answer2 = availibleColors[possibleColor]
    }
    else{
        answer2 = availibleColors[currentColor]
        answer1 = availibleColors[possibleColor]
    }
}

function createAnswer(){
    if(possibleColor == currentColor){
        possibleColor = Math.floor(Math.random()*i)
        
    }
    else{
        answerReady = true
    }
    chooseAnwser()
}

const Colorguesser = ({ x, y, width, height}) => {
    if(!answerReady){
        createAnswer()
    }
    const checkAnswer = (e) => {
        if (i<=2){
            nextTask()
        }
        const clickedText = e.target
        const answerText = clickedText.text()
        if(answerText === availibleColors[currentColor]){
            availibleColors.splice(currentColor, 1)
            console.log(availibleColors)
            i-=1
            currentColor = Math.floor(Math.random()*i)
            possibleColor = Math.floor(Math.random()*i)
            answerReady = false
            console.log(i)
            createAnswer()
            addCoins()
        }
    }

    return (
        <Group>
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={availibleColors[currentColor]}
                stroke={'grey'}
            />
            <Rect
                x={x+width/2-150} 
                y={300}
                width={100}
                height={50}
                stroke={'grey'}
            />
            <Rect
                x={x+width/2+50} 
                y={300}
                width={100}
                height={50}
                stroke={'grey'}
            />
            <Text 
                x={x+width/2-150} 
                y={300}
                width={100}
                height={50} 
                text={answer1} 
                fontSize={16} 
                fill='white' 
                align='center'
                verticalAlign='middle'
                onClick={checkAnswer}
            />
            <Text 
                x={x+width/2+50} 
                y={300}
                width={100}
                height={50} 
                text={answer2} 
                fontSize={16} 
                fill='white'
                align='center' 
                verticalAlign='middle'
                onClick={checkAnswer}
            />
        </Group>
    )
}

export default Colorguesser