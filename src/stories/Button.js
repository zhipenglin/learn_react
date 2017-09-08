import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, select, boolean, number} from '@storybook/addon-knobs';

import Button from '../components/Button'
import LoadingButton from '../components/Button/LoadingButton'
import SwitchButton from '../components/Button/SwitchButton'

storiesOf('Button', module)
    .addDecorator(withKnobs)
    .add('普通按钮', withInfo()(() => <Button type={select('type', {
        default: "default",
        primary: "primary",
        dashed: "dashed",
        danger: "danger"
    }, "default")} disabled={boolean('disabled', false)}
                                          onClick={action('clicked')}>{text('children', '普通按钮')}</Button>))
    .add('加载按钮', withInfo()(()=><LoadingButton type={select('type', {
        default: "default",
        primary: "primary",
        dashed: "dashed",
        danger: "danger"
    }, "default")} loadingType={select('loadingType', {
        white: 'white',
        dark: "dark"
    }, 'dark')} onClick={({complete, nextTick}) => {
        action('start')();
        var progress=10;
        var timer=setInterval(() => {
            if(progress>100){
                clearInterval(timer);
                action('complete')();
            }
            progress+=1;
            nextTick(progress);
        }, number('loadingTime', 100));
    }}>{text('children', '点击加载')}</LoadingButton>))
    .add('切换按钮',withInfo()(()=><SwitchButton onChange={(value)=>{
        action('onChange')(value);
    }} openText={text('openText','')} closeText={text('closeText','')}/>))

