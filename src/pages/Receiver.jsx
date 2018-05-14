import React, { Component } from 'react';
import AudioManager from '../utils/AudioManager';
import Visualizer from '../components/Visualizer'

export default class Receiver extends Component {
    state = {
        data: [],
        isDetected: false
    }
    constructor(props) {
        super(props);
        this.analyse = this.analyse.bind(this);
    }
    async componentDidMount() {
        const audioManager = new AudioManager();
        this.analyser = await audioManager.createAnalyser();
        this.state.data = new Float32Array(this.analyser.frequencyBinCount);
        requestAnimationFrame(this.analyse);
    }
    analyse() {
        this.analyser.getFloatFrequencyData(this.state.data);
        this.showLevelAt(20000);
        requestAnimationFrame(this.analyse);
    }
    render() {
        const { isDetected, data } = this.state;
        return (
            <div>
                <h1>This is a Receiver page</h1>
                <Visualizer isDetected={isDetected} data={data} />
            </div>
        );
    }
    showLevelAt(freq) {
        if (this.analyser) {
            const binCount = this.analyser.frequencyBinCount;
            const index = freqToIndex(freq, binCount);
            const power = this.state.data[index];
            const isDetected = power > -60;
            this.setState({ isDetected });
            return power;
        }
    }
    componentWillUnmount() {
        this.analyser.disconnect();
    }
}
function freqToIndex(freq, dataLength) {
    const nyquist = 44100 / 2;
    return Math.round(freq / nyquist * dataLength);
}