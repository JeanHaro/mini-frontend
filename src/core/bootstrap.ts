// Decoradores
import { COMPONENT_KEY } from "../decorators/component.decorator.js";
import { EVENTS_KEY } from "../decorators/events.decorator.js";
import { STATE_KEY } from "../decorators/state.decorator.js";

// Renderer
import { renderTemplate } from "./renderer.js";

// Recibe un array de clases de componentes
export function bootstrap ( components: any[] ): void {
    for ( const Component of components ) {
        // 1. Lee metadata del componente
        const metadata = Reflect.getMetadata( COMPONENT_KEY, Component );
        if (!metadata) continue; // Si no hay continua con el siguiente valor del bucle

        // 2. Busca el elemento en el DOM
        const element = document.querySelector(metadata.selector);
        if (!element) continue;

        // 3. Crea la instancia
        const instance = new Component();

        // 4. Renderizamos el template con los valores iniciales
        function render() {
            element!.innerHTML = renderTemplate(metadata.template, instance);
        }

        // Conecta @State con render — intercepta cada propiedad de estado
        const states: string[] = Reflect.getMetadata( STATE_KEY, Component ) ?? [];
        
        for (const prop of states) {
            let storedValue = instance[prop];

            Object.defineProperty(instance, prop, {
                get() { return storedValue; },
                set(newValue: any) {
                    storedValue = newValue;
                    render(); // ← re-renderiza cuando cambia el estado
                },
                enumerable: true,
                configurable: true
            });
        }

        // 5. Event delegation — escucha en el elemento padre
        function registerEvents() {
            const events = Reflect.getMetadata(EVENTS_KEY, Component) ?? [];

            for (const event of events) {
                element!.addEventListener(event.event, (e: Event) => {
                    const target = e.target as Element;

                    // Verifica si el elemento clickeado coincide con el selector
                    if (target.matches(event.selector)) {
                        instance[event.handlerName]();
                        render();
                    }
                });
            }
        }

        // 6. Primer render
        render();
        registerEvents(); // Registra los eventos una sola vez

    }
}

