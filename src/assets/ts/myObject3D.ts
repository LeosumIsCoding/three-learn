
import { AmbientLight, AxesHelper, BoxBufferGeometry, GridHelper, Mesh, MeshStandardMaterial, Object3D, PerspectiveCamera, Scene, SphereBufferGeometry, Vector3, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import {EngineObjects} from "./interfaces/EngineObject"
export abstract class MyObject3D<T> {
    public abstract myObject:T;
    public abstract animation():void;
}


const _myObjects:MyObject3D<Mesh>[] = []
const box1:MyObject3D<Mesh> = {
    myObject: new Mesh(
        new BoxBufferGeometry(10, 10, 10),
        new MeshStandardMaterial({color:"rgb(255, 0, 0)"})
    ),
    animation: function (): void {
        this.myObject.position.x += 0.05;
        this.myObject.rotation.x += 0.1;
        this.myObject.rotation.y += 0.1;
        this.myObject.rotation.z += 0.1; 
        console.log("123");
    }
}
_myObjects.push(box1);


const box2:MyObject3D<Mesh> = {
    myObject: new Mesh(
        new BoxBufferGeometry(20, 20, 20),
        new MeshStandardMaterial({color:"rgb(0, 255, 0)"})
    ),
    animation: function (): void {
        this.myObject.rotation.x += 0.5;
        this.myObject.position.z += 1;
    }
}
_myObjects.push(box2);



const sphere:MyObject3D<Mesh> = {
    myObject:new Mesh(
        new SphereBufferGeometry(5),
        new MeshStandardMaterial(),
    ),
    animation: function (): void {
        this.myObject.position.z = 20
        // this.myObject.rotation.x += 0.5;
        // this.myObject.position.z += 1;
    }
}

_myObjects.push(sphere);

export const myObjects = _myObjects;


export class MyEngineObjects implements EngineObjects{
    renderer: WebGLRenderer;
    scene: Scene;
    camera: PerspectiveCamera;
    ambientLight: AmbientLight;
    axesHelper: AxesHelper;
    gridHelper: GridHelper;
    statsDom: HTMLElement;
    stats: Stats;
    orbitControls: OrbitControls;
    objectList: MyObject3D<Object3D>[];
    renderFun = (): void => {
        this.objectList.forEach((myObjects)=>{
            myObjects.animation();
        })
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
        this.orbitControls.update();
        requestAnimationFrame(this.renderFun);
    }
////////////
    constructor(dom:HTMLElement, myObjects:MyObject3D<Object3D>[]){
        this.objectList = myObjects;
        // this.setEngineObjects(new MyEngineObjects(dom));
        console.log(this.objectList);
        this.renderer = new WebGLRenderer({
            antialias:true,
        }); 
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
        this.ambientLight = new AmbientLight("rgb(255, 255, 255)", 1);

        this.scene.add(this.ambientLight);
// 清除
        this.renderer.setClearColor("rgb(255,255,200)");
        this.renderer.clearColor();
// 添加 坐标
        this.axesHelper = new AxesHelper(500);
        this.gridHelper = new GridHelper(500, 20, "rgb(200, 200, 200)", "rgb(100, 100, 100)");       
        this.scene.add(this.axesHelper);
        this.scene.add(this.gridHelper);
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
        this.renderFun();       
    }
}

