import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, select, boolean, number} from '@storybook/addon-knobs';

import Form from '../components/Form'
import Input from '../components/Form/Input'
import Select from '../components/Form/Select'
import SubmitButton from '../components/Form/SubmitButton'

storiesOf('Form', module)
    .addDecorator(withKnobs)
    .add('基本表单', withInfo()(() => <Form onSubmit={(data,complete)=>{
        complete();
        action('submit')(data);
    }}>
        <Input name="user_name" label="用户名" rule={/^[a-zA-Z]{3,6}$/}/>
        <Input name="pwd" label="密码" rule={/^\d{6,12}$/}/>
        <Select name="degree" label="学历" rule={(value)=>value!==''}>
            <option value="1">硕士</option>
            <option value="2">本科</option>
            <option value="3">专科</option>
        </Select>
        <SubmitButton>提交</SubmitButton>
    </Form>))
