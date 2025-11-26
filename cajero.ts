import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

// ------------------------------------
// 1. DEFINICIÓN DE TIPOS Y DATOS
// ------------------------------------

interface Cliente {
  doc: string;
  clave: string;
  saldo: number;
}

const clientes: Cliente[] = [
  { doc: '12345678', clave: '1234', saldo: 1000 },
  { doc: '87654321', clave: '4321', saldo: 500 }
];

// ------------------------------------
// 2. FUNCIÓN PRINCIPAL DE INICIO
// ------------------------------------

function iniciarCajero(): void {
  const docEntrada: string | null = prompt('Documento:');
  const pinEntrada: string | null = prompt('PIN:');
  
  if (docEntrada === null || pinEntrada === null) {
      console.log('Operación cancelada.');
      return;
  }

  // Busca al usuario
  const miUsuario: Cliente | undefined = clientes.find(u => u.doc === docEntrada && u.clave === pinEntrada);
  
  if (miUsuario) {
    menu(miUsuario);
  } else {
    console.log('Documento o PIN incorrectos.');
  }
}

// ------------------------------------
// 3. FUNCIÓN DEL MENÚ
// ------------------------------------

function menu(usuario: Cliente): void {
  let opcion: string | null;
  let seguir: boolean = true;

  do {
    opcion = prompt(
      '--- MENÚ DE CAJERO ---\n' +
      '1. Ver Saldo\n' +
      '2. Sacar Dinero\n' +
      '3. Salir\n' +
      'Opción:'
    );

    switch (opcion) {
      case '1':
        console.log(`Su saldo es: $${usuario.saldo}`);
        break;

      case '2':
        const montoStr: string | null = prompt('Monto a retirar:');
        
        if (montoStr === null) break;
        
        const monto: number = parseFloat(montoStr);
        
        if (monto > 0 && monto <= usuario.saldo) {
          usuario.saldo -= monto;
          console.log(`Retiro OK. Nuevo saldo: $${usuario.saldo}`);
        } else {
          console.log('Monto no válido o saldo insuficiente.');
        }
        break;

      case '3':
        seguir = false;
        console.log('Gracias. ¡Hasta luego!');
        break;

      default:
        console.log('Opción no válida.');
    }
    
  } while (seguir);
}

// ------------------------------------
// INICIAR EL PROGRAMA
// ------------------------------------
iniciarCajero();