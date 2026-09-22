// export async function GET() {
//   const token = process.env.TMDB_TOKEN;
//   const response = await fetch(
//     "https://api.themoviedb.org/3/search/movie?query=return",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: "application/json",
//       },
//     },
//   );
//   if (!response.ok) {
//     throw new Error("Error happened" + response.status);
//   }
//   const result = await response.json();
//   return Response.json(result);
// }
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page");
  const token = process.env.TMDB_TOKEN;
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query ?? "")}&page=${page ?? 1}`,
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
