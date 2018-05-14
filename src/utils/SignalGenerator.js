export default class SignalGenerator {
    constructor(context) {
        console.log("Create Oscillator Node");
        const osc = context.createOscillator();
        console.log("Create Gain Node");
        const gainNode = context.createGain();
        console.log("OSC ==> Gain");
        osc.connect(gainNode);
        console.log("Gain ==> Destination");
        gainNode.connect(context.destination);
        console.log("Set Gain to 0");
        gainNode.gain.setValueAtTime(0, context.currentTime);
        console.log("Start Playing Osc");
        osc.start();

        this.context = context;
        this.osc = osc;
        this.gainNode = gainNode;
    }
    start() {
        console.log("Set Gain to 1.0");
        this.gainNode.gain.linearRampToValueAtTime(1.0, this.context.currentTime +2);
    }
    stop() {
        console.log("Set Gain to 0.0");
        this.gainNode.gain.linearRampToValueAtTime(0.0, this.context.currentTime +2);
    }
    setFreq(freq) {
        this.osc.frequency.value = freq;
    }
    terminate() {
        this.stop();
        this.osc.disconnect();
        this.gainNode.disconnect();
    }
}