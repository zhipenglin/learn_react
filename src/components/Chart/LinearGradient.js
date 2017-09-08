export default class LinearGradient{
    constructor(x0,y0,x1,y1){
        this.x0=x0;
        this.y0=y0;
        this.x1=x1;
        this.y1=y1;
        this.colorStopList=[];
    }
    addColorStop(stop,color){
        this.colorStopList.push({stop,color});
    }
    get(ctx){
        const linearGradient=ctx.createLinearGradient(this.x0,this.y0,this.x1,this.y1);
        this.colorStopList.forEach(({stop,color})=>{
            linearGradient.addColorStop(stop,color);
        });
        return linearGradient;
    }
}