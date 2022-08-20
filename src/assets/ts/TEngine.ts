
import {MyEngineObjects,} from "./myObject3D"

import { EngineObjects} from './interfaces/EngineObject'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { MMDLoader} from "three/examples/jsm/loaders/MMDLoader"
import { Group, Loader, AnimationMixer } from "three";


export class TEngine{
    private engineObject:EngineObjects
    constructor(dom:HTMLElement){
        this.engineObject = new MyEngineObjects(dom);
        setTimeout(()=>{
            console.log(this.engineObject.scene);
            
        }, 3000)

    }
}