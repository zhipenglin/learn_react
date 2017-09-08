import React from 'react';
import {storiesOf} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, select, boolean} from '@storybook/addon-knobs';

import Loading from '../components/Loading'

storiesOf('Loading', module)
    .addDecorator(withKnobs)
    .add('加载提示', withInfo()(() => <div style={{position:'relative',width:'200px',height:'200px',background:'#eee'}}><Loading text={text("text","正在加载中...")} type={select('类型',{
        white:'white',
        dark:"dark"
    },"white")} /></div>))
