import React from 'react';
import { Text, Group, Shape } from 'react-konva';

class TaskText {
    constructor(teacher, width, height, text) {
        this.teacher = teacher;
        this.width = width;
        this.height = height;
        this.text = text;
        this.x = teacher.x+teacher.width/2-width/2;
        this.y = teacher.y-height;
    }

    makeSpeechBubbleTail(px, py, dir){
        let tailPoints = []
        if(dir === 'right'){
            px -= this.teacher.width
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
            px += this.teacher.width
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

    render(index, player) {
        if (player.getText && this.teacher) {
            let tailPoints = this.makeSpeechBubbleTail(this.width/2, this.height, this.teacher.dir)
            return (
                <Group key={index} x={this.x} y={this.y}>
                    <Shape
                        width={this.width}
                        height={this.height}
                        sceneFunc={(context, shape) => {
                            const bubbleWidth = shape.width();
                            const bubbleHeight = shape.height();
                            const startX = 0;
                            const startY = 0;

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

                            context.closePath();
                            context.fillStrokeShape(shape);
                        }}
                        fill="white"
                        stroke="black"
                        strokeWidth={3}
                    />

                    <Text
                        x={10} // Small padding for the text
                        y={10}
                        width={this.width - 20} // Adjust width to keep text inside
                        height={this.height - 20} // Adjust height to keep text inside
                        text={this.text}
                        fontFamily="silkscreen, monospace"
                        fontSize={14}
                        fill="#000"
                        align="center"
                        verticalAlign="middle"
                    />
                </Group>
            );
        }
        return null;
    }
}

export default TaskText;
