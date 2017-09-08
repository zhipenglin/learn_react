import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export default function (WrappedComponent) {
    return class Field extends PureComponent {
        static displayName = "Field";
        static defaultProps = {
            rule: /.*/
        };
        static propTypes = {
            rule:PropTypes.oneOfType([PropTypes.instanceOf(RegExp),PropTypes.func]),
            data:PropTypes.object,
            onValidateChange:PropTypes.func,
            label:PropTypes.string.isRequired,
            name:PropTypes.string.isRequired
        };
        state = {
            errorState: 0,
            errorMsg: ''
        };

        constructor() {
            super();
            this.handlerChange = this.handlerChange.bind(this);
            this.validateChange = this.validateChange.bind(this);
        }

        componentDidMount() {
            const {value} = this.props;
            this.handlerChange(value);
        }

        validate(value) {
            const {rule} = this.props;
            if(rule instanceof RegExp){
                return rule.test(value);
            }else if(typeof rule==='function'){
                return rule(value);
            }
        }

        validateChange() {
            const {name, data, onValidateChange, label} = this.props, value = data[name], res = this.validate(value);
            if (res) {
                this.setState({errorState: 1, errorMsg: ''});
            } else {
                this.setState({errorState: 2, errorMsg: `${label}校验失败`});
            }
            onValidateChange(name, res);
            return res;
        }

        handlerChange(value) {
            const {name, onDataChange} = this.props;
            onDataChange(name, value);
        }

        render() {
            const {name, data, rule, onDataChange, ...props} = this.props;
            return <WrappedComponent {...props} value={data[name]} errorState={this.state.errorState}
                                     errorMsg={this.state.errorMsg}
                                     onChange={this.handlerChange} onBlur={this.validateChange}/>
        }
    }
}