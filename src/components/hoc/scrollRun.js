import React,{PureComponent} from 'react'

export default (options)=>(Component)=>{
    options=Object.assign({},{
        once:false
    },options);
    return class extends PureComponent{
        state={
            isRender:false
        };
        constructor(){
            super();
            this.handlerScroll=this.handlerScroll.bind(this);
        }
        componentDidMount(){
            window.addEventListener('scroll',this.handlerScroll);
            this.handlerScroll();
        }
        componentWillUnmount(){
            window.removeEventListener('scroll',this.handlerScroll);
        }
        handlerScroll(){
            const {height}=this.props;
            const top=this.el.getBoundingClientRect().top;
            if(top-document.documentElement.clientHeight<0&&top+height>0){
                if(options.once){
                    window.removeEventListener('scroll',this.handlerScroll);
                }
                this.setState({isRender:true});
            }else{
                this.setState({isRender:false});
            }
        }
        render(){
            const {className,width,height,...args}=this.props;
            return (
                <div ref={(el)=>this.el=el}>
                    {this.state.isRender?<Component {...args} width={width} height={height} className={className}/>:<canvas width={width} height={height} className={className}/>}
                </div>
            );
        }
    }
}