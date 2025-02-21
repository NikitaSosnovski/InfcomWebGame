import React from 'react';
import { Text, Group, Shape } from 'react-konva';

const TeacherJokerText = ({ x, y, width, height, text, dir}) => {

    const makeSpeechBubbleTail = (px, py, dir) => {
        let tailPoints = []
        if(dir === 'right'){
            px -= 25
            tailPoints=[
                px, py,
                px, py+21,
                px-3, py+21,
                px-3, py+18,
                px-6, py+18,
                px-6, py+12,
                px-12, py+12,
                px-12, py+6,
                px-18, py+6,
                px-18, py
            ]
        }
        else{
            px += 25
            tailPoints=[
                px, py,
                px, py+6,
                px-6, py+6,
                px-6, py+12,
                px-12, py+12,
                px-12, py+18,
                px-18, py+18,
                px-18, py+21,
                px-18, py+21,
                px-18, py
            ]
        }
            return tailPoints
    }

    let tailPoints = makeSpeechBubbleTail(width, height, dir)
    return (
        <Group x={x} y={y}>
            <Shape
                width={width}
                height={height}
                sceneFunc={(context, shape) => {
                            const bubbleWidth = shape.width()
                            const bubbleHeight = shape.height()
                            const startX = 0
                            const startY = 0

                            const points = [
                                startX+12, startY,
                                startX+bubbleWidth-12, startY,
                                startX+bubbleWidth-12, startY+6,
                                startX+bubbleWidth-6, startY+6,
                                startX+bubbleWidth-6, startY+12,
                                startX+bubbleWidth, startY+12,
                                startX+bubbleWidth, startY+bubbleHeight-12,
                                startX+bubbleWidth-6, startY+bubbleHeight-12,
                                startX+bubbleWidth-6, startY+bubbleHeight-6,
                                startX+bubbleWidth-12, startY+bubbleHeight-6,
                                startX+bubbleWidth-12, startY+bubbleHeight,//Import Tail [20]
                                startX+12, startY+bubbleHeight,
                                startX+12, startY+bubbleHeight-6,
                                startX+6, startY+bubbleHeight-6,
                                startX+6, startY+bubbleHeight-12,
                                startX, startY+bubbleHeight-12,
                                startX, startY+12,
                                startX+6, startY+12,
                                startX+6, startY+6,
                                startX+12, startY+6,
                                startX+12, startY,
                            ];

                            context.beginPath();
                            context.moveTo(points[0], points[1]);

                            for (let i = 2; i < points.length; i += 2) {
                                if(i === 22){
                                    for (let j = 0; j < tailPoints.length; j += 2) {
                                        context.lineTo(tailPoints[j], tailPoints[j + 1]);
                                    }
                                }
                                context.lineTo(points[i], points[i + 1]);
                            }

                            context.closePath()
                            context.fillStrokeShape(shape)
                        }}
                        fill="white"
                        stroke="black"
                        strokeWidth={3}
                    />

                    <Text
                        x={10}
                        y={10}
                        width={width - 20}
                        height={height - 20}
                        text={text}
                        fontFamily="pixelFont"
                        fontSize={20}
                        fill="#000"
                        align="center"
                        verticalAlign="middle"
                    />
                </Group>
            )
}

export default TeacherJokerText;