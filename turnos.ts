// --- CAMBIO AQUÍ ---
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });
// --------------------

const colaDeTurnos: number[] = [];
let contadorTurnos: number = 0;

function mostrarMenu(): void {
  const opcion: string | null = prompt(
    '--- SISTEMA DE TURNOS BANCO ---\n' +
    '1. Tomar un turno\n' +
    '2. Llamar al siguiente cliente\n' +
    '3. Mostrar cola de espera\n' +
    '4. Mostrar contador de turnos\n' +
    '5. Salir\n' +
    'Seleccione una opción:'
  );
  switch (opcion) {
    case '1':
      tomarTurno();
      break;
    case '2':
      llamarCliente();
      break;
    case '3':
      mostrarCola();
      break;
    case '4':
      mostrarContador();
      break;
    case '5':
      console.log('¡Gracias por usar el sistema de turnos!');
      break;
    default:
      console.log('Opción no válida.');
      mostrarMenu();
  }
}

function tomarTurno(): void {
  contadorTurnos++;
  colaDeTurnos.push(contadorTurnos);
  console.log(`Su turno es: ${contadorTurnos}`);
  mostrarMenu();
}

function llamarCliente(): void {
  if (colaDeTurnos.length === 0) {
    console.log('No hay clientes en espera.');
  } else {
    const turnoLlamado: number = colaDeTurnos.shift() as number; 
    console.log(`Turno llamado: ${turnoLlamado}`);
  }
  mostrarMenu();
}

function mostrarCola(): void {
  if (colaDeTurnos.length === 0) {
    console.log('No hay clientes en la cola de espera.');
  } else {
    console.log('Cola de espera: ' + colaDeTurnos.join(', '));
  }
  mostrarMenu();
}

function mostrarContador(): void {
  console.log(`Total de turnos tomados: ${contadorTurnos}`);
  mostrarMenu();
}

mostrarMenu();