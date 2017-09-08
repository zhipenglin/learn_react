import React, {PureComponent} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, text, select, boolean, number} from '@storybook/addon-knobs';

import {StageScroll as Stage} from '../components/Chart/Stage'
import Triangle from '../components/Shape/Triangle'
import LinearGradient from '../components/Chart/LinearGradient'
import AgeBar from '../components/Shape/AgeBar'
import Text from '../components/Chart/Text'
import flatten from 'lodash/flatten'

class SampleChart extends PureComponent {
    constructor() {
        super();
        this.width = 400;
        this.height = 300;
    }

    renderChart() {
        const {yData, xData} = this.props, xUnit = this.width / xData.length, maxY = Math.max.apply(null, yData),
            yUnit = (this.height-60)/maxY,out={xAxis:[],yAxis:[]};

        for(let index=0;index<xData.length;index++){
            const fill = new LinearGradient(0, this.height - yUnit * yData[index]-40, 0, this.height);
            fill.addColorStop(0, '#14BEC8');
            fill.addColorStop(1, '#89DEE3');
            out.yAxis.push(<Triangle key={index} delay={300*index} fill={fill} text={`${yData[index]}个`} textColor="#14BEC8" x={xUnit*index} y={this.height-30-yUnit*yData[index]} width={xUnit} height={yUnit*yData[index]}/>);
            out.xAxis.push(<Text key={index} x={xUnit*(index+0.5)} y={this.height-6} font="12px" fill="#999" textAlign="center" text={xData[index]}/>);
        }
        return out;
    }

    render() {
        const {xAxis,yAxis}=this.renderChart();
        return <Stage width={this.width} height={this.height}>
            {yAxis}{xAxis}
        </Stage>
    }
}
class BarChart extends PureComponent{
    constructor() {
        super();
        this.width = 400;
        this.height = 300;
    }

    renderChart() {
        const {yData, xData} = this.props, xUnit = this.width / xData.length, maxY = Math.max.apply(null, yData),
            yUnit = (this.height-100)/maxY,out={xAxis:[],yAxis:[]};

        for(let index=0;index<xData.length;index++){
            const fill = new LinearGradient(0, this.height - yUnit * yData[index]-40, 0, this.height);
            fill.addColorStop(0, '#14BEC8');
            fill.addColorStop(1, '#89DEE3');
            out.yAxis.push(<AgeBar key={index} delay={300*index} fill={fill} text={`${yData[index]}个`} textColor="#fff" x={xUnit*index+20} y={this.height-30-yUnit*yData[index]} width={xUnit-40} height={yUnit*yData[index]}/>);
            out.xAxis.push(<Text key={index} x={xUnit*(index+0.5)} y={this.height-6} font="12px" fill="#999" textAlign="center" text={xData[index]}/>);
        }
        return out;
    }

    render() {
        const {xAxis,yAxis}=this.renderChart();
        return <Stage width={this.width} height={this.height}>
            {yAxis}{xAxis}
        </Stage>
    }
}
class MultChart extends PureComponent {
    constructor() {
        super();
        this.width = 500;
        this.height = 260;
    }

    renderChart() {
        const {yData, xData} = this.props, xUnit = this.width / xData.length, maxY = Math.max.apply(null, flatten(yData)),
            yUnit = (this.height-60)/maxY,out={xAxis:[],yAxis:[]};

        for(let index=0;index<xData.length;index++){
            yData[index].map((item,i)=>{
                const fill = new LinearGradient(0, this.height - yUnit * item - 80 * (yData[index].length-1 - i), 0, this.height - 40 * (yData[index].length-1 - i) + 100);
                fill.addColorStop(0, 'rgba(255,156,0,0.9)');
                fill.addColorStop(1, 'rgba(255,255,255,0.5)');
                out.yAxis.push(<Triangle key={`${index}-${i}`} delay={300*index} fill={fill} textColor="#14BEC8" x={xUnit*(index+(yData[index].length-1-i)*0.3)} y={this.height-30-yUnit*yData[index][i]} width={xUnit*0.4} height={yUnit*yData[index][i]}/>);
            });
            out.xAxis.push(<Text key={index} x={xUnit*(index+0.5)} y={this.height-6} font="12px" fill="#999" textAlign="center" text={xData[index]}/>);
        }
        return out;
    }

    render() {
        const {xAxis,yAxis}=this.renderChart();
        return <Stage width={this.width} height={this.height}>
            {yAxis}{xAxis}
        </Stage>
    }
}

storiesOf('Chart', module)
    .addDecorator(withKnobs)
    .add('图表', withInfo()(() => <div>
        <h1>图表一</h1>
        <SampleChart yData={[4,5,7,3]} xData={['2013','2014','2015','2017']} />
        <h1>图表二</h1>
        <div style={{height:40}}></div>
        <BarChart yData={[4,5,7,3]} xData={['2013','2014','2015','2017']} />
        <h1>图表三</h1>
        <MultChart yData={[[5,2,3],[20,34,34],[34,45,23],[2,34,45]]} xData={['2013','2014','2015','2017']} />
    </div>));
