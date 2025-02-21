import React from 'react';
import { Text, Rect, Group } from 'react-konva';

class Player {
    constructor(x, y, speed, img_right, img_left, img_right_holding, img_left_holding) {
      this.img = img_right
      this.x = x
      this.y = y
      this.width = 60
      this.height = 35
      this.Yspeed = speed
      this.Xspeed = speed
      this.move = { left: false, right: false, up: false, down: false }
      this.direction = 'right'
      this.holding = false
      this.holding_width = this.width*(436/329)
      this.img_width = this.width
      this.img_x = this.x
      this.getText = false
      this.nextRoom = false
      this.room_dir = 1
      this.stick_right = true
      this.stick_left = false
      this.img_right = img_right
      this.img_left = img_left
      this.img_right_holding = img_right_holding
      this.img_left_holding = img_left_holding
      this.chair_attach = false
      this.chair_return = true
      this.camera = false
    }

    getImage(){
      if(this.direction === 'right'){
        this.img = this.img_right
        this.img_width = this.width
        this.img_x = this.x
        if(this.holding){
          this.img = this.img_right_holding
          this.img_width = this.holding_width
          this.img_x = this.x - this.img_width/2 + this.width/2
        }
      }
      else{
        this.img = this.img_left
        this.img_width = this.width
        this.img_x = this.x
        if(this.holding){
          this.img = this.img_left_holding
          this.img_width = this.holding_width
          this.img_x = this.x - this.img_width/2 + this.width/2
        }
      }
    }

    updatePosition(chairs, barriers, teachers, doors, cameras) {
      let newX = this.x
      let newY = this.y

      if (this.move.right) {
        this.direction = 'right'
        newX += this.Xspeed
      }
      if (this.move.left) {
        this.direction = 'left'
        newX -= this.Xspeed
      }
      if (this.move.down) {
        newY += this.Yspeed
      }
      if (this.move.up) {
        newY -= this.Yspeed
      }

      this.getImage()

      for (let barrier of barriers) {
        if (this.isColliding(newX, newY, barrier)) {
          if ((this.y >= (barrier.y + barrier.height)) || ((this.y + this.height) <= barrier.y)) {
              newY = this.y
          }
          if (this.x >= (barrier.x + barrier.width) || (this.x + this.width) <= barrier.x) {
              newX = this.x
          }
        }
      }
      for(let chair of chairs) {
        if(this.chair_return && chair.attached){
          chair.attached = false
          this.holding = false
        }
        if(this.isColliding(newX, newY, chair)){
          if(this.chair_attach){
            chair.attached = true
            this.holding = true
            this.chair_attach = false
          }
        }
      }
      /*for (let chair of chairs) {
        if (this.isColliding(newX, newY, chair)) {
          if ((this.y >= (chair.y + chair.height) || (this.y + this.height <= chair.y)) && chair.collided === false) {
              newY = this.y
          }
          if (((this.x >= chair.x + chair.width || this.x + this.width <= chair.x)) && chair.collided === false) {
              newX = this.x
          }
        }
      }*/

      for (let teacher of teachers){
          if (this.inTaskArea(newX, newY, teacher)) {
              this.getText = true
          }
          else{
              this.getText = false
          }
      }

      for (let door of doors){
          if (this.isColliding(newX, newY, door)) {
              this.nextRoom = true
              this.room_dir = door.direction
              break
          }
          else{
              this.nextRoom = false
          }
      }
      for (let camera of cameras){
          if (this.isColliding(newX, newY, camera)) {
              this.camera = true
              break
          }
          else{
              this.camera = false
          }
      }

      if((newX >= 0 && newX <= window.innerWidth - this.height)){
          this.x = newX
      }
      if((newY >= 0 && newY <= window.innerHeight - this.width)){
          this.y = newY
      }
    }

    isColliding(newX, newY, object) {
      return (
        newX < object.x + object.width &&
        newX + this.width > object.x &&
        newY < object.y + object.height &&
        newY + this.height > object.y
      );
    }
    
    inTaskArea(newX, newY, teacher) {
      if(newX < teacher.x+teacher.width/2){
        teacher.dir = 'left'
      }
      else{
        teacher.dir = 'right'
      }
      return (
          newX < teacher.x + teacher.width + 55 &&
          newX + this.width > teacher.x - 55 &&
          newY < teacher.y + teacher.height + 55 &&
          newY + this.height > teacher.y - 55
        )
    }
}
export default Player