
// Create a new instance of an audio object and declare some of its properties
var audio = new Audio();
audio.src = 'parov.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = true;


// All vars for analyser
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

// When the window will load, init the mp3 player
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
    document.body.appendChild(audio);
    context = new webkitAudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById('analyser_render');
    ctx = canvas.getContext('2d');
    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
}

// Create a "frameLooper" function to animate our graphics to the audio frequency
// Looping at browser's default fps (approx. 60 FPS)
function frameLooper(){
    window.webkitRequestAnimationFrame(frameLooper); // Request animation on ctx
    fbc_array = new Uint8Array(analyser.frequencyBinCount); // Frequency bin count = FFT/2 (min = 32)
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = '#00CCFF'; // Color of the bars
    bars = 100; // num of bars
    for (var i = 0; i < bars; i++) {
        bar_x = i * 3;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        // ctx.fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}