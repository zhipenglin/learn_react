import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import fieldDecorator from '../hoc/fieldDecorator'
import field from '../hoc/field'

export const Select = fieldDecorator(class extends PureComponent {
    static defaultProps = {
        value: '',
        onBlur: () => {
        },
        onChange: () => {
        },
        defaultText: '请选择',
        defaultValue: ''
    };
    static propTypes = {
        value: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        defaultText: PropTypes.string,
        defaultValue: PropTypes.string
    };

    constructor() {
        super();
        this.handlerChange = this.handlerChange.bind(this);
    }

    handlerChange(e) {
        const {onChange} = this.props;
        onChange(e.target.value);
    }

    render() {
        const {className, defaultText, defaultValue, value, onBlur, children} = this.props;
        return (
            <select className={classnames("c-select", className)} onBlur={onBlur} value={value}
                    onChange={this.handlerChange}>
                <option value={defaultValue}>{defaultText}</option>
                {children}
            </select>
        );
    }
});

export default field(Select);