import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Button from './index'
import classnames from 'classnames'
import './switch-button.css'

export default class extends PureComponent {
    static displayName = 'SwitchButton';
    static defaultProps = {
        open:true,
        disabled:false,
        openText:'',
        closeText:'',
        onChange: () => {
        }
    };
    static propTypes = {
        /** 初始状态是否为开*/
        open:PropTypes.bool,
        /** 按钮开状态文案*/
        openText:PropTypes.string,
        /** 按钮关状态文案*/
        closeText:PropTypes.string,
        /** 组件是否被禁用*/
        disabled:PropTypes.bool,
        /** 点击切换时回调函数*/
        onChange: PropTypes.func
    };
    state = {
        isOpen: true
    };

    constructor() {
        super();
        this.handlerClick = this.handlerClick.bind(this);
    }

    componentWillUnmount(){
        const {open}=this.props;
        this.setState({isOpen:open});
    }

    handlerClick() {
        const {onChange} = this.props;
        this.setState({isOpen: !this.state.isOpen}, () => {
            onChange(this.state.isOpen);
        });
    }

    render() {
        const {className, openText, closeText, disabled} = this.props;
        return (
            <Button className={classnames("c-switch-button", {
                "c-switch-button--open": this.state.isOpen,
            }, className)} disabled={disabled} onClick={this.handlerClick}>
                {disabled?null:(this.state.isOpen ? <span className="c-switch-button__text-open">{openText}</span> :
                    <span className="c-switch-button__text-close">{closeText}</span>)}
            </Button>
        );
    }
}