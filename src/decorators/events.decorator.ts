// Guarda qué métodos deben escuchar eventos del DOM y en qué selector.

interface EventMetadata {
    selector: string;    // 'button', '.btn', '#submit'
    event: string;       // 'click', 'input', 'submit'
    handlerName: string; // nombre del método
}

export const EVENTS_KEY = 'events:listeners';

export function OnEvent ( selector: string, event: 'click' | 'input' | 'submit' ) {
    return function ( target: any, handlerName: string ) {
        // Obtenemos los eventos
        const events: EventMetadata[] = Reflect.getMetadata(
            EVENTS_KEY,
            target.constructor
        ) ?? [];
    
        events.push({
            selector,
            event, // OnEvent siempre es click, input o submit
            handlerName
        });

        // Guardamos los eventos en el constructor
        Reflect.defineMetadata(
            EVENTS_KEY,
            events,
            target.constructor
        )
    }
}

export const OnClick = ( selector: string ) => OnEvent(selector, 'click');
export const OnInput = ( selector: string ) => OnEvent(selector, 'input');
export const OnSubmit = ( selector: string ) => OnEvent(selector, 'submit');