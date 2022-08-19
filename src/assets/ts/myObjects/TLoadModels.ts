import { Group } from "three";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MyObject3D } from "./myObject3D";


const objLoader:OBJLoader = new OBJLoader();
const mtlLoader:MTLLoader = new MTLLoader();

export const loadModelList:Array<MyObject3D<Group>> = [];

mtlLoader.load("/models/frame.mtl", function(materials){
    materials.preload();
    objLoader.setMaterials(materials);
    console.log(materials);
    
    objLoader.load("/models/frame.obj", function(object){


        const obj:MyObject3D<Group> = {
            myObject:object,
            animation(){
                this.myObject.scale.set(0.1, 0.1, 0.1);
            }
        }
        
        // loadModelList.push(obj);
    })
})




// console.log(frame);
