export async function GET() {
  const token = process.env.TMDB_TOKEN;
  const response = await fetch(
    "https://api.themoviedb.org/3/search/movie?query=return",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Error happened" + response.status);
  }
  const result = await response.json();
  return Response.json(result);
}
