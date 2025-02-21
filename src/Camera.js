import React from 'react'
import { Rect, Image as KonvaImage } from 'react-konva'

class Camera {
    constructor(x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.areaX = this.width/2 - this.width/2*1.2
    }
  
    render(index, img) {
      return (
        <><Rect
          key={index}
          x={this.x-this.width/4}
          y={this.y-this.height/10}
          width={this.width*1.5}
          height={this.height*1.2}
          fill='transparent' />
          <KonvaImage
            x={this.x}
            y={this.y}
            width={this.width}
            height={this.height}
            image={img} /></>
      );
    }
}

export default Camera