import {Texture, TextureLoader} from "three"
import headimg from "../../photo/headimg.jpg"


const textureLoader:TextureLoader = new TextureLoader();

export const headimgTexture: Texture = textureLoader.load(headimg);

