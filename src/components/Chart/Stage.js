import React,{PureComponent} from 'react'
import classnames from 'classnames'
import raf from 'raf'
import findIndex from 'lodash/findIndex'
import AnimateObject from './AnimateObject'
import scrollRun from '../hoc/scrollRun'

//普通stage，立即执行图形渲染
export class Stage extends PureComponent{
    constructor(){
        super();
        this.isUnmount=false;
    }
    componentDidMount(){
        this.ctx=this.context=this.canvas.getContext('2d');
        this.paint();
    }
    componentDidUpdate(){
        this.paint();
    }
    componentWillUnmount(){
        this.isUnmount=true;
    }
    clean(){
        if(this.isUnmount){
            return;
        }
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    paint(){
        if(this.isUnmount){
            return;
        }
        const devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                this.ctx.mozBackingStorePixelRatio ||
                this.ctx.msBackingStorePixelRatio ||
                this.ctx.oBackingStorePixelRatio ||
                this.ctx.backingStorePixelRatio || 1,
            ratio = devicePixelRatio / backingStoreRatio;
        this.canvas.width=this.canvas.width*ratio;
        this.canvas.height=this.canvas.height*ratio;
        this.ctx.scale(ratio,ratio);
        this.ctx.translate(0.5,0.5);

        const {animateTime,children}=this.props;

        const list=React.Children.map(children,(item)=>{
            return new item.type(this.ctx,this.canvas,item.props);
        });
        let startTime=new Date();
        const tick=()=>{
            if(findIndex(list,(item)=>item instanceof AnimateObject&&item.props.duration>0&&!item.props.complete)<0){
                return;
            }
            this.clean();
            const currentTime=new Date()-startTime;
            list.forEach((item)=>{
                if(item instanceof AnimateObject&&item.props.duration){
                    item.setCurrentAnimateState(Math.max((currentTime-item.props.delay||0)/item.props.duration,0));
                }else{
                    item.paint();
                }
            });
            raf(()=>{
                tick();
            });
        };
        raf(tick);
    }
    render(){
        const {className,width,height}=this.props;
        return <canvas className={classnames(className)} ref={(el)=>this.canvas=el} width={width} height={height} />
    }
}
//当stage滚动到可视区，执行渲染，离开可视区后再次进入则重新渲染
export const StageScroll=scrollRun()(Stage)
//当stage滚动到可视区，执行渲染，只渲染一次
export default scrollRun({once:true})(Stage)