import {WebGLRenderer, Scene, PerspectiveCamera,AmbientLight,
    AxesHelper,GridHelper, Object3D} from "three"
import Stats from "three/examples/jsm/libs/stats.module"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export interface EngineObjects{
    renderer:WebGLRenderer;
    scene:Scene;
    camera:PerspectiveCamera;
    lightList:Object3D[];
    heplerList:Object3D[];
    statsDom:HTMLElement;
    stats:Stats;
    orbitControls:OrbitControls;
    renderFun():void;

}

