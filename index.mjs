
class RSSO {

  static #classes = [];
  static #keyframes = [];
  static #keyRegEx = /[A-Z]/g;
  
  static #cssKey(jsKey) {
    return jsKey.replace(RSSO.#keyRegEx, (match) => '-'+ match.toLowerCase());
  }

  static #newId(idPrefix, arr, def) {
    const defJSON = JSON.stringify(def);
    const reuse = arr.find((i)=> i.def == defJSON);
    if (reuse) {
      return {name: reuse.name, reused: true};
    }
    while (true) {
      const name = 'rsso_'+ idPrefix +'_'+ (Math.random() + 1).toString(36).substring(2);
      if (arr.find((i)=> i.name == name)) {
        continue;
      }
      const newClass = {name, def: defJSON};
      arr.push(newClass);
      return {name: newClass.name, reused: false};
    }
  }

  static #newClass(def) {
    return RSSO.#newId('c', RSSO.#classes, def);
  }

  static #newKeyframe(def) {
    return RSSO.#newId('k', RSSO.#keyframes, def);
  }

  static #isSelectorPrefix(keyPrefix) {
    return keyPrefix == '&' || keyPrefix == ':' || keyPrefix == '.'
      || keyPrefix == '>' || keyPrefix == '+' || keyPrefix == '~';
  }

  static #cssSelectorWriter(selector, def) {
    let css = `${selector} {\n`;
    const root = {
      selectors: [],
      medias: [],
    };
    const inner = {
      selectors: [],
      medias: [],
    };
    const events = [];
    for (const key of Object.keys(def)) {
      const cssKey = RSSO.#cssKey(key);
      const keyPrefix = key.length > 0 ? key.substring(0, 1) : '';
      if (RSSO.#isSelectorPrefix(keyPrefix)) {
        RSSO.ensureObject(key, def[key]);
        const subSelector = selector + (
          keyPrefix == '&' ? key.substring(1) : (keyPrefix == ':' ? '' : ' ') + key
        );
        root.selectors.push({
          selector: subSelector,
          css: RSSO.#cssSelectorWriter(subSelector, def[key])
        });
      } else if (keyPrefix == '@') {
        root.medias.push({
          media: key,
          css: RSSO.#cssSelectorWriter(selector, def[key])
        });
      } else if (typeof def[key] === 'object' && def[key] !== null) {
        for (const valKey of Object.keys(def[key])) {
          const cssProperty = `  ${cssKey}: ${def[key][valKey]};\n`;
          if (valKey == 'default' || valKey == 'def' || valKey == '_' || valKey == '') {
            css += cssProperty;
            continue;
          }
          const valKeyPrefix = valKey.length > 0 ? valKey.substring(0, 1) : '';
          if (RSSO.#isSelectorPrefix(valKeyPrefix)) {
            const reuseS = inner.selectors.find((s) => s.selector == valKey);
            if (reuseS) {
              reuseS.css += cssProperty;
            } else {
              const subSelector = selector + (
                valKeyPrefix == '&' ? valKey.substring(1) : (valKeyPrefix == ':' ? '' : ' ') + valKey
              );
              inner.selectors.push({
                selector: subSelector,
                css: cssProperty
              });
            }
          } else if (valKeyPrefix == '@') {
            const reuseM = inner.medias.find((m) => m.media == valKey);
            if (reuseM) {
              reuseM.css += cssProperty;
            } else {
              inner.medias.push({
                media: valKey,
                css: cssProperty
              });
            }
          }
        }
      } else {
        css += `  ${cssKey}: ${def[key]};\n`;
      }
    }
    css += '}';
    for (const s of inner.selectors) {
      css += `\n${selector}${s.selector} {\n${s.css}}`;
    }
    for (const mq of inner.medias) {
      css += `\n${mq.media} {\n${selector} {\n${mq.css}}\n}`;
    }
    for (const s of root.selectors) {
      css += `\n${s.css}`;
    }
    for (const mq of root.medias) {
      css += `\n${mq.media} {\n${mq.css}}`;
    }
    console.log(css);
    return css;
  }

  static ensureObject(info, def) {
    if (typeof def !== 'object' || def == null) {
      throw new Error(`${info} is not a valid object.`);
    }
  }

  static createImport(info) {
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = `@import ${info};`;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
  }

  static createClass(jsDefinition) {
    RSSO.ensureObject(`Class ${jsDefinition}`, jsDefinition);
    const theClass = RSSO.#newClass(jsDefinition);
    if (theClass.reused) {
      return theClass.name;
    }
    const css = RSSO.#cssSelectorWriter('.'+ theClass.name, jsDefinition);
    const baseStyle = document.createElement('style');
    baseStyle.type = 'text/css';
    baseStyle.id = theClass.name;
    baseStyle.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(baseStyle);
    return theClass.name;
  }

  static createFontFace(def) {
    RSSO.ensureObject(`Font-face ${def}`, def);
    let css = `@font-face {\n`;
    for (const key of Object.keys(def)) {
      const cssKey = RSSO.#cssKey(key);
      css += `  ${cssKey}: ${def[key]};\n`;
    }
    css += '}';
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
  }

  static createKeyframes(def) {
    RSSO.ensureObject(`Keyframes ${def}`, def);
    const keyframes = RSSO.newKeyframes(def);
    if (keyframes.reused) {
      return keyframes.name;
    }
    let css = `@keyframes ${keyframes.name} {\n`;
    for (const key of Object.keys(def)) {
      RSSO.ensureObject(`Keyframes >> ${key}`, def[key]);
      css += `  ${key} {\n`;
      for (const valKey of Object.keys(def[key])) {
        const cssKey = RSSO.#cssKey(valKey);
        css += `  ${cssKey}: ${def[key][valKey]};\n`;
      }
      css += '  }\n';
    }
    css += '}';
    const styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.id = keyframes.name;
    styleTag.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
    return keyframes.name;
  }
}

function css() {
  if (arguments.length == 0) {
    return null;
  }
  const classNames = [];
  for (const argument of arguments) {
    classNames.push(RSSO.createClass(argument));
  }
  return {className: classNames.join(' ')};
}

css.import = (info)=> {
  RSSO.createImport(info);
};

css.fontFace = (def)=> {
  RSSO.createFontFace(def);
};

css.keyframes = (def)=> {
  return RSSO.createKeyframes(def);
};

export default css;
