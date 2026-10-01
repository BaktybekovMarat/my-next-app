"use client";

import Image from "next/image";
import { format } from "date-fns";
import movieShortOverview from "../utils/movieShortOverview";
import { Tag, Rate } from "antd";
import ErrorAlert from "./ErrorAlert";
import { useState } from "react";
import checkErrorStatus from "@/utils/checkErrorStatus";
import LoadingSpinner from "./LoadingSpinner";
import useGenres from "../hooks/useGenres";
import getRatingColor from "@/utils/getRatingColor";
import useGetRatedMovies from "@/hooks/useGetRatedMovies";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
  vote_average: number;
  rating: number;
}
type Props = {
  movies: Movie[];
  moviesError: string;
};

type Ratings = {
  [movieId: number]: number;
};

export default function MovieCard({ movies, moviesError }: Props) {
  const [ratings, setRatings] = useState<Ratings>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { genres, genresError, genresLoading } = useGenres();
  const { ratedMovies, ratedError, loadingRatedMovies } = useGetRatedMovies();

  const handleRating = async (movieRating: number, movieId: number) => {
    setError("");
    setLoading(true);
    try {
      const response = await fetch(`/api/rateMovies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          accept: "application/json",
        },
        body: JSON.stringify({
          movieId: movieId,
          rating: movieRating,
        }),
      });
      if (!response.ok) {
        const responseStatusCheck = checkErrorStatus(
          response.status,
          "SetMoviesRate",
        );
        return setError(responseStatusCheck);
      }
      const result = await response.json();

      setRatings((prev) => ({
        ...prev,
        [result.movieId]: result.rating,
      }));
    } catch (error) {
      console.error(error);
      setError("Failed to create rating");
    } finally {
      setLoading(false);
    }
  };
  if (loading || genresLoading || loadingRatedMovies) return <LoadingSpinner />;
  const errors = error || genresError || moviesError || ratedError;
  return errors ? (
    <ErrorAlert type="error" title={errors} />
  ) : (
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
              loading="eager"
            />
          ) : (
            <p className="movie-poster">Poster unavailable</p>
          )}

          <div className="movie-options">
            <h3 className="movie-title">{movie.title}</h3>
            <span
              className="ratingBall"
              style={{ borderColor: getRatingColor(movie.vote_average) }}
            >
              {movie.vote_average.toFixed(1) ?? 0}
            </span>
            <span className="movie-date">
              {movie.release_date
                ? format(movie.release_date, "MMMM dd, yyyy")
                : "Release date unavailable"}
            </span>
            <span className="movie-date">
              {movie.genre_ids.map((genreId) => {
                const genre = genres.find((genre) => genre.id === genreId);
                return (
                  <Tag className="movie-tags" key={genreId}>
                    {genre?.name ?? "Unknown genre"}
                  </Tag>
                );
              })}
            </span>

            <div className="movie-overview">
              {movie.overview
                ? movieShortOverview(movie.overview)
                : "Movie overview unavailable"}
            </div>

            <Rate
              className="movie-rate"
              value={
                ratings[movie.id] ??
                ratedMovies.find((ratedMovie) => ratedMovie.id === movie.id)
                  ?.rating ??
                0
              }
              count={10}
              size="small"
              allowClear={false}
              onChange={(movieRating) => handleRating(movieRating, movie.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
