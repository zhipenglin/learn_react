import React,{PureComponent} from 'react'

export default class DisplayObject{
    static displayName='DisplayObject';
    static defaultProps={};
    constructor(ctx,el,props){
        this.ctx=ctx;
        this.el=el;
        this.props=Object.assign({},this.constructor.defaultProps,props);
        this.ready();
        this.paint();
    }
    ready(){}
    paint(){}
}