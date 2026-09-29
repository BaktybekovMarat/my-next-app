import { createOrGetGuestSession } from "@/lib/createOrGetGuestSession";

const token = process.env.TMDB_TOKEN;

export async function GET() {
  if (!token) {
    return Response.json(
      {
        error: "TMDB token is not configured",
      },
      {
        status: 500,
      },
    );
  }
  const guestSession = await createOrGetGuestSession();
  if (!guestSession) {
    return Response.json(
      {
        error: ` Cookie is not configure`,
      },
      { status: 500 },
    );
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSession}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      return Response.json(
        { error: `Error happened ${response.status}` },
        { status: response.status },
      );
    }
    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    console.error("Failed to load rated movies:", error);

    return Response.json(
      { error: "Failed to load rated movies. Please try again later." },
      { status: 500 },
    );
  }
}
