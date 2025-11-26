import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

// ------------------------------------
// 1. DEFINICIÓN DE TIPOS Y DATOS
// ------------------------------------

type CapacidadMap = {
  i: number;
  d: number;
  f: number;
  [key: string]: number; // Permite el acceso por string para cap[tipo]
};

interface Reserva {
  n: string; // nombre
  p: string; // país
  t: 'i' | 'd' | 'f'; // tipo (individual, doble, familiar)
  f: boolean; // fumador
  pers: number; // personas
  per: string; // periodo
  mas: boolean; // mascota
}

const r: Reserva[] = [];
const cap: CapacidadMap = { 
  i: 2, // Individual: 2 personas
  d: 4, // Doble: 4 personas
  f: 6  // Familiar: 6 personas
};

// ------------------------------------
// 2. FUNCIÓN PRINCIPAL DE REGISTRO
// ------------------------------------

function iniciarReservas(): void {
  let seguir: boolean = true;

  while (seguir) {
    const nombre: string | null = prompt('Nombre del huésped (o vacío para terminar):');
    if (!nombre) {
      seguir = false;
      continue;
    }

    const pais: string | null = prompt('País:');
    const tipoInput: string | null = prompt('Tipo de habitación (i: Individual / d: Doble / f: Familiar):');
    const tipo: string = tipoInput ? tipoInput.toLowerCase() : '';

    if (!cap[tipo]) {
      console.log('Tipo de habitación inválido.');
      continue;
    }

    const max: number = cap[tipo]; 
    const fumador: string | null = prompt('¿Fumador? (s/n):');
    const personasStr: string | null = prompt(`Personas (máx: ${max}):`);
    
    if (personasStr === null) continue;
    const personas: number = parseInt(personasStr); 
    
    if (isNaN(personas) || personas < 1 || personas > max) {
      console.log(`Máximo ${max} personas. Ingrese una cantidad válida.`);
      continue;
    }

    const periodo: string | null = prompt('Periodo de estancia (ej: 3 noches):');
    let mascota: boolean = false;

    const traeMascota: string | null = prompt('¿Trae mascota? (s/n):');
    if (traeMascota && traeMascota.toLowerCase() === 's') {
      if (tipo === 'f') {
        mascota = true;
      } else {
        console.log('Mascotas solo permitidas en habitaciones familiares (f).');
        continue;
      }
    }

    r.push({
      n: nombre,
      p: pais || '',
      t: tipo as 'i' | 'd' | 'f',
      f: fumador ? fumador.toLowerCase() === 's' : false,
      pers: personas,
      per: periodo || '',
      mas: mascota
    });
    
    const resp: string | null = prompt('Reserva guardada. ¿Desea hacer otra? (s/n):');
    if (resp && resp.toLowerCase() !== 's') {
      seguir = false;
    }
  }
  
  mostrarResumenFinal();
}

// ------------------------------------
// 3. FUNCIÓN DE RESUMEN
// ------------------------------------

function mostrarResumenFinal(): void {
  let totalPersonas: number = 0;
  let resumen: string = '--- RESUMEN DE RESERVAS ---\n';

  r.forEach((res: Reserva, i: number) => {
    totalPersonas += res.pers;
    const infoMascota: string = res.mas ? 'Sí' : 'No';
    
    resumen += 
      `#${i + 1}: ${res.n} (${res.t}, ${res.pers} pers). Mascota: ${infoMascota}\n`;
  });

  resumen += `\nTotal habitaciones: ${r.length}\n`;
  resumen += `Total personas: ${totalPersonas}`;

  console.log(resumen);
  console.log('¡Fin del sistema de reservas!');
}

// ------------------------------------
// INICIAR EL PROGRAMA
// ------------------------------------
iniciarReservas();