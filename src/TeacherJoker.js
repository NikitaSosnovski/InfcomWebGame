import React, { useState, useRef, useEffect } from 'react'
import { Layer, Group, Text, Rect, Image as KonvaImage } from 'react-konva'
import useImage from './useImage'
import TeacherJokerText from './TeacherJokerText'
import Button from './Button'

let show = true
let full_text 
let needTipp = false
let text_height = 100

function resetTipp(){
  needTipp = false
}

const TecherJoker = ({ text, tipp }) => {
    if(needTipp){
        full_text = full_text = text + '\n' + tipp
    }
    else{
        full_text = text
    }

    const { image: JokerImage} = useImage('joker.png')
    const { image: TippImage} = useImage('tipp.png')
    const { image: BackButton} = useImage('back_button.png')
    const { image: TeacherButton} = useImage('teacher_button.png')

    const giveTipp = () => {
      needTipp = true
      text_height = 200
    }
    const closeTeacher = () => {
      show = false
    }
    const openTeacher = () => {
      show = true
    }

    if(show){
      return (
        <Group>
          <KonvaImage
            x={1300} 
            y={600} 
            width={236} 
            height={176} 
            image={JokerImage}
          />
          <TeacherJokerText x={755} y={630-text_height} width={600} height={text_height} text={full_text} dir={'right'} />
          <KonvaImage 
            x={1300} 
            y={590} 
            width={30} 
            height={30} 
            image={TippImage}
            onClick={giveTipp} 
          />
          <Button
            x={790} 
            y={590}
            width={50}
            height={30}
            image={BackButton}
            onClick={closeTeacher}
          />
        </Group>
    )
  }
  else{
    return(
      <>
        <Button  
          x={1536-150} 
          y={776-110}
          width={100}
          height={60}
          image={TeacherButton}
          onClick={openTeacher}
        />
      </>
    )
  }
}

export default TecherJoker
export {resetTipp}