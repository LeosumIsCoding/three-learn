import { BoxBufferGeometry, Group, Mesh, MeshStandardMaterial, Object3D, PlaneBufferGeometry, SphereBufferGeometry } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import {headimgTexture} from "./TTextures"
export const myObjects:MyObject3D<Object3D>[] = []

export abstract class MyObject3D<T> {
    public abstract myObject:T;
    public abstract animation():void;
}


const box1Object = new Mesh(
    new BoxBufferGeometry(10, 10, 10),
    new MeshStandardMaterial({
        color:"rgb(255, 0, 0)",
        metalness: 1,// 金属度
        roughness:0.2// 粗糙度
    })
);
box1Object.castShadow = true;
const box1:MyObject3D<Mesh> = {
    myObject: box1Object,
    animation: function (): void {
        this.myObject.position.y = 15;
        this.myObject.position.x = 20;
        this.myObject.position.z = 20;
        // this.myObject.rotation.x = 0.1;
        // this.myObject.rotation.y += 0.1;
        // this.myObject.rotation.z += 0.1; 
        console.log("123");
    }
}
// myObjects.push(box1);


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
// myObjects.push(box2);


const sphereObject = new Mesh(
    new SphereBufferGeometry(5),
    new MeshStandardMaterial(),
);
sphereObject.castShadow = true;
const sphere:MyObject3D<Mesh> = {
    myObject:sphereObject,
    animation: function (): void {
        this.myObject.position.z = 20
        // this.myObject.rotation.x += 0.5;
        // this.myObject.position.z += 1;
    }
}
// myObjects.push(sphere);

const stageObject = new Mesh(
    new BoxBufferGeometry(200,10,200),
    new MeshStandardMaterial({
        color:"rgb(50, 250, 150)",
        metalness: 0.2,
        roughness:0.75
    })
)
stageObject.receiveShadow = true;

const stage:MyObject3D<Mesh> = {
    myObject: stageObject,
    animation:function():void{
        this.myObject.position.y = -5;
        
    }
}

myObjects.push(stage);


const planeObject:Mesh = new Mesh(
    new PlaneBufferGeometry(80, 80),
    new MeshStandardMaterial({
        color:"rgb(200, 200, 200)",
        map:headimgTexture,
    })
)
const plane:MyObject3D<Mesh> = {
    myObject:planeObject,
    animation() {
        this.myObject.position.z = -20;    
        this.myObject.position.y = 50;  
        this.myObject.scale.set(1.5, 1.5, 1.5)
    },
}


