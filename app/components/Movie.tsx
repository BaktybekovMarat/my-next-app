"use client";
import Image from "next/image";
import Spinner from "../components/LoadingSpinner";

type Movie = {
  id: number;
  title: string;
  release_date: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids: number[];
};
import useMovies from "../hooks/useMovies";
export default function Movie() {
  const { movies, isLoading } = useMovies();
  const genres: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    18: "Drama",
    27: "Horror",
    10749: "Romance",
    878: "Science Fiction",
  };

  if (isLoading) return <Spinner />;
 

  return (
    <ul className="movies-container">
      {movies.map((movie: Movie) => (
        <li className="movie-list" key={movie.id}>
          {movie.poster_path ? (
            <Image
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={183}
              height={281}
            />
          ) : (
            <p className="movie-poster">Poster unavailable</p>
          )}

          <div className="movie-options">
            <h3 className="movie-title">{movie.title}</h3>
            <span>{movie.release_date}</span>
            <span>
              {movie.genre_ids.map((genreId) => (
                <span className="movie-genre" key={genreId}>
                  {genres[genreId] ?? "Unknown genre"}
                </span>
              ))}
            </span>
            <div className="line-clamp-5">{movie.overview}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
