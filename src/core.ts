import { AnimatedNode } from "./animation_sequence";

export interface AnimationDescriptor {
  keyframes: Keyframe[];
  duration: number;
}

const registeredAnimations: Map<string, () => AnimationDescriptor> = new Map();

export function registerAnimation(
  name: string,
  animationFunction: (...args: string[]) => AnimationDescriptor
) {
  registeredAnimations.set(name, animationFunction);
}

export function primeAnimations(root: HTMLElement) {
    const allAnimatedNodes = [];
    // Discovery.
    for (const element of root.querySelectorAll('[data-animation]')) {
        if (element instanceof HTMLElement) {
            allAnimatedNodes.push(new AnimatedNode(element));
        }
    }
    // Parsing.
    allAnimatedNodes.map(node => node.parseAttributes());
}