# ES6+ Features

A comprehensive guide to modern JavaScript features introduced in ES2015 and beyond.

## Arrow Functions

Arrow functions provide a concise syntax and lexically bind `this`.

```typescript
// Traditional function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const add = (a: number, b: number): number => a + b;

// With implicit return
const double = (n: number) => n * 2;
```

## Destructuring

Extract values from arrays and objects with clean syntax.

```typescript
// Object destructuring
const { name, age, address: { city } = {} } = user;

// Array destructuring with rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Default values
const { theme = 'light', lang = 'en' } = config;
```

## Template Literals

```typescript
const greeting = `Hello, ${name}!
Welcome to ${city}.`;

// Tagged templates
const html = String.raw`<div class="${className}">${content}</div>`;
```

## Spread & Rest

```typescript
// Spread in function calls
Math.max(...numbers);

// Object spread (shallow clone + merge)
const merged = { ...defaults, ...overrides };

// Rest parameters
function sum(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}
```

## Modules

```typescript
// Named exports
export const PI = 3.14159;
export function formatDate(date: Date): string { /* ... */ }

// Default export
export default class EventEmitter { /* ... */ }

// Dynamic import (code splitting)
const { default: Chart } = await import('./chart.js');
```

## Optional Chaining & Nullish Coalescing

```typescript
// Optional chaining
const city = user?.address?.city;
const firstTag = article?.tags?.[0];
const result = obj?.method?.();

// Nullish coalescing
const port = config.port ?? 3000;
const name = user.nickname ?? user.username ?? 'Anonymous';
```

## Logical Assignment

```typescript
// Assign if nullish
config.timeout ??= 5000;

// Assign if falsy
options.debug ||= false;

// Assign if truthy
cache.value &&= transform(cache.value);
```
