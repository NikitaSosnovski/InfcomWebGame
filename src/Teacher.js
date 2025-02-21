import React from 'react'
import { Rect, Image as KonvaImage } from 'react-konva'

class Teacher {
    constructor(x, y, width, height, id) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.id = id 
      this.dir = 'right' 
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
            height={this.height}
            image={img} /></>
      );
    }
}

export default Teacher