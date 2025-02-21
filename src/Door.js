import React from 'react';
import { Rect, Image as KonvaImage } from 'react-konva';

class Door{
    constructor(x, y, width, height, dir){
        this.x = x//*(window.innerWidth/1519)
        this.y = y//*(window.innerHeight/776)
        this.width = width//*(window.innerWidth/1519)
        this.height = height//*(window.innerHeight/776)
        this.direction = dir
    }

    render(index, img) {
      return (
        <><Rect
        key={index}
        x={this.x}
        y={this.y}
        width={this.width}
        height={this.height}
        fill="transparent" /><KonvaImage
            x={this.x}
            y={this.y}
            width={this.width}
            height={this.height * 1.25}
            image={img} /></>
        );
    }
}

export default Door;