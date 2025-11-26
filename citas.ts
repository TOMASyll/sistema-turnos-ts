import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

// ------------------------------------
// 1. DEFINICIÓN DE TIPOS Y DATOS
// ------------------------------------

interface Cita {
    paciente: string | null;
    fecha: string | null;
    hora: string | null;
    medico: string | null;
}

const misCitas: Cita[] = [];

// ------------------------------------
// 2. FUNCIÓN PRINCIPAL (EL MENÚ)
// ------------------------------------

function iniciarPrograma(): void {
    let opcionUsuario: string | null;
    
    do {
        opcionUsuario = prompt(
            'MI SISTEMA DE CITAS \n' +
            '1. Poner Cita Nueva \n' +
            '2. Mostrar Citas \n' +
            '3. Salir \n' +
            'Dime tu opción (1, 2 o 3):'
        );
        
        if (opcionUsuario === '1') {
            ponerCita();
        } else if (opcionUsuario === '2') {
            mostrarCitas();
        } else if (opcionUsuario === '3') {
            console.log('¡Fin del programa! El programa se cerrará.');
        } else {
            console.log('Opción no válida.');
        }
    } while (opcionUsuario !== '3');
}

// ------------------------------------
// 3. FUNCIÓN PARA AGREGAR CITA
// ------------------------------------

function ponerCita(): void {
    const nombrePaciente: string | null = prompt('Dime el nombre del paciente:');
    const elDia: string | null = prompt('Dime la fecha (AAAA-MM-DD):');
    const laHora: string | null = prompt('Dime la hora (HH:MM):');
    const nombreDoctor: string | null = prompt('Dime el médico asignado:');

    const nuevaCita: Cita = { 
        paciente: nombrePaciente, 
        fecha: elDia, 
        hora: laHora, 
        medico: nombreDoctor 
    };

    misCitas.push(nuevaCita); 
    console.log('Cita guardada con éxito.');
}

// ------------------------------------
// 4. FUNCIÓN PARA VER CITAS
// ------------------------------------

function mostrarCitas(): void {
    if (misCitas.length === 0) {
        console.log('No hay ninguna cita guardada.');
        return;
    }
    
    // Ordena las citas por fecha y hora
    misCitas.sort((a: Cita, b: Cita) => {
        const tiempoA = new Date(`${a.fecha as string}T${a.hora as string}`);
        const tiempoB = new Date(`${b.fecha as string}T${b.hora as string}`);
        return tiempoA.getTime() - tiempoB.getTime(); 
    });

    let textoDeLista: string = '--- PRÓXIMAS CITAS PROGRAMADAS ---\n';

    misCitas.forEach((cita: Cita) => {
        textoDeLista += `Paciente: ${cita.paciente} | Día: ${cita.fecha} | Hora: ${cita.hora} | Doctor: ${cita.medico}\n`;
    });
    
    console.log(textoDeLista);
}

// ------------------------------------
// INICIAR EL PROGRAMA
// ------------------------------------
iniciarPrograma();