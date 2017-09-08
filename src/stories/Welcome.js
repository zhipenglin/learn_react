import React from 'react'
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

const Welcome=({showApp})=>{
    return (
        <div>
            欢迎
        </div>
    );
}

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);