import { createOrGetGuestSession } from "@/lib/createOrGetGuestSession";

type RatingMovieIdType = {
  movieId: number;
  rating: number;
};

const token = process.env.TMDB_TOKEN;

export async function POST(request: Request) {
  if (!token) {
    return Response.json(
      { error: "TMDB token is not configured" },
      { status: 500 },
    );
  }

  try {
    const guestSession = await createOrGetGuestSession();

    if (!guestSession) {
      return Response.json(
        {
          error: ` Cookie is not configure`,
        },
        { status: 500 },
      );
    }
    const { movieId, rating }: RatingMovieIdType = await request.json();
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSession}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          value: rating,
        }),
      },
    );
    if (!response.ok)
      return Response.json(
        { error: `Error happened ${response.status}` },
        { status: response.status },
      );

    const result = await response.json();

    console.log(result);
    return Response.json({
      success: true,
      movieId,
      rating,
    });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  if (!token) {
    return Response.json(
      { error: "TMDB token is not configured" },
      { status: 500 },
    );
  }

  try {
    const guestSession = await createOrGetGuestSession();

    if (!guestSession) {
      return Response.json(
        {
          error: ` Cookie is not configure`,
        },
        { status: 500 },
      );
    }
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("movieId");
    if (!movieId) {
      return Response.json(
        {
          error: "Movie ID is required",
        },
        { status: 400 },
      );
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/account_states?guest_session_id=${guestSession}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok)
      return Response.json(
        { error: `Error happened ${response.status}` },
        { status: response.status },
      );
    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    console.error("Failed to save rate movies:", error);

    return Response.json(
      { error: "Failed to load rate movies. Please try again later." },
      { status: 500 },
    );
  }
}
