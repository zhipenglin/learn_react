import React,{PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './field-decorator.css'

export default function(WrappedComponent){
    return class extends PureComponent{
        static defaultProps={
            errorState:0,
            errorMsg:''
        };
        static propTypes={
            label:PropTypes.string.isRequired,
            errorState:PropTypes.number,
            errorMsg:PropTypes.string
        };
        render(){
            const {className,label,errorState,errorMsg,...props}=this.props;
            return (
                <div className={classnames("c-field-decorator",className)}>
                    <div className="c-field-decorator__inner">
                        <div className="c-field-decorator__label">{label}:</div>
                        <div className="c-field-decorator__main">
                            <WrappedComponent className={classnames("c-field-decorator__field",{
                                "c-field-decorator__field--error":errorState===2
                            })}  {...props}/>
                            {errorState===1?<i className="c-field-decorator__pass"></i>:null}
                        </div>
                    </div>
                    {errorState===2?<div className="c-field-decorator__msg">{errorMsg}</div>:null}
                </div>
            );
        }
    };
}