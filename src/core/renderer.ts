// Toma el template del componente, reemplaza las interpolaciones {{ prop }} con los valores reales de la instancia y retorna el HTML final.

export function renderTemplate(
    template: string,
    instance: any
): string {
    return template.replace(/\{\{\s*(\w+)\s*\}\}/g, ( _, propName ) => {
        const value = instance[propName]; // propName es el nombre de la propiedad ej: 'count'
        if ( value === undefined ) return '';
        
        return String(value);
    });
}