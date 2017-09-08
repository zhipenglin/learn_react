import DisplayObject from './DisplayObject'

export default class Text extends DisplayObject{
    static defaultProps={
        font:'14px Arial',
        lineHeight:1.5,
        maxRow:1,
        text:''
    };
    static computedTextWidth(text='',maxWidth,maxRow=1){
        if(document){
            const span=document.createElement('span'),textArray=text.split('');
            span.setAttribute('style','position: absolute;z-index: -1;top:0;');
            document.body.appendChild(span);
            let textCache='',row=1;
            const core=(text)=>{
                let index=0;
                span.innerText='';
                while (span.offsetWidth<=maxWidth&&index<text.length){
                    span.innerText=text.slice(0,index);
                    textCache+=text.charAt(index);
                    index++;
                }
                if(index<text.length){
                    if(row<maxRow){
                        row+=1;
                        textCache+='\n';
                        core(text.slice(index));
                    }else{
                        textCache=textCache.slice(0,-2);
                        textCache+='...';
                    }
                }
            };
            core(text);
            document.body.removeChild(span);
            return textCache;
        }
    }
    ready(){
        super.ready();
        const {text,maxWidth,maxRow}=this.props;
        if(!this.props.fontHeight){
            this.props.fontHeight=this.props.font.match(/(\d+)px/)[1]*this.props.lineHeight;
        }
        if(maxWidth){
            this.props.text=this.constructor.computedTextWidth(text,maxWidth,maxRow);
        }
    }
    paint(){
        const {x,y,text,fill,font,textAlign,stroke,strokeWidth,fontHeight}=this.props;
        this.ctx.save();
        this.ctx.font=font;
        if(textAlign){
            this.ctx.textAlign=textAlign;
        }
        text.toString().split('\n').forEach((text,index)=>{
            if(fill){
                this.ctx.fillStyle=fill;
                this.ctx.fillText(text,x,y+index*fontHeight);
            }

            if(stroke||strokeWidth){
                this.ctx.strokeStyle=stroke||'#000';
                this.ctx.lineWidth=strokeWidth||1;
                this.ctx.strokeText(text,x,y);
            }
        });

        this.ctx.restore();
    }
}