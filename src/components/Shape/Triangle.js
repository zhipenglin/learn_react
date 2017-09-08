import DisplayObject from '../Chart/AnimateObject'
import Path from '../Chart/Path'
import Text from '../Chart/Text'
import Color from '../Chart/Color'
import Util from '../Util'

export default class extends DisplayObject{
    static defaultProps={
        x:0,
        y:0,
        width:0,
        height:0,
        r:4,
        fill:'#000',
        textColor:'#000',
        text:''
    };
    paint(){
        const {x,y,width,r,fill,height,animateState,textColor,text}=this.props,animate=this.constructor.tween.easeInOutSine(animateState);
        const animateHeight=height*(1-animate),dy=2*r*height*animate/width;
        const left={
            x:x+width/2-r,
            y:y+animateHeight+dy
        },right={
            x:x+width/2+r,
            y:y+animateHeight+dy
        };
        new Path(this.ctx,this.el,{
            d:`M${x} ${y+height} L${left.x} ${left.y} Q${x+width/2} ${animateHeight+y} ${right.x} ${right.y} L${right.x} ${right.y} L${x+width} ${y+height}Z`,
            fill:typeof fill==='string'||fill.get(this.ctx)
        });
        const color=Color.toRgb(textColor);
        text&&new Text(this.ctx,this.el,{
            text:text,x:x+width/2,y:y-10,textAlign:'center',
            fill:`rgba(${color[0]},${color[1]},${color[2]},${Util.toFixed(animate,3)})`
        });
    }
}