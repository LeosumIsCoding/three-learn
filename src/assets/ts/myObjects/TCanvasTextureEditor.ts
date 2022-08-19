export class TCanvasTextureEditor{
    canvas:HTMLCanvasElement;

    constructor(width:number = 512, height:number = 512){
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
    }

    draw (fun: ( ctx: CanvasRenderingContext2D)=> void): this{
        const ctx = this.canvas.getContext('2d');
        if(ctx){
            fun(ctx);
            return this;
        } else{
            console.warn("not support canvas 2d");
            return this;
        }
    }

    preview(): this {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '5%';
        this.canvas.style.left = '5%';
        document.body.appendChild(this.canvas);
        return this;
    }

}