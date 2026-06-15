// Guarda qué métodos deben escuchar eventos del DOM y en qué selector.
export const EVENTS_KEY = 'events:listeners';
export function OnEvent(selector, event) {
    return function (target, handlerName) {
        // Obtenemos los eventos
        const events = Reflect.getMetadata(EVENTS_KEY, target.constructor) ?? [];
        events.push({
            selector,
            event, // OnEvent siempre es click, input o submit
            handlerName
        });
        // Guardamos los eventos en el constructor
        Reflect.defineMetadata(EVENTS_KEY, events, target.constructor);
    };
}
export const OnClick = (selector) => OnEvent(selector, 'click');
export const OnInput = (selector) => OnEvent(selector, 'input');
export const OnSubmit = (selector) => OnEvent(selector, 'submit');
