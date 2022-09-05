import { MMDLoader } from 'three/examples/jsm/loaders/MMDLoader';

import { Group, Mesh, Audio, AudioLoader} from "three";
import * as THREE from "three"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { AnimationObjects, MyObject3D } from "./myObject3D";


const objLoader:OBJLoader = new OBJLoader();
const mtlLoader:MTLLoader = new MTLLoader();


export const  framePromise = new Promise<Group>(resolve =>{
    mtlLoader.load("/models/frame.mtl", (material)=>{
        console.log(material, "1");

        material.preload();
        objLoader.setMaterials(material);
        objLoader.load("/models/frame.obj", (obj:Group)=>{
            console.log(obj,"2");
            
            resolve(obj)
        })
    })
},).then((obj)=>{
    const frame:MyObject3D<Group> = {
        myObject:obj,
        animation() {
            this.myObject.position.y = 50;
            this.myObject.rotation.y = Math.PI * 40/180;
        },
    }    
    console.log(frame, "3");

    return frame;
})


const mmdLoader:MMDLoader = new MMDLoader();
export const tianyiPromise = new Promise<MyObject3D<Mesh>>(resolve=>{
    mmdLoader.loadWithAnimation("/shotgun/雷电将军.pmx", "/danceData/兰若酒醉的蝴蝶mmd数据.vmd",(obj)=>{
        
        const tianyi:MyObject3D<Mesh> = {
            myObject:obj.mesh,
            animationObject: new AnimationObjects(obj.mesh, obj.animation,1),
            animation(time:number) {
                this.animationObject?.mixer.update(time);

                // this.myObject.position.x += 0.1;
                // this.myObject.position.y += 0.1;
            },
        }


        resolve(tianyi);
    })
})




