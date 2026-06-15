// Hace una propiedad reactiva — cuando cambia, re-renderiza el componente automáticamente.

export const STATE_KEY = 'state:properties';

export function State() {
    return function ( target: any, propertyKey: string ) {
        let storedValue: any;

        Object.defineProperty(target, propertyKey, {
            get() {
                return storedValue;
            },

            set ( newValue: any ) {
                storedValue = newValue;
            },
            enumerable: true,
            configurable: true
        });

        // Obtenemos los estados
        const states: string[] = Reflect.getMetadata(
            STATE_KEY,
            target.constructor
        ) ?? [];

        states.push(propertyKey);

        // Guardamos los estados en el constructor
        Reflect.defineMetadata(
            STATE_KEY,
            states,
            target.constructor
        );
    }
}