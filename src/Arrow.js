import React from 'react';
import { Rect, Image as KonvaImage } from 'react-konva';

class Arrow {
    constructor(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.speed = -1
      this.border = this.y + 20
      this.show = true
    }

    updatePosition(){
        if(this.y < this.border){
            this.speed += 0.05
        }
        else{
            this.speed *= -1
        } 
        this.y += this.speed
    }
  
    render(index, img) {
        if (this.show === true){
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
            )
        }
    }
}

export default Arrow