import DisplayObject from '../Chart/AnimateObject'
import Path from '../Chart/Path'
import Image from '../Chart/Image'
import people from './people.svg'
import Text from '../Chart/Text'
import Color from '../Chart/Color'
import Util from '../Util'

export default class extends DisplayObject{
    static defaultProps={
        x:0,
        y:0,
        width:0,
        height:0,
        fill:'#000',
        textColor:'#000',
        text:''
    };
    paint(){
        const {x,y,width,r,fill,height,animateState,textColor,text}=this.props,pepoleW=48/2,pepoleH=93/2,animate=this.constructor.tween.easeInOutSine(animateState);
        const animateHeight=height*(1-animate);
        new Path(this.ctx,this.el,{
            d:`M${x} ${y+height} L${x} ${y} L${x} ${animateHeight+y} L${x+width} ${animateHeight+y} L${x+width} ${y+height}Z`,
            fill:typeof fill==='string'||fill.get(this.ctx)
        });
        new Image(this.ctx,this.el,{
            src:people,width:pepoleW,height:pepoleH,x:x+width/2-pepoleW/2,y:y-pepoleH+animateHeight
        });

        const color=Color.toRgb(textColor);
        new Text(this.ctx,this.el,{
            text:text,x:x+width/2,y:y+animateHeight+16,textAlign:'center',font:'10px',
            fill:`rgba(${color[0]},${color[1]},${color[2]},${Util.toFixed(animate,3)})`
        });
    }
}