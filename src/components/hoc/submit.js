import React,{PureComponent} from 'react'

export default function(WrappedComponent){
    return class extends PureComponent{
        static displayName="Submit";
        constructor(){
            super();
            this.handlerClick=this.handlerClick.bind(this);
        }
        handlerClick(callback){
            const {onSubmit}=this.props;
            onSubmit(callback);
        }
        render(){
            const {...props}=this.props;
            return (
                <WrappedComponent {...props} onClick={this.handlerClick}/>
            );
        }
    }
}