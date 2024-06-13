
# @xso/com

XSO COM is an ultra-lightweight and zero-dependency reactive UI framework written in pure vanilla JavaScript.

> Builds DOM Elements dinamically in run-time.

RSO is like React but without JSX, it supports component development with properties, state, changes observation (effects), dynamic DOM render, referencing, events, and more.

This pure JavaScript framework brings a new way to build your DOM Components, with dynamic HTML, in a much more practical way, less verbose, without limitations, and with **no compilations**.

It works like React, Vue, Angular, Svelte, and more, but it supports integration with old and good JavaScript vanilla in the raw HTML.

## Documentation

Here is the official website with the full documentation:

- [xsojs.dev](https://www.xsojs.dev/framework/com)

## Install

To start playing with XSO COM:

`npm install -S @xso/com`

But better, is to use the PNPM:

`pnpm install @xso/com`

Or if you prefer Yarn:

`yarn add -S @xso/com`

Or even another package manager.

## How To Use

Example of the capabilities supported in the XSO component:

`index.js`

```javascript
import com from '@xso/com';

function Foo() {
  // Creates the state:
  const active = this.state(false);
  // Creates a new reference:
  const message = this.ref();
  // Detect changes affected:
  this.changes([active], ()=> {
    if (active.val) {
      // Calls an internal method of another component.
      message.current._setText('Active.');
    } else {
      message.current._setText('Inactive.');
    }
  });
  // Initialization and destruction events:
  this.mount(()=> console.log('My Foo component is mounted.'));
  this.unmount(()=> console.log('My Foo component was unmounted.'));
  // Subcomponents and elements that will render:
  this.view(()=> [
    { div: {
      _: [
        { p: {
          _: [
            'Status: ',
            // Loading the reference with other component:
            message.set({ [Message]: { _: 'Waiting...' } }),
          ]
        } },
        { button: {
          // Using .$val you will force a new render.
          // Using .val you only get or set the value.
          // In this case, if you remove $ also will 
          // work, no render is needed!
          onClick: ()=> active.$val = !active.val,
          _: 'Click me!'
        } }, // button
      ]
    } } // div
  ]);
}

const Message = com(function(props) {
  // Creates a new reference:
  const message = this.ref();
  // Method shared with parent:
  this._setText = (text)=> {
    message.current.innerText = text;
  };
  this.view(()=> [
    // Reference with DOM element:
    message.set({ span: {
      // All props to the Paragraph:
      ...props
    } }),
  ]);
});

export default com(Foo);
```

## Vanilla JS in HTML

Here is an integration directly in the raw HTML with pure JavaScript, like this:

```html
<!--
Here is the bundle JS file to download:
https://github.com/xsojs/com/blob/main/dist/xso-com.umd.js
-->
<script src="xso-com.umd.js"></script>

<div id="myElement"></div>

<script>
const Counter = com(function({ initial }) {
    const counter = this.state(initial);
    this._reset = ()=> {
        // Change state without render.
        counter.val = initial;
        // Force the render:
        this.render();
    }
    this.view(()=> [
        { p: {
            _: `Counter: ${counter}`
        }},
        { button: {
            // With $ changes the state and render.
            onClick: ()=> { counter.$val++; },
            _: '+ Add'
        } },
        ' ',
        { button: {
            onClick: ()=> { counter.$val--; },
            _: '- Minus'
        } },
    ]);
})

function MyXSOComponent({content}) {
    const refCounter = this.ref();
    const refParagraph = this.ref();
    this.view(()=> [
        { div: {
            _: [
                { h3: { _: 'Subcomponent directly:' } },
                { [Counter]: {
                    initial: 1000
                } },
                { h3: { _: 'Subcomponent referenced:' } },
                refCounter.set({ [Counter]: {
                    initial: 1000
                } }),
                { button: {
                    onClick: ()=> {
                        refCounter.current._reset();
                    },
                    _: 'Reset'
                } },
                { h3: { _: 'Content from properties:' } },
                refParagraph.set({ p: {
                    _: content // Prop
                } }),
                { button: {
                    onClick: ()=> {
                        refParagraph.current.style.backgroundColor = [
                            'yellow',
                            'orange',
                            'blue',
                            'pink',
                            'red',
                            'cyan'
                        ][Math.floor(Math.random() * 6)];
                    },
                    _: 'Style'
                } },
            ]
        } }
    ]);
}

com.create(
    document.getElementById('myElement'), // DOM Element
    com(MyXSOComponent), // Component Initialized
    {content: 'My prop content!'} // Props
);
</script>
```
