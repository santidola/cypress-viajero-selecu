/**
 * Lista de estudiantes viajeros para el módulo de cambio de contraseña.
 *
 * La contraseña de cada estudiante se genera automáticamente en el test
 * con la fórmula: primerNombre + primeros2dígitosDelDocumento
 * Ejemplo: "Carlos" con documento "1035438452" → contraseña "Carlos10"
 */
export interface Viajero {
    firstName: string;   // Primer nombre (se usa para la contraseña)
    fullName: string;    // Nombre completo (solo referencia)
    document: string;    // Número de documento (usuario de búsqueda)
}

export const viajeros: Viajero[] = [
    {
        firstName: "Cristiano",
        fullName: "Cristiano Ronaldo Dev",
        document: "1035438452"
    },
    // ── Agrega aquí más estudiantes con el mismo formato ──
    // {
    //     firstName: "Nombre",
    //     fullName: "Nombre Apellido",
    //     document: "1234567890"
    // },
];

/**
 * Genera la contraseña de un viajero a partir de su primer nombre
 * y los dos primeros dígitos de su documento.
 * Ejemplo: firstName="Ana", document="1035000000" → "Ana10"
 */
export function generarContrasena(viajero: Viajero): string {
    const primerosDosDigitos = viajero.document.substring(0, 2);
    return `${viajero.firstName}${primerosDosDigitos}`;
}
