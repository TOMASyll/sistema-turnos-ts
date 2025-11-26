import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

// 1. DEFINICIÓN DE TIPOS Y DATOS

// Define los tipos de atención permitidos
type TipoAtencion = 'llamada' | 'asesoría estudiante' | 'asesoría directivo';

// Define la estructura de cada registro
interface Atencion {
    cedula: string;
    tipo: TipoAtencion;
}

const atenciones: Atencion[] = [];

// Función abreviada para registrar una atención
const registrar = (c: string, t: TipoAtencion): void => {
    atenciones.push({ cedula: c, tipo: t });
};

// 2. MUESTRA ESTADÍSTICAS

const mostrarEstadisticas = (): void => {
    const t: number = atenciones.length;
    
    // Contar tipos
    const llamadas: number = atenciones.filter((a: Atencion) => a.tipo === 'llamada').length;
    const estudiantes: number = atenciones.filter((a: Atencion) => a.tipo === 'asesoría estudiante').length;
    const directivos: number = atenciones.filter((a: Atencion) => a.tipo === 'asesoría directivo').length;

    console.log(
        '--- ESTADÍSTICAS DE ATENCIONES ---\n' +
        `Total de atenciones: ${t}\n` +
        `Llamadas: ${llamadas}\n` +
        `Asesorías a Estudiantes: ${estudiantes}\n` +
        `Asesorías a Directivos: ${directivos}`
    );
};

// 3. FUNCIÓN PRINCIPAL DE REGISTRO
const iniciarRegistro = (): void => {
    let seguir: boolean = true;

    while (seguir) {
        const opcion: string | null = prompt(
            '--- SISTEMA DE REGISTRO ---\n' +
            '1. Registrar Llamada\n' +
            '2. Registrar Asesoría Estudiante\n' +
            '3. Registrar Asesoría Directivo\n' +
            '4. Mostrar Estadísticas\n' +
            '5. Salir\n' +
            'Seleccione una opción:'
        );

        if (opcion === null) continue;

        switch (opcion) {
            case '1':
            case '2':
            case '3':
                const cedula: string | null = prompt('Ingrese la cédula del cliente:');
                if (cedula) {
                    let tipo: TipoAtencion;
                    if (opcion === '1') tipo = 'llamada';
                    else if (opcion === '2') tipo = 'asesoría estudiante';
                    else tipo = 'asesoría directivo';
                    
                    registrar(cedula, tipo);
                    console.log(`Registro de ${tipo} exitoso para C.I. ${cedula}.`);
                }
                break;
            case '4':
                mostrarEstadisticas();
                break;
            case '5':
                seguir = false;
                console.log('Saliendo del sistema de registro.');
                break;
            default:
                console.log('Opción no válida.');
        }
    }
};

iniciarRegistro();