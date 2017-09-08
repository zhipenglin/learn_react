import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class extends PureComponent {
    static displayName = "Form";
    static defaultProps = {
        onSubmit: () => {
        }
    };
    static propTypes={
        /** 表单提交时触发此方法 */
        onSubmit:PropTypes.func
    };

    state = {
        data: {}
    };

    constructor() {
        super();
        this.handlerDataChange = this.handlerDataChange.bind(this);
        this.handlerValidateChange = this.handlerValidateChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.fieldList = {};
        this.validateInfo = {};
    }

    handlerDataChange(name, value) {
        this.setState({data: Object.assign({}, this.state.data, {[name]: value})});
    }

    handlerValidateChange(name, validateRes) {
        this.validateInfo[name] = validateRes;
    }

    handlerSubmit(callback) {
        let isPass = true;
        for (let name in this.fieldList) {
            if (!this.fieldList.hasOwnProperty(name)) return;
            if (this.validateInfo[name] === false) {
                isPass = false;
            }
            if (this.validateInfo[name] === undefined && !this.fieldList[name].validateChange(this.state.data[name])) {
                isPass = false;
            }
        }
        if (!isPass) {
            callback();
            return;
        }
        const {onSubmit} = this.props;
        onSubmit(this.state.data, callback);
    }

    mapChildren(children) {
        return React.Children.map(children, (item) => {
            if (React.isValidElement(item)) {
                if (item.type.displayName === 'Field' && item.props.name) {
                    return React.cloneElement(item, {
                        ref: (component) => this.fieldList[item.props.name] = component,
                        data: this.state.data,
                        onDataChange: this.handlerDataChange,
                        onValidateChange: this.handlerValidateChange
                    });
                } else if (item.type.displayName === 'Submit') {
                    return React.cloneElement(item, {
                        onSubmit: this.handlerSubmit
                    });
                } else if (React.Children.count(item.props.children)) {
                    return React.cloneElement(item, {children: this.mapChildren(item.props.children)});
                } else {
                    return item;
                }
            } else {
                return item;
            }
        });
    }

    render() {
        const {className, children} = this.props;
        return (
            <div className={classnames("c-form", className)}>{this.mapChildren(children)}</div>
        );
    }
}