// Guarda la configuración del componente en la metadata de la clase.

interface ComponentMetadata {
    selector: string; // 'app-counter' - el elemento HTML
    template: string; // el HTML del componente
}

export const COMPONENT_KEY = 'component:metadata';

export function Component ( metadata: ComponentMetadata ) {
    return function ( constructor: Function ) {
        Reflect.defineMetadata(
            COMPONENT_KEY,
            metadata,
            constructor
        )
    }
}