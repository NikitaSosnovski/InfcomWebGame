import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import raw from "../src/components/text/tasks.txt";
import TaskText from './TaskText';
import Door from './Door';
import Player from './Player';
import Barrier from './Barrier';
import InfoText from './InfoText';
import Teacher from './Teacher'
import Chair from './Chair';
import Arrow from './Arrow';
import useImage from './useImage';
import HelloWorldChecker from './HelloWorldChecker';
import Cameraroom from './Cameraroom';
import Loader from './Loader';
import Camera from './Camera';
import Logoroom from './Logoroom';
import WebCHecker from './WebChecker';
import CoinCounter from './CoinCounter';
import { resetTipp } from './TeacherJoker';

let currentTask = 0
let change_attach = true
let fullText = []
let game_active = true
let loading = true
let taskscreen = true
let timeout
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    console.log("ready")
  }
}
for(let i=3; i>=0; i--){
  let task = await fetch(raw)
    .then(r => r.text())
    .then(text => {
        const lines = text.split('\n')
        const lineNumber = currentTask
        text = lines[lineNumber]
        return text
    });
  fullText.push(task)
}

function toTaskScreen(){
  taskscreen = true
}

const Game = () => {

  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadAssets = async () => {
      await new Promise((resolve) => timeout = setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    loadAssets();
  }, []);

  const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const scaleX = width / 1536;
      const scaleY = height / 776;

      setStageSize({ width, height });
      setScale({ scaleX, scaleY });
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

    const [isCheckerActive, setIsCheckerActive] = useState(false)
    const openChecker = () => {
      setIsCheckerActive(true)
      taskscreen = false
    }
    const closeChecker = () => {
      resetTipp()
      setIsCheckerActive(false)
      taskscreen = true
    }
    const [isCameraActive, setIsCameraActive] = useState(false)
    const openCamera = () => {
      setIsCameraActive(true)
      taskscreen = false
    }
    const closeCameraRoom = () => {
      resetTipp()
      setIsCameraActive(false)
      taskscreen = true
    }
    const [isLogoActive, setIsLogoActive] = useState(false)
    const openLogo = () => {
      setIsLogoActive(true)
      taskscreen = false
    }
    const closeLogoRoom = () => {
      resetTipp()
      setIsLogoActive(false)
      taskscreen = true
    }
    const [isWebActive, setIsWebActive] = useState(false)
    const openWeb = () => {
      console.log("clicked")
      setIsWebActive(true)
      taskscreen = false
    }
    const closeWeb = () => {
      resetTipp()
      setIsWebActive(false)
      taskscreen = true
    }
    const [player, setPlayer] = useState(new Player(50, 50, 3, 'player_right.png', 'player_left.png', 'chair_holding_right.png', 'chair_holding_left.png'))
    const { image: playerImage} = useImage(player.img)
    const { image: BarrierImage} = useImage('table.png')
    const { image: TeacherImage} = useImage('ruh.png')
    const { image: ChairImage} = useImage('chair.png')
    const { image: BackgroundImage} = useImage('infcom.png')
    const { image: DoorImage} = useImage('comp.png')
    const { image: ArrowImage} = useImage('pfeil.png')
    const { image: BoardImage} = useImage('tafel.png')
    const { image: CameraImage} = useImage('Camera_front.png')
    const { image: LogoImage} = useImage('logos/logo.png')
    const { image: CameraIcon} = useImage('camera_icon.png')
    const { image: DesignIcon} = useImage('design_icon.png')
    const { image: ComputerIcon} = useImage('computer_icon.png')
    const { image: WebIcon} = useImage('web_icon.png')
    const [barriers, setBarriers] = useState([
      new Barrier(135.787, 233, 255.5133, 71),
      new Barrier(396.41, 233, 255.5133, 71),
      new Barrier(916.9278, 233, 255.5133, 71),
      new Barrier(1177.55133, 233, 255.5133, 71),

      new Barrier(135.787, 357, 255.5133, 71),
      new Barrier(396.41, 357, 255.5133, 71),
      new Barrier(916.9278, 357, 255.5133, 71),
      new Barrier(1177.55133, 357, 255.5133, 71),

      new Barrier(135.787, 480.5, 255.5133, 71),
      new Barrier(396.41, 480.5, 255.5133, 71),
      new Barrier(916.9278, 480.5, 255.5133, 71),
      new Barrier(1177.55133, 480.5, 255.5133, 71),

      new Barrier(135.787, 604, 255.5133, 71),
      new Barrier(396.41, 604, 255.5133, 71),
      new Barrier(657.764, 604, 255.5133, 71),
      new Barrier(916.9278, 604, 255.5133, 71),
      new Barrier(1177.55133, 604, 255.5133, 71)
    ]);
    const [chairs, setChairs] = useState([
        //new Chair(barriers[0], 1),
        //new Chair(barriers[0], 2),
        new Chair(player, barriers[1], 1),
        new Chair(player, barriers[1], 2)
    ])
    const [teachers, setTeachers] = useState([
      new Teacher(990, 80, 70, 143.94, 0)
    ])
    let HerrRuh = teachers[0]
    const [arrows, setArrows] = useState([
      new Arrow(1012.625, 10, 24.75, 36, 0)
    ])
    const [tasks, setTasks] = useState([
      new TaskText(teachers[0], 250, 50, fullText[currentTask])
    ])
    const [doors, setDoors] = useState([
      new Door(549, 340, 57.5, 25, 1)
    ])
    const [cameras, setCameras] = useState([
      new Camera(755, 330, 36.6, 100)
    ])
    const [infos, setInfos] = useState([
      new InfoText(370, 385, 95, 25, "Drücke 'N'")
    ])

    const [currentRoom, setCurrentRoom] = useState(0)

  const stageRef = useRef(null);

  //Changing Rooms
    const createInfcom = () => {
        player.x = 0
        setBarriers([
            new Barrier(200, 200, 100, 20),
            new Barrier(400, 100, 20, 100),
        ])
        setTeachers([
            new Teacher(900, 200, 70, 150, 0)
        ])
        setTasks([
            new TaskText(teachers[0], 250, 100, fullText[currentTask])
        ])
        setDoors([
            new Door(window.innerWidth - 15, 250, 15, 90, 1)
        ])
        setInfos([
            new InfoText(window.innerWidth - 50, 250, 30, 90, "Drücke 'N'")
        ])
    }
    const createZeichnen = () => {
        player.x = 0
        setBarriers([
            new Barrier(500, 300, 20, 200),
            new Barrier(500, 700, 20, 100),
        ])
        setDoors([
            new Door(window.innerWidth - 15, 250, 15, 90, -1)
        ])
        setInfos([
            new InfoText(window.innerWidth - 50, 250, 30, 90, "Drücke 'N'")
        ])
    }
    const createRooms = [
        { func: createInfcom},
        { func: createZeichnen}
    ]

    const changeRoom = (currentRoom, player, createRooms) => {
        let newRoom = currentRoom + player.room_dir
        newRoom = newRoom % 2
        player.x = 0
        setBarriers([]);
        setTasks([]);
        setTeachers([]);
        setDoors([]);
        setInfos([]);
        createRooms[newRoom].func()
        setCurrentRoom(newRoom);
    }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        player.move.right = true;
      } else if (e.key === 'ArrowLeft') {
        player.move.left = true;
      }
      if (e.key === 'ArrowDown') {
        player.move.down = true;
      } else if (e.key === 'ArrowUp') {
        player.move.up = true;
      }
      /*if (e.key === 'n') {
        //changeRoom(currentRoom, player, createRooms)
        //player.nextRoom = false
        if(player.nextRoom === true){
          setIsCheckerActive(true)
          game_active = false
        }
        if(player.camera){
          //game_active = false
          setIsCameraActive(true)
        }
      }*/
      if (e.key === 'r' && change_attach === true){
        if(player.chair_return){
          player.chair_attach = true
          player.chair_return = false
        }
        else{
          player.chair_return = true
        }
        change_attach = false
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowRight') {
        player.move.right = false;
      } else if (e.key === 'ArrowLeft') {
        player.move.left = false;
      }
      if (e.key === 'ArrowDown') {
        player.move.down = false;
      } else if (e.key === 'ArrowUp') {
        player.move.up = false;
      }
      if(e.key === 'r') {
        change_attach = true
        player.chair_attach = false
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [player])

  useEffect(() => {
    const update = () => {
      for(let chair of chairs){
        chair.updatePosition(player, barriers, chairs)
      }
      for(let arrow of arrows){
        arrow.updatePosition()
      }
      player.updatePosition(chairs, barriers, teachers, doors, cameras)
      setPlayer(Object.assign(Object.create(Object.getPrototypeOf(player)), player))
    }

    requestAnimationFrame(update)
  }, [chairs, player, barriers, teachers, tasks, doors, infos])

  if (taskscreen){
    return(
      <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
        <Layer>
          <KonvaImage
            x={0}
            y={0}
            width={window.innerWidth}
            height={window.innerHeight}
            image={BackgroundImage}
          />
        </Layer>
        <Layer scaleX={scale.scaleX} scaleY={scale.scaleY}>
          <KonvaImage
            x={80}
            y={75}
            width={1376}
            height={776-150}
            image={BoardImage}
          />
          <CoinCounter x={1536-300} y={15} width={300} height={50}/>
          
          <Text
            x={120 + 1296/8 - 150}
            y={120}
            width={300}
            height={120}
            text='Programmieren'
            fontSize={30}
            fill='white'
            align='center'
            fontFamily='pixelFont'
          />
          <Text
            x={120 + 1296/8*3 - 150}
            y={120}
            width={300}
            height={120}
            text='Film'
            fontSize={30}
            fill='white'
            align='center'
            fontFamily='pixelFont'
          />
          <Text
            x={120 + 1296/8*5 - 150}
            y={120}
            width={300}
            height={120}
            text='Design'
            fontSize={30}
            fill='white'
            align='center'
            fontFamily='pixelFont'
          />
          <Text
            x={120 + 1296/8*7 - 150}
            y={120}
            width={300}
            height={120}
            text='Webdesign'
            fontSize={30}
            fill='white'
            align='center'
            fontFamily='pixelFont'
          />
          <KonvaImage
            x={120 + 1296/8 - 60}
            y={175}
            width={120}
            height={120}
            image={ComputerIcon}
            stroke={'white'}
            onPointerDown={openChecker}
          />
          <KonvaImage
            x={120 + 1296/8*3 - 60}
            y={175}
            width={120}
            height={120}
            image={CameraIcon}
            stroke={'white'}
            onPointerDown={openCamera}
          />
          <KonvaImage
            x={120 + 1296/8*5 - 60}
            y={175}
            width={120}
            height={120}
            image={DesignIcon}
            stroke={'white'}
            onPointerDown={openLogo}
          />
          <KonvaImage
            x={120 + 1296/8*7 - 60}
            y={175}
            width={120}
            height={120}
            image={WebIcon}
            stroke={'white'}
            onPointerDown={openWeb}
          />
        </Layer>
      </Stage>
    )
  }

  else if (isLogoActive){
    return(
      <div>
        <Logoroom isActive={isLogoActive} onClose={closeLogoRoom} />
      </div>
    )
  }

  else if(isCameraActive){
    return(
      <div>
        <Cameraroom isActive={isCameraActive} onClose={closeCameraRoom} />
      </div>
    )
  }

  else if (isCheckerActive){
    return (
      <div>
        <HelloWorldChecker isActive={isCheckerActive} onClose={closeChecker}/>
      </div>
    )
  }
  else if (isWebActive){
    return (
      <div>
        <WebCHecker isActive={isWebActive} onClose={closeWeb}/>
      </div>
    )
  }
  else{
    return (
      <div>
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', backgroundColor: 'black', color: 'green'}}>
          <p>Loading...</p>
        </div>
      ) : (
          <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
            <Layer>
              <KonvaImage
                    x={0}
                    y={0}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    image={BackgroundImage}
              />
            </Layer>
            <Layer scaleX={scale.scaleX} scaleY={scale.scaleY}>
              <KonvaImage
                x={700}
                y={50}
                width={104}
                height={58}
                image={BoardImage}
                onClick={toTaskScreen}
              />
              <Rect
                x={player.x}
                y={player.y}
                width={player.width}
                height={player.height}
                fill="transparent"
              />
                  {barriers.map((barrier, index) => (
                    <React.Fragment key={`barrier-${index}`}>
                      {barrier.render(index, BarrierImage)}
                    </React.Fragment>
                  ))}
                  {arrows.map((arrow, index) => (
                    <React.Fragment key={`chair-${index}`}>
                      {arrow.render(index, ArrowImage)}
                    </React.Fragment>
                  ))}
                  {cameras.map((camera, index) => (
                    <React.Fragment key={`door-${index}`}>
                      {camera.render(index, CameraImage)}
                    </React.Fragment>
                  ))}
                  {teachers.map((teacher, index) => (
                    <React.Fragment key={`teacher-${index}`}>
                      {teacher.render(index, TeacherImage)}
                    </React.Fragment>
                  ))}
                  {chairs.map((chair, index) => (
                    <React.Fragment key={`chair-${index}`}>
                      {chair.render(index, ChairImage, player)}
                    </React.Fragment>
                  ))}
                  {playerImage && (
                    <KonvaImage
                      x={player.img_x}
                      y={player.y-player.height*1.5}
                      width={player.img_width}
                      height={player.height*2.5}
                      image={playerImage}
                    />
                  )}
                  {tasks.map((task, index) => (
                    <React.Fragment key={`task-${index}`}>
                      {task.render(index, player)}
                    </React.Fragment>
                  ))}
                  {doors.map((door, index) => (
                    <React.Fragment key={`door-${index}`}>
                      {door.render(index, DoorImage)}
                    </React.Fragment>
                  ))}
                  {infos.map((info, index) => (
                    <React.Fragment key={`info-${index}`}>
                      {info.render(index, player)}
                    </React.Fragment>
                  ))}
            </Layer>
          </Stage>
         )}
      </div>
    )
  }
}

export default Game