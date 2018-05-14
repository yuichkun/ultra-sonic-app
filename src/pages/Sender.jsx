import React, { Component } from 'react';
import AudioManager from '../utils/AudioManager';

const config = {
    min: 200,
    max: 30000,
    initial: 20000
};

export default class Sender extends Component{
    state = {
        freq: config.initial,
        isPlaying: false
    }
    componentDidMount() {
        const audioManager = new AudioManager();
        this.signalGenerator = audioManager.createSignalGenerator();
        this.signalGenerator.setFreq(this.state.freq);
    }
    componentWillUnmount() {
        this.signalGenerator.terminate();
    }
    render(){
        console.log('Sender Status', this.state);
        return (
            <div style={{background: '#6696e4'}}>
                <h1>This is a Sender page</h1>
                <input type="range" value={this.state.freq} onChange={this.changeFreq.bind(this)} min={config.min} max={config.max}/>
                <button onClick={this.handleClick.bind(this)}>Play/Stop</button>
            </div>
        );
    }
    changeFreq(e) {
        const freq = e.target.value;
        this.setState({ freq });
        this.signalGenerator.setFreq(freq);
    }
    handleClick() {
        const { isPlaying } = this.state;
        if (isPlaying) {
            this.signalGenerator.stop();
        } else {
            this.signalGenerator.start();
        }
        this.setState({ isPlaying: !isPlaying });
    }
}