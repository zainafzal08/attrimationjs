import {registerAnimation} from './core';
import {BUILT_IN_ANIMATIONS} from './built_in_animations';

for (const animation of BUILT_IN_ANIMATIONS) {
    registerAnimation(animation.name, (duration:string) => ({
        keyframes: animation.keyframes,
        duration: Number(duration)
    }));
}

export {
    registerAnimation
}