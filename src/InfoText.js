import React from 'react';
import { Text } from 'react-konva';

class InfoText {
    constructor(x, y, width, height, text){
        this.x = x*(window.innerWidth/1052)
        this.y = y*(window.innerHeight/776)
        this.width = width
        this.height = height
        this.text = text
    }

    render(index, player) {
        if(player.nextRoom){
            return (
            <Text
                key={index}
                x={this.x}
                y={this.y}
                width={this.width}
                height={this.height}
                text={this.text}
            />
            );
        }
    }
}
export default InfoText