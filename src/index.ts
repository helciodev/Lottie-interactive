import Lottie, { LottiePlayer } from 'Lottie-web'
import { BaseInteraction } from "./interactions/base-interaction";
import { Hover } from './interactions/hover'
import { Click } from "./interactions/click";
import {Morph} from "./interactions/morph";
import {Switch} from "./interactions/switch";
import {PlayOnShow} from "./interactions/play-on-show";

const styling = `
  :host {
    // width: 100px;
    // height: 100px;
    justify-content: center;
    align-items: center;
    display: inline-flex;
  }
  div {
    width: 100%;
    height: 100%;
  }
`;

class LottieInteractive extends HTMLElement {
    public path: string;
    public lottie: LottiePlayer;

    private playOnce: boolean = false;
    private interaction: String;
    private loop: boolean = false;
    private autoplay: boolean = false;
    private reset: boolean = false;

    private interactions: Array<BaseInteraction> = new Array<BaseInteraction>();
    public readonly element: HTMLElement;
    private animationContainer: HTMLElement;

    constructor() {
        super();

        this.element = this;
        this.initShadowRoot();
        this.checkAttributes();
        this.loadAnimation(this.path, this.animationContainer);
        this.initInteractions();
    };

    // Add interactions to an array
    private initInteractions() {
        this.interactions.push(new Hover(this.lottie, this.animationContainer));
        this.interactions.push(new Click(this.lottie, this.animationContainer));
        this.interactions.push(new Morph(this.lottie, this.animationContainer));
        this.interactions.push(new Switch(this.lottie, this.animationContainer));
        this.interactions.push(new PlayOnShow(this.lottie, this.animationContainer));

        for (let i = 0; i < this.interactions.length; i++) {
            if (this.interactions[i].interactionType === this.interaction) {
                this.interactions[i].active = true;
                this.interactions[i].reset = this.reset;
                this.interactions[i].playOnce = this.playOnce;
            }
        }
    }

    // Create a map of attributes and their expected values
    // Check in loop
    private checkAttributes() {
        this.path = this.getAttribute('path');
        this.interaction = this.getAttribute('interaction');

        if (this.getAttribute('play-once') === 'true') {
            this.playOnce = true;
        }
        if (this.getAttribute('reset') === 'true') {
            this.reset = true;
        }
        if (this.getAttribute('loop') === 'true') {
            this.loop = true;
        }
        if (this.getAttribute('autoplay') === 'true') {
            this.autoplay = true;
        }
    }

    private initShadowRoot() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');

        style.innerHTML = styling;
        shadowRoot.appendChild(style);
        this.animationContainer = document.createElement('div');
        shadowRoot.appendChild(this.animationContainer);
    }

    loadAnimation(path: string, container: Element) {
        this.lottie = Lottie.loadAnimation({
            container: container, // the dom element that will contain the animation
            renderer: 'svg',
            loop: this.loop,
            autoplay: this.autoplay,
            path: path // the path to the animation json
        });
    }
}

customElements.define('lottie-interactive', LottieInteractive);

export default LottieInteractive;
