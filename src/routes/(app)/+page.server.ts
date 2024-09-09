import type { PageServerLoad, Actions } from './$types';
import { setError, superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import prisma from '$lib/server/db';

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema)),
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const { code, cgu } = form.data;

        if (!cgu) {
            return setError(form, 'cgu', 'You must accept the terms and conditions');
        }

        try {
            const escapeSession = await prisma.escapeSession.findFirst({
                where: {
                    AND: [
                        {
                            code,
                        },
                        {
                            validUntil: {
                                gte: new Date(),
                            },
                        },
                    ],
                },
            });
            if (!escapeSession) {
                return setError(form, 'code', 'Invalid code');
            }
            const player = await prisma.escapePlayer.create({
                data: {
                    session: {
                        connect: {
                            id: escapeSession.id,
                        },
                    },
                    cgu,
                },
            });
            // Calculate token max age in seconds from session validUntil
            const tokenMaxAge = Math.floor((escapeSession.validUntil - Date.now()) / 1000);
            // Set player cookie and redirect to game
            event.cookies.set("player_token", player.token, { path: "/game", maxAge: tokenMaxAge, sameSite: "lax", secure: false });
        } catch (error) {
            console.error(error);
            return fail(500, {
                form,
                error,
            });
        }
        redirect(303, '/game/tutorial');
    },
};