import React from 'react'
import DisplayObject from './DisplayObject'

export default class extends DisplayObject {
    static defaultProps = {
        sx: 0,
        sy: 0,
        x: 0,
        y: 0
    };

    paint() {
        const {src, sx, sy, swidth, sheight, x, y, width, height} = this.props;
        const image = new Image();
        image.src = src;
        if (swidth && sheight) {
            this.ctx.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
        } else {
            this.ctx.drawImage(image, x, y, width, height);
        }
    }
}