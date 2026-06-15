// Decoradores
import { Component } from './decorators/component.decorator.js';
import { State } from './decorators/state.decorator.js';
import { OnClick } from './decorators/events.decorator.js';

// Core
import { bootstrap } from './core/bootstrap.js';

@Component({
    selector: 'app-counter',
    template: `
        <div>
            <h1>{{ count }}</h1>
            <button class="btn-decrement">Decrementar</button>
            <button class="btn-increment">Incrementar</button>
        </div>
    `
})
class CounterComponent {
    @State()
    count: number = 0;

    @OnClick('.btn-increment')
    increment() { 
        this.count++; 
    }

    @OnClick('.btn-decrement')
    decrement() { 
        this.count--; 
    }
}

bootstrap([CounterComponent]);