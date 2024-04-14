![Logo](https://raw.githubusercontent.com/rssojs/rsso/main/assets/logo.svg)

# `R`emarkable `S`tructures `O`utflows

RSO is an ultra-lightweight and zero-dependency reactive UI framework written in pure vanilla JavaScript, that outflows remarkable DOM and CSS structures.

RSO is like React but without JSX, it supports component development with properties, state, changes observation (effects), dynamic DOM render, referencing, events, and more.

RSO has your own CSS abstraction, is like StyleX, but more simple to use and dynamic, and supports LESS and SASS/SCSS hierarchy structures-like.

This pure JavaScript framework brings a new way to build your DOM Components, with dynamic HTML and CSS, in a much more practical way, less verbose, without limitations, and with **no compilations**.

All CSS is generated on run-time and injected into `<style>`s in the HTML.

The style sheet is implemented in fully raw JavaScript Objects.

Generates CSS classes within [React](https://react.dev/) Components.

## How To Use

Example of my RSSO style objects definition:

`style.js`

```javascript
const MEDIA_QUERY = '@media only screen and (max-width: 768px)';

const style = {
  container: {
    backgroundColor: 'gray',
    ':hover': {
        cursor: 'pointer'
    },
    '> div': {
      padding: {
        default: '100px 150px',
        [MEDIA_QUERY]: '20px 50px'
      },
      '> button': {
        backgroundColor: 'red',
        ':hover': {
            backgroundColor: 'yellow',
        },
        [MEDIA_QUERY]: {
          backgroundColor: 'blue',
          ':hover': {
            backgroundColor: 'green'
          }
        }
      }
    }
  },
  button: {
    border: '2px solid pink',
    '&_on': {
        boxShadow: [
            '0 0 10px pink',
            '0 0 10px pink'
        ].join(','),
    }
  }
};

export default style;
```

Then use it in your React component:

`index.jsx`

```javascript
import React, {useState} from 'react';

import css from '../../common/RSSO';
import style from './style.js';

function Foo() {
    const [active, setActive] = useState(false);
    return (
        <div {...css(style.container)}>
            <div>
                <button {...css(
                    style.button,
                    style[`button-${active === true && 'on'}`]
                )}
                onClick={()=> setActive(true)}>
                    Foo
                </button>
            </div>
        </div>
    );
}

export default Foo;
```

## Integrations

You can integrate with any other framework to add facilities.

A good one is the [TinyColor](https://github.com/bgrins/TinyColor) because have the power to manipulate color variants easily.

With all installed and ready to run, see this example:

`style.js`

```javascript

import tinycolor from "tinycolor2";

const primaryColor = tinycolor("#32a852");

const style = {
  container: {
    backgroundColor: primaryColor.lighten(50).toString(),
    color: primaryColor.toString(),
    border: `5px solid ${primaryColor.darken(50).toString()}`
  }
};

export default style;
```
