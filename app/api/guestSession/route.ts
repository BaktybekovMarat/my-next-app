import { cookies } from "next/headers";

const token = process.env.TMDB_TOKEN;

export async function GET() {
  if (!token) {
    return Response.json(
      { error: "TMDB token is not configured" },
      { status: 500 },
    );
  }
  const COOKIE_NAME = "guest-session";
  const cookieStore = await cookies();
  const guestSession = cookieStore.get(COOKIE_NAME)?.value;
  if (!guestSession) {
    try {
      const guestSessionResponse = await fetch(
        "https://api.themoviedb.org/3/authentication/guest_session/new",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
      if (!guestSessionResponse.ok)
        return Response.json(
          { error: `Error happened ${guestSessionResponse.status}` },
          { status: guestSessionResponse.status },
        );
      const guestSessionResult = await guestSessionResponse.json();

      cookieStore.set(COOKIE_NAME, guestSessionResult.guest_session_id, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        expires: new Date(guestSessionResult.expires_at),
      });
      return Response.json({
        success: true,
        message: "Guest session created successfully",
      });
    } catch (error) {
      console.error("Failed to create guest session", error);
      return Response.json(
        {
          error: "Failed to create guest session. Please try again later",
        },
        { status: 500 },
      );
    }
  }
  return Response.json({
    success: true,
    message: "Guest session already exists",
  });
}
