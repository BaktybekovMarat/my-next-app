"use client";
import Image from "next/image";
import Spinner from "./LoadingSpinner";
import { format } from "date-fns";
import useMovies from "../hooks/useMovies";
import Search from "./Search";
import movieShortOverview from "../app/utils/movieShortOverview";
import { Pagination, Tag } from "antd";

type Movie = {
  id: number;
  title: string;
  release_date: number;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
};
type Genre = {
  name: string;
  id: number;
};
export default function Movie() {
  const { movies, isLoading, currentPage, totalPages, setCurrentPage } =
    useMovies();

  const genres: Genre[] = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <main className="">
      <Search />
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
              <span>
                {movie.release_date
                  ? format(movie.release_date, "MMMM dd, yyyy")
                  : "Release date unavailable"}
              </span>
              <span>
                {movie.genre_ids.map((genreId) => {
                  const genre = genres.find((genre) => genre.id === genreId);

                  return (
                    <Tag className="movie-genre" key={genreId}>
                      {genre?.name ?? "Unknown genre"}
                    </Tag>
                  );
                })}
              </span>

              <div>
                {movie.overview
                  ? movieShortOverview(movie.overview)
                  : "Movie overview unavailable"}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        className="pagination"
        current={currentPage}
        total={totalPages}
        pageSize={20}
        onChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
}
