var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// Decoradores
import { Component } from './decorators/component.decorator.js';
import { State } from './decorators/state.decorator.js';
import { OnClick } from './decorators/events.decorator.js';
// Core
import { bootstrap } from './core/bootstrap.js';
let CounterComponent = class CounterComponent {
    constructor() {
        this.count = 0;
    }
    increment() {
        this.count++;
    }
    decrement() {
        this.count--;
    }
};
__decorate([
    State(),
    __metadata("design:type", Number)
], CounterComponent.prototype, "count", void 0);
__decorate([
    OnClick('.btn-increment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CounterComponent.prototype, "increment", null);
__decorate([
    OnClick('.btn-decrement'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CounterComponent.prototype, "decrement", null);
CounterComponent = __decorate([
    Component({
        selector: 'app-counter',
        template: `
        <div>
            <h1>{{ count }}</h1>
            <button class="btn-decrement">Decrementar</button>
            <button class="btn-increment">Incrementar</button>
        </div>
    `
    })
], CounterComponent);
bootstrap([CounterComponent]);
