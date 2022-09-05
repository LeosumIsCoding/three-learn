import { TCanvasTextureEditor } from './myObjects/TCanvasTextureEditor';

import  { AudioListener, AudioLoader, Clock, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer, Audio, Vector2 } from 'three';
import {TransformControls} from "three/examples/jsm/controls/TransformControls"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {EngineObjects} from "./interfaces/EngineObject";
import {lightList} from './myObjects/Tlight';
import {helperList} from './myObjects/THepler'
import {framePromise, tianyiPromise} from "./myObjects/TLoadModels"

import {MyObject3D, myObjects} from './myObjects/myObject3D'



export class MyEngineObjects implements EngineObjects{
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    lightList: Object3D[];
    heplerList:Object3D[];
    statsDom: HTMLElement;
    stats: Stats;
    mouse:Vector2;
    orbitControls: OrbitControls;
    objectList: MyObject3D<Object3D>[];
    canvasTextureEditor:TCanvasTextureEditor;
    private transformControls: TransformControls;

    clock:Clock;
    renderFun = (): void => {
        const tick = ():void => {
            let time = this.clock.getDelta()
            this.objectList.forEach((myObjects)=>{
                myObjects.animation(time); 
            })
            
            this.stats.update();
            this.orbitControls.update();
    
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(tick)
        }    
            
        // let listener = new AudioListener();
        // let audio = new Audio(listener);
        // var audioLoader = new AudioLoader();
        // audioLoader.load("/music/原来我就是那一只醉酒的蝴蝶😝【原神】 - 1.醉酒的蝴蝶60fps(Av595077385,P1).mp3", (audioBuffer)=>{
        //     audio.setBuffer(audioBuffer);
        //     audio.setLoop(false);
        //     audio.setVolume(0.5);
        //     audio.play();
        // }   )   
        tick();

        
    }
    draw2D = ():void =>{
        // const textCanvas = new TCanvasTextureEditor();
        // textCanvas.draw( ctx =>{
        // ctx.beginPath();
        // ctx.rect(10, 10, 200, 200);
        // ctx.strokeStyle = 'blue';
        // ctx.stroke();
        // ctx.closePath();
        // }).preview()
    }
////////////

    constructor(dom:HTMLElement){


        
        this.objectList = myObjects;
        
        this.canvasTextureEditor = new TCanvasTextureEditor();
        // this.setEngineObjects(new MyEngineObjects(dom));
        console.log(this.objectList);
        this.renderer = new WebGLRenderer({
            antialias:true,
        }); 
        this.renderer.shadowMap.enabled = true;
// 设置场景
        this.scene = new Scene();
        dom.appendChild(this.renderer.domElement);
// 设置大小
        // this.renderer.domElement.width = dom.offsetWidth;
        // this.renderer.domElement.height = dom.offsetHeight;
        this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);
        console.log(this);
// 设置相机
        this.camera = new PerspectiveCamera(45, dom.offsetWidth/ dom.offsetHeight, 1, 1000);
        this.camera.position.set(0,150,300);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.camera.up = new Vector3(0, 1, 0);
// 创建模型
        // this.objectMap.forEach((value)=>{
        //     console.log(value); 
        // })
        // console.log(this.objectMap.get("box1").object3D);
        // debugger
        console.log(this.objectList,"objectList");
        
        this.objectList.forEach((value)=>{
            // console.log(value.myObject,);
            this.scene.add(value.myObject);
        })

        framePromise.then((frame)=>{
            this.objectList.push(frame);
            this.scene.add(frame.myObject);
        })
        
        tianyiPromise.then((tianyi)=>{
            this.objectList.push(tianyi);
            this.scene.add(tianyi.myObject);
        })
        
    
        // this.scene.add(box); // 添加到场景
// 添加光源
        this.lightList = lightList;
        this.lightList.forEach((value)=>{
            this.scene.add(value);
        })

// 清除
        this.renderer.setClearColor("rgb(55,55,55)");
        this.renderer.clearColor();
// 添加 坐标
        this.heplerList = helperList;
        this.heplerList.forEach((value)=>{
            this.scene.add(value);
        })
// 添加监视器
        this.stats = Stats();
        this.statsDom = this.stats.domElement;
        this.statsDom.style.position = "fixed";
        this.statsDom.style.top = "10px";
        this.statsDom.style.left = "10px";
        // this.statsDom.style.right = "unset";
        dom.appendChild(this.statsDom);
// 添加轨道监视器
        this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbitControls.enableDamping = true;

        this.orbitControls.enableDamping = true;
        this.orbitControls.enableZoom = true;
        this.orbitControls.autoRotate = false;
        this.orbitControls.autoRotateSpeed = 3;
        this.orbitControls.enablePan = true;
        // this.orbitControls.enableKeys = true;
        this.orbitControls.keyPanSpeed = 7;
        this.orbitControls.keys = {
            LEFT:"37",
            UP:"38",
            RIGHT:"39",
            BOTTOM:"40"
        }

        // this.orbitControls.mouseButtons = {
        //     // LEFT:null as unknown as MOUSE,
        //     // RIGHT:MOUSE.LEFT,
        // }  
        
// 初始化变换控制器
        this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
        this.scene.add(this.transformControls)
// 渲染

        this.clock = new Clock();
        console.log("clock init!");
        


        this.renderer.render(this.scene, this.camera);
        this.mouse = new Vector2()
        this.renderer.domElement.addEventListener("mousemove", (event)=>{
            let x = event.offsetX/this.renderer.domElement.width*2 - 1;
            let y = 1- event.offsetY*2/this.renderer.domElement.height;
            console.log(x, y);
            this.mouse.set(x, y);
        })
        this.renderFun();
    }
    
}

