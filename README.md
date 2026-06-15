# mini-frontend

A minimal frontend component framework built from scratch with TypeScript decorators and `reflect-metadata`. Built as a learning project to understand how Angular and React work internally.

> ⚠️ This is a learning project — not intended for production use. For production, use [Angular](https://angular.dev) or [React](https://react.dev).

```typescript
@Component({
    selector: 'app-counter',
    template: `
        <div>
            <h1>{{ count }}</h1>
            <button class="btn-increment">Incrementar</button>
            <button class="btn-decrement">Decrementar</button>
        </div>
    `
})
class CounterComponent {
    @State()
    count: number = 0;

    @OnClick('.btn-increment')
    increment() { this.count++; }

    @OnClick('.btn-decrement')
    decrement() { this.count--; }
}

bootstrap([CounterComponent]);
```

---

## 🎯 Purpose

This project exists to answer the question: **how do Angular and React actually work?**

By building it from scratch, you learn:
- How `@Component` stores selector and template metadata on a class
- How `@State` marks properties as reactive using `Object.defineProperty`
- How `@OnClick` stores event listeners in metadata
- How `bootstrap` connects everything — DOM, state, events, and rendering
- How template interpolation `{{ prop }}` works with regex
- Why state reactivity lives in `bootstrap` not in `@State`
- The Event Delegation pattern for stable DOM event handling

---

## 🏗️ Architecture

```
src/
├── decorators/
│   ├── component.decorator.ts  ← @Component({ selector, template })
│   ├── state.decorator.ts      ← @State() — marks reactive properties
│   └── events.decorator.ts     ← @OnClick, @OnInput, @OnSubmit
├── core/
│   ├── renderer.ts             ← renderTemplate — {{ }} interpolation
│   └── bootstrap.ts            ← mounts components, connects state + events
└── index.ts                    ← components and app bootstrap
```

---

## ⚙️ How it works internally

### 1. Decorators store metadata

```typescript
// @Component stores selector and template on the class
Reflect.defineMetadata('component:metadata', { selector, template }, MyComponent);

// @State stores reactive property names in an array
Reflect.defineMetadata('state:properties', ['count'], MyComponent);

// @OnClick stores event metadata in an array
Reflect.defineMetadata('events:listeners', [
    { selector: '.btn-increment', event: 'click', handlerName: 'increment' }
], MyComponent);
```

### 2. bootstrap reads metadata and mounts the component

```typescript
// 1. Reads @Component metadata → finds element in DOM
// 2. Creates instance → new MyComponent()
// 3. Connects @State properties to render()
//    via Object.defineProperty on the instance
// 4. Renders template → replaces {{ count }} with actual value
// 5. Registers event listeners via Event Delegation
```

### 3. Template interpolation

```typescript
// renderTemplate replaces {{ prop }} with instance values
'<h1>{{ count }}</h1>'
// becomes:
'<h1>0</h1>'
```

### 4. State reactivity

```typescript
// When instance.count changes:
// Object.defineProperty set() fires
//   → storedValue = newValue
//   → render() is called
//   → DOM updates automatically
```

### 5. Event Delegation

```typescript
// Instead of adding listeners directly to buttons (which get destroyed on re-render),
// listeners are added to the parent element:
element.addEventListener('click', (e) => {
    if (e.target.matches('.btn-increment')) {
        instance.increment();
        render();
    }
});
```

---

## 🚀 Usage

### 1. Create a component

```typescript
import { Component } from './decorators/component.decorator.js';
import { State } from './decorators/state.decorator.js';
import { OnClick, OnInput } from './decorators/events.decorator.js';

@Component({
    selector: 'app-todo',
    template: `
        <div>
            <h1>Tareas: {{ total }}</h1>
            <input class="todo-input" placeholder="Nueva tarea..." />
            <button class="btn-add">Agregar</button>
        </div>
    `
})
class TodoComponent {
    @State()
    total: number = 0;

    @State()
    inputValue: string = '';

    @OnClick('.btn-add')
    addTodo() {
        this.total++;
    }

    @OnInput('.todo-input')
    onInput() {
        // handle input
    }
}
```

### 2. Add the element to HTML

```html
<!DOCTYPE html>
<html>
<body>
    <app-todo></app-todo>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reflect-metadata/0.2.2/Reflect.js"></script>
    <script type="module" src="./dist/index.js"></script>
</body>
</html>
```

### 3. Bootstrap the app

```typescript
import { bootstrap } from './core/bootstrap.js';
bootstrap([TodoComponent]);
```

---

## 📋 API Reference

### `@Component(metadata)`

| Property | Type | Description |
|----------|------|-------------|
| `selector` | `string` | HTML element selector (e.g. `'app-counter'`) |
| `template` | `string` | HTML template with `{{ prop }}` interpolation |

### `@State()`

Marks a class property as reactive. When the value changes, the component re-renders automatically.

```typescript
@State()
count: number = 0;
// instance.count++ → triggers re-render automatically
```

### Event Decorators

| Decorator | DOM Event | Description |
|-----------|-----------|-------------|
| `@OnClick(selector)` | `click` | Fires when element is clicked |
| `@OnInput(selector)` | `input` | Fires when input value changes |
| `@OnSubmit(selector)` | `submit` | Fires when form is submitted |

### `bootstrap(components[])`

Mounts all components into the DOM. Call once at app startup.

### Template Interpolation

Use `{{ propertyName }}` in templates to display component state:

```typescript
template: `<h1>{{ count }}</h1><p>{{ message }}</p>`
```

---

## 🧠 Key Lessons

```
1. Decorators store metadata — they don't implement behavior
2. bootstrap is where everything connects — DOM + state + events
3. @State lives in the decorator, reactivity lives in bootstrap
   → Single Responsibility Principle
4. Event Delegation solves the "lost listeners after re-render" problem
   → attach to parent, not to the element that gets destroyed
5. Template interpolation is just regex + String.replace
6. Object.defineProperty get/set is the foundation of reactivity
   → Angular uses this same pattern (Zone.js wraps it)
   → Vue uses this too (Vue 2) / Proxy (Vue 3)
```

---

## 🆚 mini-frontend vs Angular

| Feature | mini-frontend | Angular |
|---------|--------------|---------|
| `@Component` | ✅ | ✅ |
| `@State` / Signals | ✅ basic | ✅ advanced |
| Event binding | ✅ basic | ✅ advanced |
| Template interpolation `{{ }}` | ✅ | ✅ |
| Dependency Injection | ❌ | ✅ |
| Pipes | ❌ | ✅ |
| Routing | ❌ | ✅ |
| Change Detection | ❌ basic | ✅ advanced |
| Standalone Components | ❌ | ✅ |
| Production ready | ❌ | ✅ |

The core concept — decorators + metadata + reactive state + template rendering — is identical. Angular adds many sophisticated layers on top.

---

## 📚 What to learn next

- **[Angular](https://angular.dev)** — production-ready framework with the same decorator pattern
- **[Vue](https://vuejs.org)** — uses the same `Object.defineProperty` / Proxy reactivity pattern
- **[React](https://react.dev)** — different approach (Virtual DOM) but same component concept
- **[Lit](https://lit.dev)** — closest to what we built — Web Components with decorators

---

## 📄 License

MIT