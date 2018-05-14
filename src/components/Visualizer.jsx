import React, { Component } from 'react';

export default class Visualizer extends Component {
    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const { data } = this.props;
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d'); 
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const unitWidth = canvas.width / data.length;
        for (let i = 0; i < data.length; i++) {
            const x = i * unitWidth; 
            const value = data[i] * -1;
            const y = value;
            ctx.fillStyle = "black";
            ctx.fillRect(x, y, 1, 1);
        }
    }
    render() {
        const { isDetected } = this.props;
        return (
            <div>
                <h3>Visualizer</h3>
                <canvas className={ isDetected ? 'detected' : null} ref="canvas"/>
            </div>
        );
    }
}