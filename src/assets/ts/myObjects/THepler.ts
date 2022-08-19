import { Object3D, AxesHelper, GridHelper, PointLight, PointLightHelper, SpotLightHelper } from 'three';
import {pointLight, spotLight} from "./Tlight"

export const helperList:Object3D[] = [];

const axesHelper:AxesHelper = new AxesHelper(500);
helperList.push(axesHelper);

const gridHelper:GridHelper = new GridHelper(500, 20, 'rgb(200, 200, 200)', 'rgb(100, 100, 100)');
// helperList.push(gridHelper);

const pointLightHepler: PointLightHelper = new PointLightHelper(pointLight,pointLight.distance, pointLight.color);

helperList.push(pointLightHepler);

const spotLightHepler:SpotLightHelper = new SpotLightHelper(spotLight,'rbg(0,0,255)');
helperList.push(spotLightHepler);