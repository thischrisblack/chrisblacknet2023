/**
 * From #controls
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: url(images/static-light.gif);
    background-size: 1500px;
 * 
 * From #timer
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: url(images/static-contrast.gif);
    background-size: 35%;

 * From #progress-bar
    background-image: url(images/static-contrast.gif);
    background-size: cover;
 */

const audioPlayerStyles = `
#controls {
    font-weight: 400;
    cursor: pointer;
    padding: 0;

    svg {
        margin: 0 4px 0 0px;
    }

    &:hover {
        color: var(--link);

        svg {          
                fill: var(--link);
        }
    }
}

#timer {
    font-size: 90%;
    font-weight: 400;
    margin-left: 1.2rem;
    padding: 0;
}

#progress-bar {
    background: black;
    width: 0%;
    height: 2px;
    display: block;
    margin-bottom: 0.35rem;
}`;

const playIcon = `
<svg width="16" height="16" fill="#000" viewBox="0 0 22 18">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.25 12L5.75 5.75V18.25L18.25 12Z"></path>
</svg>
`;

const stopIcon = `
<svg width="16" height="16" fill="#000" viewBox="0 0 22 18">
  <rect width="12.5" height="12.5" x="5.75" y="5.75" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" rx="1"></rect>
</svg>
`;

const formatTime = (time) => {
    const roundedSeconds = Math.floor(time);
    const minutes = Math.floor(roundedSeconds / 60);
    const seconds = roundedSeconds % 60;
    const result = minutes + ':' + seconds.toString().padStart(2, '0');
    return result;
};

class AudioPlayer extends HTMLElement {
    static get observedAttributes() {
        return ['src', 'name'];
    }

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = audioPlayerStyles;
        shadowRoot.appendChild(style);

        const controls = document.createElement('span');
        controls.id = 'controls';
        shadowRoot.appendChild(controls);
        controls.addEventListener('pointerup', this.playOrPauseAudio);
        this.controls = controls;

        const timer = document.createElement('span');
        timer.id = 'timer';
        shadowRoot.appendChild(timer);
        this.timer = timer;

        const progressBar = document.createElement('div');
        progressBar.id = 'progress-bar';
        shadowRoot.appendChild(progressBar);
        this.progressBar = progressBar;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src') {
            this.initializeAudioPlayer(newValue);
        }
        if (name === 'name') {
            this.controls.innerHTML = playIcon + newValue;
            this.controls.title = `Play ${newValue}`;
        }
    }

    initializeAudioPlayer = (src) => {
        const player = document.createElement('audio');

        const source = document.createElement('source');
        source.src = src;
        source.type = 'audio/mpeg';

        player.appendChild(source);
        this.appendChild(player);

        player.addEventListener('canplay', () => {
            this.duration = player.duration;
            this.player = player;
            this.timer.textContent = `${formatTime(0)} / ${formatTime(this.duration)}`;
        });
        player.addEventListener('timeupdate', this.updateTime);
        player.addEventListener('ended', this.resetAudio);
        player.addEventListener('error', () => {
            this.controls.textContent = 'ERROR :(';
        });
    };

    playOrPauseAudio = () => {
        if (this.player.paused) {
            this.player.play();
            this.controls.innerHTML = this.controls.innerHTML.replace(playIcon, stopIcon);
        } else {
            this.player.pause();
            this.controls.innerHTML = this.controls.innerHTML.replace(stopIcon, playIcon);
        }
    };

    updateTime = () => {
        this.timer.textContent = `${formatTime(this.player.currentTime)} / ${formatTime(this.duration)}`;
        this.percent = (this.player.currentTime / this.duration) * 100;
        this.progressBar.style.width = `${this.percent}%`;
    };

    resetAudio = () => {
        this.player.pause();
        this.controls.innerHTML = this.controls.innerHTML.replace(stopIcon, playIcon);
        this.player.currentTime = 0;
        // This is redundant but let's be redundant.
        this.progressBar.style.width = '0%';
    };
}

customElements.define('audio-player', AudioPlayer);
