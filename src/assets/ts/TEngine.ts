import {AmbientLight, AxesHelper, BoxBufferGeometry, GridHelper, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, Vector3, WebGLRenderer, MOUSE, Object3D} from 'three'
import Stats from "three/examples/jsm/libs/stats.module"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import {MyEngineObjects,} from "./myObject3D"
import {myObjects} from "./myObjects/myObject3D"
import { EngineObjects} from './interfaces/EngineObject'
export class TEngine{
    private engineObject:EngineObjects
    constructor(dom:HTMLElement){
        console.log(myObjects);
        this.engineObject = new MyEngineObjects(dom, myObjects);
    }
}