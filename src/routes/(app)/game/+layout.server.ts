import type { LayoutServerLoad } from "./$types";

import prisma from '$lib/server/db';
import { redirect } from '@sveltejs/kit';
import { progressStore } from "$lib/stores";

export const load: LayoutServerLoad = async ({cookies}) => {
    const playerToken = cookies.get('player_token');
    if (!playerToken) {
        throw redirect(303, '/');
    }

    const player = await prisma.escapePlayer.findUnique({
        where: {
            token: playerToken,
        },
        include: {
            session: {
                include: {
                    escape: true,
                    inventory: true
                },
            }
        },
    });
    
    if (!player || player.session.validUntil < new Date()) {
        redirect(303, '/');
    }

    progressStore.set(player.session.progress)

    return {
        session: player.session,
    };
};