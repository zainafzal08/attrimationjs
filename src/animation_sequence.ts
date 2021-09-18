export class AnimatedNode {
    constructor(private readonly domReference: HTMLElement) {}

    parseAttributes() {
        const animationDefinition = this.domReference.dataset.animation;
    }
}