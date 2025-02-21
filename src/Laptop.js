import React from 'react';
import { Rect, Image as KonvaImage} from 'react-konva';

class Laptop {
    constructor(x, y, width, height) {
      this.x = x*(window.innerWidth/1052)
      this.y = y*(window.innerHeight/776)
      this.width = width*(window.innerWidth/1052)
      this.height = height*(window.innerHeight/776)
      this.show = false
    }
  
    render(index) {
        if (this.show == true){
            return (
                <Rect
                key={index}
                x={this.x}
                y={this.y}
                width={this.width}
                height={this.height}
                fill="black" />
            )
        }
    }
}

export default Laptop