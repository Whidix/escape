import type { PageServerLoad, Actions } from "./$types";
import { superValidate, fail, setError } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { verify } from "@node-rs/argon2";
import { lucia } from "$lib/server/auth";
import prisma from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

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

	  const { email, password } = form.data;

	  try {
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

        if (user === null) {      
            return setError(form, 'email', 'Erreur, utilisateur introuvable')
        }

		const validPassword = await verify(user.credential, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return setError(form, 'password', 'Erreur, utilisateur introuvable')
		}

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: "/admin",
            ...sessionCookie.attributes
        });
	  } catch {
		// invalid credentials
		return fail(400);
	  }
	  throw redirect(302, '/admin');
	}
};
