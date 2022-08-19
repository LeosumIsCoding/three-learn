import { TCanvasTextureEditor } from './myObjects/TCanvasTextureEditor';

import  { AmbientLight, AnimationMixer, AxesHelper, BoxBufferGeometry, BufferGeometry, GridHelper, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, SphereBufferGeometry, Vector3, WebGLRenderer } from 'three';
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {EngineObjects} from "./interfaces/EngineObject";
import {lightList} from './myObjects/Tlight';
import {helperList} from './myObjects/THepler'
import { loadModelList } from './myObjects/TLoadModels';

import {myObjects, MyObject3D} from './myObjects/myObject3D'
import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';


export class MyEngineObjects implements EngineObjects{
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    lightList: Object3D[];
    heplerList:Object3D[];
    statsDom: HTMLElement;
    stats: Stats;
    orbitControls: OrbitControls;
    objectList: MyObject3D<Object3D>[];

    canvasTextureEditor:TCanvasTextureEditor;

    mixer:AnimationMixer | undefined;
    renderFun = (): void => {
        this.objectList.forEach((myObjects)=>{
            myObjects.animation();
        })
        
        this.stats.update();
        this.orbitControls.update();


        const clock = new THREE.Clock();
        const tick = ()=>{
            const time = clock.getDelta();
            if(this.mixer){
                this.mixer.update(time);
            }else{
                console.log("err");
                
            }
            console.log("123");
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(tick);
        }
        console.log("123");
       
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

    constructor(dom:HTMLElement, myObjects:MyObject3D<Object3D>[]){

        
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
        console.log(this.objectList,"objectList");
        
        this.objectList.forEach((value)=>{
            // console.log(value.myObject,);
            this.scene.add(value.myObject);
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
// 渲染
        // this.renderer.render(this.scene, this.camera);

        const mmdLoader = new MMDLoader();
        // mmdLoader.load("/shotgun/")\

        let mixer ;
        mmdLoader.loadWithAnimation(
            "/shotgun/雷电将军.pmx",
            "/danceData/兰若酒醉的蝴蝶mmd数据.vmd",
            (tianyi)=>{
                this.scene.add(tianyi.mesh);
                this.mixer = new AnimationMixer(tianyi.mesh);
                const action = this.mixer.clipAction(tianyi.animation);
                action.setLoop(THREE.LoopOnce, 1);
                action.play();
                console.log("play");
                this.draw2D();
                     

                var audioMesh = new THREE.Mesh(
                    new BoxBufferGeometry(0, 0, 0.1),
                    new MeshStandardMaterial()
                )
                this.scene.add(audioMesh);

                var listener = new THREE.AudioListener();
                this.camera.add(listener);
                // const action = mixer.clipAction(tianyi.animation[0] as any);
                var PosAudio = new THREE.PositionalAudio(listener);
                audioMesh.add(PosAudio);
                var audioLoader = new THREE.AudioLoader();
                audioLoader.load("/music/原来我就是那一只醉酒的蝴蝶😝【原神】 - 1.醉酒的蝴蝶60fps(Av595077385,P1).mp3",(buffer)=>{
                    PosAudio.setBuffer(buffer);
                    PosAudio.setVolume(0.8);
                    PosAudio.setRefDistance(200);
                    PosAudio.play();
                    this.renderFun(); 
                })
                 
            },
        )
        

    }
    
}

