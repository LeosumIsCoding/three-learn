import {WebGLRenderer, Scene, PerspectiveCamera,AmbientLight,
    AxesHelper,GridHelper} from "three"
import Stats from "three/examples/jsm/libs/stats.module"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export interface EngineObjects{
    renderer:WebGLRenderer;
    scene:Scene;
    camera:PerspectiveCamera;
    ambientLight:AmbientLight;
    axesHelper:AxesHelper;
    gridHelper:GridHelper;
    statsDom:HTMLElement;
    stats:Stats;
    orbitControls:OrbitControls;
    renderFun():void;

}

