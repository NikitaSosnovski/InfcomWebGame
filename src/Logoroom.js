import React, { useState, useEffect } from 'react';
import { Stage, Layer, Ellipse, Image as KonvaImage, Text, Rect } from 'react-konva'
import useImage from './useImage'
import Button from './Button'
import CoinCounter from './CoinCounter'
import { addCoins } from './CoinCounter'
import TecherJoker from './TeacherJoker';

let logoNumber = 0
let getLogo = true
let theRealLogo = Math.random()
let logoImg1
let logoImg2
let taskText = 'Hier musst du das Richtige Logo erraten'
let tippText = 'Schau genauer hin, leider kann ich dir hier keinen weiteren Tipp geben'

const Logoroom = ({ isActive, onClose }) => {

    const { image: InfcomImage} = useImage('logos/infcom.png')
    const { image: InfcomFakeImage} = useImage('logos/infcom_fake.png')
    const { image: AndroidImage} = useImage('logos/android.png')
    const { image: AndroidFakeImage} = useImage('logos/android_fake.png')
    const { image: RoomImage} = useImage('office.png')
    const { image: BurgerKingImage} = useImage('logos/burger_king.png')
    const { image: BurgerKingFakeImage} = useImage('logos/burger_king_fake.png')
    const { image: FerrariImage} = useImage('logos/ferrari.png')
    const { image: FerrariFakeImage} = useImage('logos/ferrari_fake.png')
    const { image: GoogleImage} = useImage('logos/google.png')
    const { image: GoogleFakeImage} = useImage('logos/google_fake.png')
    const { image: HPImage} = useImage('logos/hp.png')
    const { image: HPFakeImage} = useImage('logos/hp_fake.png')
    const { image: BackButton} = useImage('back_button.png')
    const logosList = [InfcomImage, AndroidImage, BurgerKingImage, FerrariImage, GoogleImage, HPImage]
    const fakeLogosList = [InfcomFakeImage, AndroidFakeImage, BurgerKingFakeImage, FerrariFakeImage, GoogleFakeImage, HPFakeImage]

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


        let realLogoImg = logosList[logoNumber]
        let fakeLogoImg = fakeLogosList[logoNumber]

    useEffect(() => {
        if (!isActive) {
        }
    }, [isActive])

    function setLogo () {
        if(theRealLogo >= 0.5){
            logoImg2 = logosList[logoNumber]
            logoImg1 = fakeLogosList[logoNumber]
        }
        else{
            logoImg1 = logosList[logoNumber]
            logoImg2 = fakeLogosList[logoNumber]
        }
        console.log(logoImg1, logoImg2)
        if(logoImg1 && logoImg2 != NaN){
            console.log(logoImg1, logoImg2)
            getLogo = false
        }
    }

    const checkAnswer = (e) => {
        const konvaImage = e.target
        const img = konvaImage.image()
        if(img === realLogoImg){
            logoNumber++
            if(logoNumber === logosList.length){
                onClose()
            }
            addCoins()
            getLogo = true
            theRealLogo = Math.random()
        }
    }

    if(getLogo){
        setLogo()
    }

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
                <KonvaImage
                    x={(1536/2-400)}
                    y={(776-300)/2}
                    width={400}
                    height={300}
                    image={logoImg1}
                    onClick={checkAnswer}
                />
                <KonvaImage
                    x={(1536/2)}
                    y={(776-300)/2}
                    width={400}
                    height={300}
                    image={logoImg2}
                    onClick={checkAnswer}
                />
                <Button
                    x={100}
                    y={13}
                    width={100}
                    height={60}
                    image={BackButton}
                    onClick={onClose} 
                />
                <TecherJoker text={taskText} tipp={tippText} />
            </Layer>
        </Stage>
    )
}

export default Logoroom;