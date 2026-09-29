import { cookies } from "next/headers";

interface GuestSessionResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}
const token = process.env.TMDB_TOKEN;
export async function createOrGetGuestSession() {
  if (!token) {
    return Response.json(
      { error: "TMDB token is not configured" },
      { status: 500 },
    );
  }
  const COOKIES_NAME = "guest-session";
  const cookiesStore = await cookies();
  let guestSession = cookiesStore.get(COOKIES_NAME)?.value;
  if (!guestSession) {
    const guestSessionResponse = await fetch(
      "https://api.themoviedb.org/3/authentication/guest_session/new",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    if (!guestSessionResponse.ok) {
      throw new Error(
        "Failed to create guest session" + guestSessionResponse.status,
      );
    }
    const guestSessionResult: GuestSessionResponse =
      await guestSessionResponse.json();

    guestSession = guestSessionResult.guest_session_id;

    cookiesStore.set(COOKIES_NAME, guestSession, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(guestSessionResult.expires_at),
    });
  }
  return guestSession;
}
