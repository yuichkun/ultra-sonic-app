import SignalGenerator from './SignalGenerator';

export default class AudioManager {
    constructor() {
        console.log('Initialized Audio Manager');
        this.context = new AudioContext();
    }
    createSignalGenerator() {
        console.log("Created: Signal Generator");
        return new SignalGenerator(this.context);
    }
    createAnalyser() {
        return new Promise((resolve, reject) => {
            console.log("Created: Analyser Node");
            const analyser = this.context.createAnalyser();
            // analyser.fftSize = 32768;
            analyser.fftSize = 1024;
            analyser.minDecibels = -90;
            analyser.maxDecibels = -10;
            navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false
                })
                .then((stream) => {
                    console.log("Start Streaming Microphone Input");
                    const inputSource = this.context.createMediaStreamSource(stream);
                    inputSource.connect(analyser);
                    resolve(analyser);
                    // setTimeout(()=>{resolve(analyser);}, 5000);
                });
        });
    }
    terminate() {
        this.context.close();
    }
}