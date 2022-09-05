import { wall } from './myObject3D';
import { Object3D, AmbientLight, PointLight, SpotLight } from 'three';

export const lightList:Object3D[] = [];

const ambientLight:AmbientLight = new AmbientLight("rgb(255,255,255)" ,0.35);
// ambientLight.castShadow = true;
lightList.push(ambientLight);

export const pointLight:PointLight = new PointLight("rgb(0, 255, 255)",1,50,0.1 ); // 颜色 强度， 范围， 衰减
pointLight.position.y = 20;
// lightList.push(pointLight);


export const spotLight:SpotLight = new SpotLight(
    'rgb(155,155,155)',
    0.75,
    700,
    Math.PI/180 * 45,
    0,
    0
)
spotLight.castShadow = true;
spotLight.target = wall.myObject;
spotLight.position.set(10, 100, 100);
spotLight.rotation.x = Math.PI/180 * -30

lightList.push(spotLight);


// export const sunLight:AmbientLight = new AmbientLight("rgb(255,255,255)", 1);
// sunLight.castShadow = true;
// lightList.push(sunLight);





