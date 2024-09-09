import { fail, redirect, type Actions } from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import prisma from '$lib/server/db';
import { StepType } from '@prisma/client';
import { setError, superValidate } from "sveltekit-superforms";
import { formSchema as QuestionSchema } from "$lib/components/forms/QuestionSchema";
import { zod } from "sveltekit-superforms/adapters";


export const load: PageServerLoad = async ({params, parent}) => {
    const {step} = params;
    let form = null;

    if (isNaN(parseInt(step))) {
        throw redirect(302, '/game/play');
    }

    const stepNumber = parseInt(step);

    const { session } = await parent();

    let escapeSession = await prisma.escapeSession.findUnique({
        where: {
            id: session.id
        }
    }) 

    if (stepNumber < 1 || stepNumber > escapeSession.progress) {
        throw redirect(302, '/game/play');
    }

    const escapeStep = await prisma.escapeStep.findUnique({
        where: {
            escapeId_order: {
                escapeId: session.escapeId,
                order: stepNumber,
            },
        },
        select: {
            id: true,
            name: true,
            order: true,
            type: true,
            text: true,
            puzzle: true,
            geo: true,
        },
    });

    if (escapeStep.type === StepType.TEXT && stepNumber === escapeSession.progress) {
        escapeSession = await prisma.escapeSession.update({
            where: {
                id: session.id
            },
            data: {
                progress: {increment: 1}
            }
        })
    } else if (escapeStep.type === StepType.QUESTION) {
        form = await superValidate({escapeId: escapeSession.id},zod(QuestionSchema))
    }

    return {
        step: escapeStep,
        progress: escapeSession.progress,
        form
    };
}

export const actions: Actions = {
    question: async (event) => {
        const form = await superValidate(event, zod(QuestionSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const { answer, escapeId } = form.data;

        let escapeSession = await prisma.escapeSession.findUnique({
            where: {
                id: escapeId
            }
        })

        const escapeStep = await prisma.escapeStep.findUnique({
            where: {
                escapeId_order: {
                    escapeId: escapeSession.id,
                    order: escapeSession.progress,
                },
            },
        })

        if (answer !== escapeStep.answer) {
            return setError(form, 'answer', 'Mauvaise réponse');
        }

        escapeSession = await prisma.escapeSession.update({
            where: {
                id: escapeSession.id
            },
            data: {
                progress: {increment: 1}
            }
        })

        return {
            status: 200,
            body: {
                success: true,
            },
        }
    }
}