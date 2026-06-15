// Guarda la configuración del componente en la metadata de la clase.
export const COMPONENT_KEY = 'component:metadata';
export function Component(metadata) {
    return function (constructor) {
        Reflect.defineMetadata(COMPONENT_KEY, metadata, constructor);
    };
}
