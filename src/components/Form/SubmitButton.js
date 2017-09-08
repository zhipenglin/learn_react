import React,{PureComponent} from 'react'
import classnames from 'classnames'
import LoadingButton from '../Button/LoadingButton'
import submit from '../hoc/submit'
import './submit-button.css'

export default submit(class extends PureComponent{
    constructor(){
        super();
        this.handlerClick=this.handlerClick.bind(this);
    }
    handlerClick({complete,nextTick}){
        const {onClick}=this.props;
        onClick(complete);
    }
    render(){
        const {className,children}=this.props;
        return <LoadingButton type="primary" className={classnames('c-submit-button',className)} onClick={this.handlerClick}>{children}</LoadingButton>
    }
})