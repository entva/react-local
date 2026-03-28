import { describe, it, expect } from 'vitest';
import { parsePath, get, getT, getTranslate } from './utils';

describe('parsePath', () => {
  it('splits dot notation', () => {
    expect(parsePath('a.b.c')).toEqual(['a', 'b', 'c']);
  });

  it('converts bracket index notation', () => {
    expect(parsePath('a[0].b')).toEqual(['a', '0', 'b']);
  });

  it('converts double-quoted bracket notation', () => {
    expect(parsePath('a["b"]')).toEqual(['a', 'b']);
  });

  it('converts single-quoted bracket notation', () => {
    expect(parsePath("a['b']")).toEqual(['a', 'b']);
  });

  it('handles a single key with no separators', () => {
    expect(parsePath('a')).toEqual(['a']);
  });

  it('filters empty segments', () => {
    expect(parsePath('a..b')).toEqual(['a', 'b']);
  });
});

describe('get', () => {
  it('gets a simple property', () => {
    expect(get({ a: 1 }, 'a')).toBe(1);
  });

  it('gets a nested property via dot notation', () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, 'a[0].b.c')).toBe(3);
  });

  it('gets a nested property via bracket notation', () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, 'a[0].b.c')).toBe(3);
  });

  it('returns undefined for missing path', () => {
    expect(get({ a: 1 }, 'a.b.c')).toBeUndefined();
  });

  it('returns defaultValue when result is undefined', () => {
    expect(get({ a: 1 }, 'a.b.c', 'default')).toBe('default');
  });

  it('returns defaultValue for missing top-level key', () => {
    expect(get({}, 'missing', 42)).toBe(42);
  });

  it('handles null object', () => {
    expect(get(null, 'a')).toBeUndefined();
  });

  it('handles undefined object', () => {
    expect(get(undefined, 'a')).toBeUndefined();
  });

  it('handles null object with defaultValue', () => {
    expect(get(null, 'a', 'fallback')).toBe('fallback');
  });

  it('handles bracket notation in path string', () => {
    expect(get({ a: { b: 2 } }, 'a["b"]')).toBe(2);
  });

  it('handles array index in path string', () => {
    expect(get({ a: ['x', 'y', 'z'] }, 'a[1]')).toBe('y');
  });

  it('returns 0 (falsy non-undefined value) correctly', () => {
    expect(get({ a: 0 }, 'a', 99)).toBe(0);
  });

  it('returns false (falsy non-undefined value) correctly', () => {
    expect(get({ a: false }, 'a', true)).toBe(false);
  });

  it('returns null (falsy non-undefined value) correctly', () => {
    expect(get({ a: null }, 'a', 'default')).toBe(null);
  });

  it('handles deeply nested paths', () => {
    expect(get({ a: { b: { c: { d: 4 } } } }, 'a.b.c.d')).toBe(4);
  });

  it('handles path with missing intermediate node', () => {
    expect(get({ a: 1 }, 'a.b.c')).toBeUndefined();
  });
});

describe('getT', () => {
  const dictionary = {
    en: { greeting: 'Hello', nested: { msg: 'Hi there' } },
  };

  it('returns a translate function', () => {
    const t = getT('en', dictionary);
    expect(typeof t).toBe('function');
  });

  it('translates a top-level key', () => {
    const t = getT('en', dictionary);
    expect(t('greeting')).toBe('Hello');
  });

  it('translates a nested key via dot notation', () => {
    const t = getT('en', dictionary);
    expect(t('nested.msg')).toBe('Hi there');
  });

  it('passes substitutions through to translate', () => {
    const dict = { en: { count: '%{n} item |||| %{n} items' } };
    const t = getT('en', dict);
    expect(t('count', { n: 1, smart_count: 1 })).toBe('1 item');
    expect(t('count', { n: 3, smart_count: 3 })).toBe('3 items');
  });
});

describe('getTranslate', () => {
  const dictionary = {
    en: { hello: 'Hello' },
  };

  it('returns [lang, fn] tuple', () => {
    const [lang, fn] = getTranslate('en', dictionary);
    expect(lang).toEqual({ hello: 'Hello' });
    expect(typeof fn).toBe('function');
  });

  it('fn translates a phrase directly', () => {
    const [, fn] = getTranslate('en', dictionary);
    expect(fn('Hello')).toBe('Hello');
  });

  it('fn passes substitutions through', () => {
    const [, fn] = getTranslate('en', dictionary);
    expect(fn('Hi %{name}', { name: 'Max' })).toBe('Hi Max');
  });
});
