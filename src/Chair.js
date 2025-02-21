import React from 'react'
import { Rect, Text, Image as KonvaImage } from 'react-konva'

class Chair {
    constructor(player, barrier, id) {
      if (id%2 === 1){  
        this.x = barrier.x + barrier.width/4 - 20
      }
      else{
        this.x = barrier.x + barrier.width/4*3
      }
      this.y = barrier.y + barrier.height + 3
      this.width = 26
      this.height = 39
      /*this.Xspeed = player.Xspeed
      this.Yspeed = player.Yspeed
      this.collided = false*/
      this.attached = false
    }

    updatePosition(player, barriers, chairs){
      if(this.attached){
        this.x = player.img_x - 10
        if(player.direction === 'right'){
          this.x += player.img_width
        }
        this.y = player.y + player.height - this.height
      }
    }

    isColliding(newX, newY, object) {
        return (
          newX < object.x + object.width &&
          newX + this.width > object.x &&
          newY < object.y + object.height &&
          newY + this.height > object.y
        )
    }
  
    render(index, img, player) {
      if (this.attached){
        img = ''
      }
      return (
        <><>
        <Rect
          key={index+1}
          x={this.x}
          y={this.y}
          width={this.width}
          height={this.height}
          fill="transparent" />
          <KonvaImage
            x={this.x}
            y={this.y}
            width={this.width}
            height={this.height}
            image={img} />
          </></>
      )
    }
}

export default Chair