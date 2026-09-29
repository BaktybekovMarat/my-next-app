const token = process.env.TMDB_TOKEN;

export async function GET() {
  if (!token) {
    return Response.json(
      { error: "TMDB token is not configured" },
      { status: 500 },
    );
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );
    if (!response.ok)
      return Response.json(
        { error: `Error happened ${response.statusText}` },
        { status: response.status },
      );
    const result = await response.json();
    return Response.json(result);
  } catch (error) {
    console.error("Failed to load genres:", error);

    return Response.json(
      { error: "Failed to load genres. Please try again later." },
      { status: 500 },
    );
  }
}
