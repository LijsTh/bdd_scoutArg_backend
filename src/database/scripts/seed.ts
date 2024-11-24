import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  // Leer y procesar el archivo de equipos
  const teamsData = fs.readFileSync(
    './src/database/scripts/data/clubes_ascenso_base.txt',
    'utf-8',
  );
  const teams = teamsData.split(';').map((team) => team.trim());

  // Insertar equipos en la base de datos
  const teamPromises = teams.map((teamName) =>
    prisma.teams.create({
      data: { name: teamName },
    }),
  );

  // Esperar que todos los equipos se inserten
  await Promise.all(teamPromises);
  console.log('Equipos insertados exitosamente!');

  // Leer y procesar el archivo CSV de jugadores
  const playersData = fs.readFileSync(
    './src/database/scripts/data/jugadores_ascenso_base.csv',
    'utf-8',
  );
  const players = playersData.split('\n').map((line) => {
    const [name, age, position, number, teamName] = line
      .split(';')
      .map((field) => field.trim());
    return {
      name,
      age: parseInt(age, 10),
      position,
      number: parseInt(number, 10),
      teamName,
    };
  });

  // Insertar jugadores en la base de datos
  for (const player of players) {
    // Buscar el equipo por nombre
    const team = await prisma.teams.findFirst({
      where: { name: player.teamName },
    });

    if (!team) {
      console.error(`Equipo no encontrado: ${player.teamName}`);
      continue; // Saltar al siguiente jugador si no se encuentra el equipo
    }

    // Insertar el jugador y asociarlo al equipo
    await prisma.players.create({
      data: {
        name: player.name,
        age: player.age,
        position: player.position,
        number: player.number,
        team: { connect: { id: team.id } }, // Conectar al equipo
      },
    });
  }

  console.log('Jugadores insertados exitosamente!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
