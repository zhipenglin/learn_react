import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './style.css'

export default class extends PureComponent {
    static displayName = 'Loading';
    static propTypes = {
        /** class名 */
        className: PropTypes.string,
        /** 提示语 */
        text: PropTypes.string,
        /** 类型,可以为以下字符串中的一个： white，dark 如果不传或传入自负不能匹配以上任何一个值取默认值white*/
        type: PropTypes.string,
        /** 当前加载进度，从0-1 */
        progress:PropTypes.number
    };
    static defaultProps = {
        text: '',
        type: 'white',
        progress:50
    };

    render() {
        const {className, progress, text, type} = this.props;
        return (
            <div className={classnames("c-loading", className, {
                "c-loading--dark": type === 'dark'
            })}>
                <span className="c-loading__progress" style={{height:`${progress}%`,transform:`scaleY(${progress/100})`}}><i className="c-loading__wave"/></span>
                <div className="c-loading__text">{text}</div>
            </div>
        );
    }
}