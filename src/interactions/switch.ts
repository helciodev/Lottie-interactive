import {LottiePlayer} from "Lottie-web";
import {BaseInteraction} from "./base-interaction";
import {InteractionType} from "./interaction-type";

export class Switch extends BaseInteraction {
    private direction: number = -1;

    constructor(player: LottiePlayer, element: HTMLElement) {
        super(player, element);

        this.interactionType = InteractionType.Switch;
        this.initListener();
    }

    private initListener(): void {
        this.element.addEventListener('click', this.playOnClick.bind(this));
    }

    public removeListener(): void {
        this.element.removeEventListener('click', this.playOnClick.bind(this));
    }

    private playSwitchAnimation(): void {
        if (this.direction === -1)
        {
            this.direction = 1;
            this.playing = true;
            this.lottiePlayer.setDirection(this.direction);
            this.lottiePlayer.goToAndPlay(0, true);
        } else if (this.direction === 1) {
            this.direction = -1;
            this.playing = true;
            this.lottiePlayer.setDirection(this.direction);
            this.lottiePlayer.play();
        }
    }

    public playOnClick(): void {
        if (this.active)
        {
            if (this.playOnce && !this.played) {
                this.playSwitchAnimation();
                this.played = true;
            } else if (!this.playOnce) {
                this.playSwitchAnimation();
            }
        }
    }
}
