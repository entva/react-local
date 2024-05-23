@entva/react-local
=============

A React internationalization library inspired by [node-polyglot](https://airbnb.io/polyglot.js/). Supports RSC and Next.js app folder via an additional `@entva/react-local/server` export.

## Dictionaries

To use this library you will need to provide a single top level or multiple module dictionaries. Although a root level global dictionary is fully supported it is recommended to use granular local dictionary files next to the components you are writing. The format of the dictionary should be as follows:

```json
{
  "de-DE": {
    "text": "Hallo!",
    "pluralize": "%{smart_count} Apfel |||| %{smart_count} Äpfel",
    "nested": {
      "text": "Hallo nochmal!"
    },
    "substitution": "I have come here to chew %{variable_1} and kick %{variable_2}... and I'm all out of %{variable_1}."
  },
  "en-US": {
    //...
  },
}
```

The top level keys of the dictionary are the languages to support. Set active language to one of the keys you've used. ISO 3166-1 alpha-2 country codes are recommended with optional ISO 639-2 2 letter code for the dialect. For example `de-DE` for German in Germany and `de-AT` for German in Austria.


## Components:

### <International />

You need to use the `<International />` wrapper around your app to provide context to your components.
```javascript
import International from '@entva/react-local';

// Required, active locale key
const active = 'de-DE';
// Optional data, anything locale related, for example date formatting options
const data = {...};

<International active={active} data={data}>
  <App />
</International>
```
`<International />` component takes an `active` prop and a `data` object.

For TypeScript users `<International />` component takes the type of the data like this:

```typescript
import International from '@entva/react-local';

// Required, active locale key
const active = 'de-DE';
// Optional data, anything locale related, for example date formatting options
const data = {...};

<International<typeof data> active={active} data={data}>
  <App />
</International>
```


### T

`<T />` is a component alternative to useT hook. Use it when accessing `t` function is inconvenient.

```javascript
import { T } from '@entva/react-local';

const dictionary = {
  'de-DE': {
    substitution: 'I have come here to chew %{variable_1} and kick %{variable_2}... and I\'m all out of %{variable_1}.',
  },
};

const MyComponent = () => (
  <T
    dictionary={dictionary}
    phrase="substitution"
    variable_1={<strong onClick={() => alert('🍬')}>bubblegum</strong>}
    variable_2={<em onClick={() => alert('🍑')}>ass</em>}
  />
);
// => I have come here to chew bubblegum and kick ass... and I'm all out of bubblegum.
```

`<T />` component takes a `dictionary` prop with your dictionary, phrase prop with path to the phrase you are using and any variables you are using within the phrase. The path format is the same as in [lodash.get](https://lodash.com/docs/4.17.15#get). `smartContent` is translated into `smart_content` for your convenience, see pluralization section below.

### Dictionary

Passing a dictionary prop to every `<T />` component might get tedious fast, use `<Dictionary />` wrapper to provide dictionary to all `<T />` components at once:

```javascript
import { Dictionary, T } from '@entva/react-local';

const dictionary = {
  'de-DE': {
    substitution: 'I have come here to chew %{variable_1} and kick %{variable_2}... and I\'m all out of %{variable_1}.',
  },
};

const MyComponent = () => (
  <Dictionary dictionary={dictionary}>
    <T
      phrase="substitution"
      variable_1={<strong onClick={() => alert('🍬')}>bubblegum</strong>}
      variable_2={<em onClick={() => alert('🍑')}>ass</em>}
    />
    //...
  </Dictionary>
);
// => I have come here to chew bubblegum and kick ass... and I'm all out of bubblegum.
```

`<Dictionary />` component only takes a `dictionary` prop with your dictionary and provides it to all nested `<T />` components. You can still override that by providing a `dictionary` prop to the `<T />` component directly. You can use `<Dictionary />` component right after `<International />` component if you are using a global dictionary and want to provide a language file to the entire app at once.

## Hooks

### useLocaleData

`useLocaleData` returns the locale data you passed to the provider

```javascript
import { useLocaleData } from '@entva/react-local';

const MyComponent = () => {
  const locale = useLocaleData(); // data object passed to the Provider wrapper
};

```

### useT

`useT` is the simplest way to use translations, takes a single `dictionary` argument and returns translator function. Translator function takes phrase path and options as parameters.

```javascript
import { useT } from '@entva/react-local';

const MyComponent = () => {
  const t = useT(dictionary);
  t('text'); // returns 'Hallo!'
};
```

If no `dictionary` is passed it will attempt to locate the closest `<Dictionary />` context.

### useTranslate

`useTranslate` is provided for TypeScript connoisseurs and allows for proper type support of dictionaries.

```typescript
import { useTranslate } from '@entva/react-local';

const MyComponent = () => {
  const [lang, t] = useTranslate<typeof dictionary>(dictionary);
  t(lang.text); // returns 'Hallo!'
  t(lang.missing); // TypeScript compiler throws an error
};
```

### useActiveLocale

`useActiveLocale` returns the name of currently active locale

```javascript
import { useActiveLocale } from '@entva/react-local';

const MyComponent = () => {
  const active = useActiveLocale(); // returns 'en-US'
};
```

## Utility functions

### getT

`getT` works exactly the same as `useT` hook but takes active locale as an additional first argument:

```javascript
import { getT } from '@entva/react-local';
// OR for RSC
import { getT } from '@entva/react-local/server';

const MyComponent = () => {
  const t = getT('de-DE, 'dictionary);
  t('text'); // returns 'Hallo!'
};
```

### getTranslate

`getTranslate` works exactly the same as `useTranslate` hook but takes active locale as an additional first argument:

```typescript
import { getTranslate } from '@entva/react-local';
// OR for RSC
import { getTranslate } from '@entva/react-local/server';

const MyComponent = () => {
  const [lang, t] = getTranslate<typeof dictionary>('de-DE', dictionary);
  t(lang.text); // returns 'Hallo!'
  t(lang.missing); // TypeScript compiler throws an error
};
```

## Pluralization

Pluralization is supported by using `smart_count` variable in your phrases. It is a special variable that is automatically replaced with the correct pluralization form. The format of the pluralization string is as follows:

```
"plural": "1 apple |||| %{smart_count} apples"
```

`t` function takes `smart_count` either as part of the options or simply as a second argument:

```javascript
t('plural', { smart_count: 2 }); // 2 apples
t('plural', 2); // 2 apples
```

`<T />` component takes `smartCount` as a prop:

```javascript
<T phrase="plural" smartCount={2} /> // 2 apples
```

## License

This project is published under MIT license. See [LICENSE](LICENSE) file for more details.
