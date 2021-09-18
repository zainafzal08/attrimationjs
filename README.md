# Attrimation.js

A simple yet powerful animation library. This leverages html as your source
of truth for how things should look, animate and behave and cuts out the 
complexity of more more advanced integrated animation solutions. The idea is
that this can be dropped into a simple html web page to add a splash of 
life without requiring a complex pipeline.

Partially inspired by alpinejs <3

## Using The Animations Library

#### Quick Start.

You can apply one of the built in animations by simply specifying
`data-animation` on a element. Then in your page run `primeAnimations` with your
document body. This will find all elements with animations and run them.

```
<div data-animation="fade-in"> Hello World </div>
<script src="path/to/attrimation.min.js"></script>
<script>
    primeAnimations(document.body);
</script>
```

#### data-animation

`data-animation` takes in a animation definition string which has it's own
syntax allowing you to supply multiple animations, tweak their options and
control their ordering. See below for the full feature set.

**Chaining**

To run two animations in sequence use the `|` operator i.e

```
data-animation="fade_in|rotate|fade_out"
```

This will run the fade_in animation, wait for it to complete, then the rotate
animation, wait for it to complete etc.

**Options**

You can supply paramaters to each animation as if it was a function you were
calling using the `:param1,param2` syntax i.e

```
data-animation="fade_in:1.5"
```

The above with run the fade_in animation for 1.5 second as fade_in takes in a duration
override as it's first param. See the [built in animations](#built-in-animations)
section for the options all the built in animations support.

**Grouping**

Sometimes you want to run multiple animations in tandem, you can do so by
wrapping animations in brackets and seperating them with `;`'s.

```
data-animation="(fade_in;rotate)"
```

The above will run fade_in _and_ rotate at the same time, any further chained
animations after this will only run when both animations have completed.

#### data-trigger

By default animations on nodes will trigger as soon as you call primeAnimations
and the element is picked up by attrimationjs. However sometimes you want to 
hold an animation until the right time. `data-trigger` allows you to do so by 
specifying what action will trigger the element to begin it's animation.

**instant**

The default behavior. Run the animations as soon as attrimationjs knows about
it.

data-trigger="instant"

**scroll**

Run the animation once the element is scrolled onto screen. This is the same as
`instant` when the element starts out on screen. Note that the animation will
wait until the element is fully visible on screen before starting the animation.
It does this by getting the elements bounding rect at discovery time, as such
if your element grows/shrinks between attrimationjs discovering the element
and the animation starting it may trigger weirdly.

```
data-trigger="scroll"
```

**finished**

Run the animation once another element has finished, you do this by specifing
a query string that attrimation can query to find the element you are refering
to.

```
data-trigger="finished(#my-element)"
```

**count**

This associates each animation with a number signifiying it's place in a queue
of animations. Attrimationjs will run all elements with count 1 simultenously,
wait for it to finish and then run all elements with count 2 onwards. Elements
with the lowest count are always run as soon as attrimationjs discovers them.

```
data-trigger="count(1)"
```

Note that count must be a positive integer starting from 1. Anything else will
cause attrimationjs to log a warning and drop the node during the parsing stage.

#### data-loop

This simply allows you to loop the animation over and over again. Note that 
any other animations which are waiting on a looping animation will still trigger
after the first iteration of the animation has completed. You can either just
add the attribute to loop the animation normally or supply the word 'reverse' to
have the animation run backwards after finishing to reset it state.

```
<div ... data-loop>
<div ... data-loop="reverse">
```

#### data-delay

How many **seconds** to wait after a animation is triggered to begin the
sequence.

#### Custom Animations

The couple of built in animations are great but chances are you might want to
build your own beautiful animations involving complex transforms. You can do so
by providing attrimationjs with a [KeyFrameObject](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) from the new [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API).

The `registerAnimation` function allows you to create a new animation by
specifying a name (this will be how you trigger the animation in a animation
definition string) and a function which takes in all the params from a
invocation and returns 2 things. The keyframe object representing the animation
and a duration in seconds. See a simple implementation of a fade out animation
below.

```
<div data-animations="fade_out:1.2">

registerAnimation('fade_out', (duration) => {
    // Some logic...
    return {
        keyframes: [
            {opacity: 0},
            {opacity: 1},
        ],
        duration: duration === undefined ? Number(duration) : 1
    }
});

primeAnimations(document.body);
```

## Built in Animations


## Architecture

#### Overview 

#### Testing

Run all the tests with `npm run test`.