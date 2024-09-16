import { PrismaClient, StepType } from '@prisma/client';
import { hash } from "@node-rs/argon2";

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await hash("12345678", {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    await prisma.user.create({
        data: {
            id: "admin",
            email: "admin@whidix.dev",
            name: "Administateur",
            credential: passwordHash,
        }
    });

    await prisma.escapeGame.create({
        data: {
            id: "1",
            name: 'The Escape Game',
            description: "Un escape game génial",
            steps: {
                create: [
                    {
                        id: "1",
                        name: 'Bienvenue',
                        text: 'Vous venez de vous réveiller dans une pièce inconnue. Vous ne savez pas comment vous êtes arrivé là. Vous avez une heure pour vous échapper.',
                        order: 1,
                        type: StepType.TEXT,
                    },
                    {
                        id: "2",
                        name: 'Le cheval de Napoléon',
                        text: 'De quelle couleur est le cheval blanc de Napoléon ?',
                        order: 2,
                        answer: 'blanc',
                        type: StepType.QUESTION,
                    },
                    {
                        id: "3",
                        name: 'Felicitation',
                        text: 'Bien joué mon reuf',
                        order: 3,
                        type: StepType.TEXT,
                    },
                    {
                        id: "4",
                        name: 'Geo',
                        text: 'Bien joué mon reuf',
                        geo: "43.6022980326235, 1.4559152965604503",
                        order: 4,
                        type: StepType.GEO,
                    }
                ],
            },
            sessions: {
                create: [
                    {
                        id: "1",
                        code: '123456',
                        validUntil: new Date(Date.now() + 10000 * 60 * 60),
                        players: {
                            create: [
                                {
                                    token: 'player1',
                                    cgu: true,
                                },
                                {
                                    token: 'player2',
                                    cgu: false,
                                },
                            ],
                        },
                    },
                    {
                        id: "2",
                        code: '654321',
                        validUntil: new Date(Date.now() + 10000 * 60 * 60),
                        players: {
                            create: [
                                {
                                    token: 'player3',
                                    cgu: true,
                                },
                                {
                                    token: 'player4',
                                    cgu: true,
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
