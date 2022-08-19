
import {MyEngineObjects,} from "./myObject3D"
import {MyObject3D, myObjects} from "./myObjects/myObject3D"
import { EngineObjects} from './interfaces/EngineObject'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { MMDLoader} from "three/examples/jsm/loaders/MMDLoader"
import { Group, Loader, AnimationMixer } from "three";


export class TEngine{
    private engineObject:EngineObjects
    constructor(dom:HTMLElement){

        this.engineObject = new MyEngineObjects(dom, myObjects);

        const objLoader:OBJLoader = new OBJLoader();
        const mtlLoader:MTLLoader = new MTLLoader();
        mtlLoader.load("/models/frame.mtl", (materials)=>{
            materials.preload();
            objLoader.setMaterials(materials);
            console.log(materials);
            objLoader.load("/models/frame.obj", (object)=>{
                const obj:MyObject3D<Group> = {
                    myObject:object,
                    animation(){
                        this.myObject.scale.set(1, 1, 1);
                        this.myObject.position.y = 30;
                        this.myObject.rotation.z = 25;
                        this.myObject.rotation.y = 45;
                        this.myObject.position.x = 20;
                    }
                }
                obj.animation();
                // this.engineObject.scene.add(obj.myObject);
                
            })
        })
        setTimeout(()=>{
            console.log(this.engineObject.scene);
            
        }, 3000)

    }
}