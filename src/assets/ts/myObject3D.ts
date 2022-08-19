import { TCanvasTextureEditor } from './myObjects/TCanvasTextureEditor';

import { AmbientLight, AxesHelper, BoxBufferGeometry, GridHelper, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, SphereBufferGeometry, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {EngineObjects} from "./interfaces/EngineObject";
import {lightList} from './myObjects/Tlight';
import {helperList} from './myObjects/THepler'

import {myObjects, MyObject3D} from './myObjects/myObject3D'


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
    renderFun = (): void => {
        this.objectList.forEach((myObjects)=>{
            myObjects.animation();
        })
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
        this.orbitControls.update();

        requestAnimationFrame(this.renderFun);
    }
    draw2D = ():void =>{
        const textCanvas = new TCanvasTextureEditor();
        textCanvas.draw( ctx =>{
        ctx.beginPath();
        ctx.rect(10, 10, 200, 200);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
        ctx.closePath();
        }).preview()
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
        this.camera.position.set(20, 20, 20);
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.camera.up = new Vector3(0, 1, 0);
// 创建模型
        // this.objectMap.forEach((value)=>{
        //     console.log(value); 
        // })
        // console.log(this.objectMap.get("box1").object3D);
        this.objectList.forEach((value)=>{
            console.log(value.myObject);
            this.scene.add(value.myObject);
        })
        console.log();
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
        // this.orbitControls.mouseButtons = {
        //     // LEFT:null as unknown as MOUSE,
        //     // RIGHT:MOUSE.LEFT,
        // }       
// 渲染
        // this.renderer.render(this.scene, this.camera);
        this.draw2D();
        this.renderFun();       
    }
    
}

