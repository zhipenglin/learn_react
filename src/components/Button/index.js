import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './button.css'

export default class extends PureComponent {
    static displayName = 'Button';
    static propTypes = {
        /** class名 */
        className: PropTypes.string,
        /** 按钮是否禁用 */
        disabled: PropTypes.bool,
        /** 按钮点击回调 */
        onClick: PropTypes.func,
        /** 按钮类型，可以为以下字符串中的一个:primary dashed danger default，如果不传或传入自负不能匹配以上任何一个值取默认值default */
        type: PropTypes.oneOf(['primary', 'dashed', 'danger', 'default'])
    };
    static defaultProps = {
        type: 'default',
        disabled: false,
        onClick: () => {
        }
    };
    state = {
        hover: false,
        press: false
    };
    handlerMouseDown = () => {
        if (this.props.disabled) return;
        this.setState({press: true});
    };
    handlerMouseUp = () => {
        if (this.props.disabled) return;
        this.setState({press: false});
    };
    handlerMouseLeave = () => {
        if (this.props.disabled) return;
        this.setState({hover: false, press: false});
    };
    handlerMouseEnter = () => {
        if (this.props.disabled) return;
        this.setState({hover: true});
    };
    handlerClick = () => {
        if (this.props.disabled) return;
        const {onClick} = this.props;
        onClick();
    };

    render() {
        const {className, type, disabled, children} = this.props;
        return (
            <a className={classnames("c-button", className, {
                "c-button--hover": !disabled && this.state.hover,
                "c-button--press": !disabled && this.state.press,
                "disabled": disabled,
                "primary": type === 'primary',
                'dashed': type === 'dashed',
                'danger': type === 'danger'
            })} onMouseDown={this.handlerMouseDown}
               onMouseUp={this.handlerMouseUp} onMouseEnter={this.handlerMouseEnter}
               onMouseLeave={this.handlerMouseLeave} onClick={this.handlerClick}>{children}</a>
        );
    }
}