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
        this.audioManager = audioManager;
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
                {isDetected ? <Recognizer /> : null}
            </div>
        );
    }
    showLevelAt(freq) {
        if (this.analyser) {
            const binCount = this.analyser.frequencyBinCount;
            const index = freqToIndex(freq, binCount);
            const power = this.state.data[index];
            const isDetected = power > -90;
            this.setState({ isDetected });
            return power;
        }
    }
    componentWillUnmount() {
        this.analyser.disconnect();
        this.audioManager.terminate();
    }
}
function freqToIndex(freq, dataLength) {
    const nyquist = 44100 / 2;
    return Math.round(freq / nyquist * dataLength);
}

class Recognizer extends Component { 
    state = {
        result: 'default'
    }
    componentDidMount() { 
        this.resetRecognition();
    }
    componentWillUnmount() {
        console.log('disconnecting speech recognition');
    }
    resetRecognition() {
        const recognition = new window.webkitSpeechRecognition()
        recognition.lang = 'ja-JP';
        // recognition.interimResults = true;
        recognition.continuous = true;
        console.log('start recognition');
        recognition.start();
        recognition.onresult = (e) => { 
            const result = e.results[0][0].transcript;
            console.log('Result is ', result);
            this.setState(
                {
                    result
                }
            );
            this.resetRecognition();
        };
        this.recognition = recognition;
    }
    render() {
        return (
            <div>
                {this.state.result}
            </div>
        );
    }

}