import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
  // Import the session from parent layout
  const { session } = await parent()
  throw redirect(303, `/game/play/${session.progress}`)
};