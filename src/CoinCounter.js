import React from 'react';
import { Rect, Text, Image as KonvaImage } from 'react-konva';

let coins = 0

function addCoins(){
    coins++
}

const CoinCounter = ({ x, y, width, height}) => {
    let text = 'Du hast ' + coins + ' Punkte'
  
    return (
        <>
            <Text
                x={x}
                y={y}
                width={width}
                height={height}
                fontSize={25}
                text={text}
                fill='white' 
                align="center"
                verticalAlign="middle"
                fontFamily='pixelFont'
            />
        </>
    )
}

export default CoinCounter
export {addCoins}