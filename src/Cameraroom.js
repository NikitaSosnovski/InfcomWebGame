import React, { useState, useEffect } from 'react';
import { Stage, Layer, Ellipse, Image as KonvaImage, Text, Rect } from 'react-konva'
import useImage from './useImage'
import Person from './Person'
import Camera from './Camera'
import Slider from './Slider'
import { zoomScale } from './Slider'
import { resetZoom } from './Slider'
import Button from './Button'
import TecherJoker from './TeacherJoker'
import CoinCounter from './CoinCounter'
import { addCoins } from './CoinCounter'
import { resetTipp } from './TeacherJoker'

let currentTaskName = 'placement'
let zoom = 0
let yPosition = 0
let xPosition = 0
let scroll = true
let cameraImg = ""
let blink = false
let rotate = true
let anwserPosition = Math.floor(Math.random()*4)
let cameraPosition = 0
let answerNum = 0
const cameraPlaces = ['Master Shot', 'SRS Shema', 'Cut away', 'POV']
let taskText = 'Du musst hier die Camera so plazieren um einen ' + cameraPlaces[anwserPosition] + ' filmen zu können. Die hellen Elipsen zeigen zur Person die dunkelen von der Person.'
let einstellungen = ['Halbtotale', 'Amerikanisch', 'Halbnah', 'Nah', 'Gross']
let tippText = 'Master Shot: Tut das Bild von der Mitte ganz filmen\n SRS Shema: Zeigt die Person unter einem Winkel\n Cut away: Zeigt die sicht der Person unter einem Winkel\n POV: Zeigt das Bild aus der Sicht der Person'
let taskText_zoom = 'Du musst hier die Camera auf die Einstellung ' + einstellungen[answerNum] + ' die Kamera mithilfe vom Slider einstellen.'
let tippText_zoom = 'Der Grösse nach: Halbtotale, Amerikanisch, Halbnah, Nah, Gross'
function change(){
  blink = true
}
let size = [353, 283, 230, 170, 120]
setInterval(change, 1000)

const Cameraroom = ({ isActive, onClose }) => {
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
        const { image: RoomImage} = useImage('office.png')
        const { image: PersonImageActive} = useImage('filmtaskgirl_front_active.png')
        const { image: PersonImagePassive} = useImage('filmtaskgirl_front_passive.png')
        const { image: CameraImage} = useImage('Camera_front.png')
        const { image: CameraImageRight} = useImage('Camera_front_right.png')
        const { image: CameraBack } = useImage('Camera_back.png')
        const { image: CameraBackRight } = useImage('Camera_back_right.png')
        const { image: CameraFokus} = useImage('Camera_fokus.png')
        const { image: CameraRecOff} = useImage('Camera_rec_off.png')
        const { image: CameraRecOn} = useImage('Camera_rec_on.png')
        const { image: CameraRecBlink} = useImage('Camera_rec_blink.png')
        const { image: CameraBattery} = useImage('Camera_Battery.png')
        const { image: SliderImage} = useImage('slider.png')
        const { image: SlideBarImage} = useImage('slidebar.png')
        const { image: CheckButton} = useImage('check_button.png')
        const { image: NextButton} = useImage('next_button.png')
        const { image: BackButton} = useImage('back_button.png')

        const images = [CameraBackRight, CameraImageRight, CameraBack, CameraImage]
        
        const [persons, setPersons] = useState([
            new Person(1536/2-153/2, 260, 153, 333, PersonImageActive, PersonImagePassive)
        ])
        const [cameras, setCameras] = useState([
            new Camera(130, 430, 100, 273.33333333334, CameraImage)
        ])
        zoom = zoomScale*50
        if (cameraImg != CameraRecOn && cameraImg != CameraRecBlink){
          cameraImg = CameraRecOn
        }

  useEffect(() => {
    if (!isActive) {
    }
  }, [isActive])

  useEffect(() =>{
    const handleKeyDown = (e) =>{
      if (e.key === 'ArrowDown' && scroll === true) {
        yPosition += 5
        scroll = false
      } else if (e.key === 'ArrowUp' && scroll === true) {
        yPosition -= 5
        scroll = false
      }
      if (e.key === 'ArrowRight' && rotate === true) {
        xPosition += 5
        rotate = false
      } else if (e.key === 'ArrowLeft' && rotate === true) {
        xPosition -= 5
        rotate = false
      }
    }
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        scroll = true
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        rotate = true
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
  })

  const changeCameraPlace = (x, y, id) => {
    cameraPosition = cameraPlaces.indexOf(id)
    console.log(cameraPosition)
    for (let camera of cameras){
        camera.x = x - camera.width/2
        camera.y = y - camera.height+15
    }
  }
  const checkAnwser = () => {
    if (cameraPosition === anwserPosition){
      addCoins()
      changeTask()
    }
  }
  function changeTask() {
    if(currentTaskName === 'placement'){
      currentTaskName = 'zoom'
    }
    else{
      currentTaskName = 'placement'
    }
    resetTipp()
    resetZoom()
  }
  function checkAnswerSize() {
    let Xscaling = scale.scaleX*(1+zoom/10)
    let Yscaling = scale.scaleY*(1+zoom/10)
    let answerSize = size[answerNum]*Yscaling
    let answerWidth = 1536*(size[answerNum]/776)*Xscaling
    let answerX = (window.innerWidth - answerWidth)/2 + xPosition
    let answerY = window.innerHeight-window.innerHeight*(1+zoom/20)+yPosition +250*Yscaling
    if(
      (window.innerHeight <= answerSize + 100 && window.innerHeight >= answerSize - 100) &&
      (window.innerWidth <= answerWidth + 100 && window.innerWidth  >= answerWidth - 100) &&
      (answerX <= 50 && answerX >= -50) && (answerY <= 50 && answerY >= -50)

    ){
      addCoins()
      onClose()
    }
  }
  function cameraBlink() {
    if(cameraImg == CameraRecOn){
      cameraImg = CameraRecBlink
    }
    else{
      cameraImg = CameraRecOn
    }
  }
  if (blink){
    cameraBlink()
    blink = false
  }

  if(currentTaskName === 'placement'){
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <KonvaImage
              x={0}
              y={0}
              width={window.innerWidth}
              height={window.innerHeight}
              image={RoomImage}
          />
        </Layer>
        <Layer scaleX={scale.scaleX} scaleY={scale.scaleY}>
          <CoinCounter x={1536-300} y={25} width={300} height={50}/>
          <Button
            x={1536/2 - 250} 
            y={13}
            width={100}
            height={60}
            image={BackButton}
            onClick={onClose}
          />
          <Button
            x={1536/2 + 150} 
            y={13}
            width={100}
            height={60}
            image={NextButton}
            onClick={changeTask}
          />
          <Button
            x={1536/2 - 50} 
            y={13}
            width={100}
            height={60}
            image={CheckButton}
            onClick={checkAnwser}
          />
          <Ellipse
              radiusX={100}
              radiusY={30}
              x={1536/2}
              y={730}
              fill='rgb(95, 95, 95)'
              stroke={'black'}
          />
          <Ellipse
              radiusX={100}
              radiusY={30}
              x={350}
              y={670}
              fill='rgb(95, 95, 95)'
              stroke={'black'}
          />
          <Ellipse
              radiusX={100}
              radiusY={30}
              x={1536/2}
              y={630}
              fill='rgb(95, 95, 95)'
              stroke={'black'}
          />
          <Ellipse
              radiusX={100}
              radiusY={30}
              x={1536-350}
              y={670}
              fill='rgb(95, 95, 95)'
              stroke={'black'}
          />
          {persons.map((person, index) => (
              <React.Fragment key={`person-${index}`}>
                  {person.render(index, PersonImageActive)}
              </React.Fragment>
          ))}
          {cameras.map((camera, index) => (
              <React.Fragment key={`door-${index}`}>
                  {camera.render(index, images[cameraPosition])}
              </React.Fragment>
          ))}
          <Ellipse
              id='Master Shot'
              radiusX={100}
              radiusY={30}
              x={1536/2}
              y={730}
              fill='transparent'
              onClick={(e) => changeCameraPlace(e.target.x(), e.target.y(), e.target.id())}
          />
          <Ellipse
              id='SRS Shema'
              radiusX={100}
              radiusY={30}
              x={350}
              y={670}
              fill='transparent'
              onClick={(e) => changeCameraPlace(e.target.x(), e.target.y(), e.target.id())}
          />
          <Ellipse
              id='POV'
              radiusX={100}
              radiusY={30}
              x={1536/2}
              y={630}
              fill='transparent'
              onClick={(e) => changeCameraPlace(e.target.x(), e.target.y(), e.target.id())}
          />
          <Ellipse
              id='Cut away'
              radiusX={100}
              radiusY={30}
              x={1536-350}
              y={670}
              fill='transparent'
              onClick={(e) => changeCameraPlace(e.target.x(), e.target.y(), e.target.id())}
          />
          <TecherJoker text={taskText} tipp={tippText} />
        </Layer>
      </Stage>
    )
  }
  else{
    return(
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer 
          scaleX={scale.scaleX*(1+zoom/10)} scaleY={scale.scaleY*(1+zoom/10)}
          x={window.innerWidth-window.innerWidth*(1+zoom/20)+xPosition}
          y={window.innerHeight-window.innerHeight*(1+zoom/20)+yPosition}
          >
          <KonvaImage
              x={0}
              y={0}
              width={1536}
              height={776}
              image={RoomImage}
          />
          {persons.map((person, index) => (
              <React.Fragment key={`person-${index}`}>
                  {person.render(index, PersonImageActive)}
              </React.Fragment>
          ))}
          <Rect
            x={(1536 - (1536*(353/776)))/2}
            y={250}
            width={1536*(353/776)}
            height={353}
            fill='transparent'
            stroke={'yellow'}
          />
          <Rect
            x={(1536 - (1536*(283/776)))/2}
            y={250}
            width={1536*(283/776)}
            height={283}
            fill='transparent'
            stroke={'yellow'}
          />
          <Rect
            x={(1536 - (1536*(230/776)))/2}
            y={250}
            width={1536*(230/776)}
            height={230}
            fill='transparent'
            stroke={'yellow'}
          />
          <Rect
            x={(1536 - (1536*(170/776)))/2}
            y={250}
            width={1536*(170/776)}
            height={170}
            fill='transparent'
            stroke={'yellow'}
          />
          <Rect
            x={(1536 - (1536*(120/776)))/2}
            y={250}
            width={1536*(120/776)}
            height={120}
            fill='transparent'
            stroke={'yellow'}
          />
        </Layer>
        <Layer scaleX={scale.scaleX} scaleY={scale.scaleY}>
          <CoinCounter x={1536-300} y={25} width={300} height={50}/>
          <Text
            x={1536/2-400}
            y={776-75}
            width={800}
            height={50}
            text={"Zoomfaktor: " + Math.floor(zoom*10) + "%"}
            fontSize={75}
            align='center'
            stroke={"white"}
            strokeWidth={0.5}
            fontFamily='pixelFont'
          />
          <Slider x={100} y={100} width={13.5} height={234} img_slider={SliderImage} img_slidebar={SlideBarImage} />
          <Button
            x={1536/2 - 50} 
            y={13}
            width={100}
            height={60}
            image={CheckButton}
            onClick={checkAnswerSize}
          />
          <Button
            x={1536/2 - 250} 
            y={13}
            width={100}
            height={60}
            image={BackButton}
            onClick={changeTask}
          />
          <KonvaImage
              x={1556/2-279/2}
              y={776/2-108/2}
              width={279}
              height={108}
              image={CameraFokus}
          />
          <KonvaImage
              x={1556-279}
              y={776-108}
              width={279/2}
              height={108/2}
              image={cameraImg}
              onClick={cameraBlink}
          />
          <KonvaImage
              x={279/2}
              y={776-108}
              width={279/2}
              height={108/2}
              image={CameraBattery}
          />
          <TecherJoker text={taskText_zoom} tipp={tippText_zoom} />
        </Layer>
      </Stage>
    )
  }
}

export default Cameraroom;
