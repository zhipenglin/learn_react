import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Button from './index'
import Loading from '../Loading'
import './loading-button.css'

export default class extends PureComponent {
    static displayName = 'LoadingButton';
    static propTypes = {
        /** class名 */
        className: PropTypes.string,
        /** 按钮在加载过程中的提示文案 */
        loadingText: PropTypes.string,
        /** 按钮类型，参照Button组件的type配置 */
        type: PropTypes.string,
        /** 加载曾样式类型，参照Loading组件的type配置 */
        loadingType: PropTypes.string,
        /** 按钮点击回调 */
        onClick: PropTypes.func
    };
    static defaultProps = {
        loadingText: '正在加载中',
        loadingType: 'dark',
        onClick: () => {
        }
    };
    state = {
        loadingText: '',
        progress: 100
    };

    constructor() {
        super();
        this.isUnmount = false;
    }

    handlerClick = () => {
        const {onClick} = this.props;
        this.setState({progress: 0});
        onClick({complete: this.complete, nextTick: this.nextTick});
    };
    complete = () => {
        if (this.isUnmount) return;
        this.setState({progress: 100});
    };
    nextTick = (progress) => {
        if (this.isUnmount) return;
        if (typeof progress === 'number') {
            this.setState({progress: Math.min(100, progress)});
        } else {
            this.setState({loadingText: progress.toString()});
        }
    };

    componentWillUnmount() {
        this.isUnmount = true;
    }

    render() {
        const {className, loadingText, type, loadingType, children} = this.props;
        let isLoading = this.state.progress < 100, text = this.state.loadingText || loadingText;
        return <Button className={classnames(className, 'c-loading-button', {
            'c-loading-button--loading': isLoading
        })} disabled={isLoading} onClick={this.handlerClick} type={type}>
            <span className="c-loading-button__text">{isLoading ? text || loadingText : children}</span>
            {isLoading ?
                <Loading type={loadingType} progress={this.state.progress} text={text}/> : null}
        </Button>
    }
}