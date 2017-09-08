import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import field from '../hoc/field'
import fieldDecorator from '../hoc/fieldDecorator'

export const Input = fieldDecorator(class extends PureComponent {
    static defaultProps = {
        value: "",
        onBlur: () => {
        },
        onChange: () => {
        },
        type: 'text'
    };
    static propTypes = {
        value: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        type: PropTypes.oneOf(['text','password'])
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
        const {className, value, type, onBlur} = this.props;
        return (
            <input className={classnames("c-input", className)} type={type} value={value} onChange={this.handlerChange}
                   onBlur={onBlur}/>
        );
    }
});

export default field(Input);