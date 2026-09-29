"use client";
import Image from "next/image";
import { format } from "date-fns";
import movieShortOverview from "../utils/movieShortOverview";
import { Tag, Rate } from "antd";
import ErrorAlert from "./ErrorAlert";
import { useEffect, useState } from "react";
import checkErrorStatus from "@/utils/checkErrorStatus";
import LoadingSpinner from "./LoadingSpinner";
import useGenres from "@/hooks/useGenres";
import getRatingColor from "@/utils/getRatingColor";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
  rating: number;
  vote_average: number;
}

export default function RatedMovies() {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { genres, genreLoading, genreError } = useGenres();
  useEffect(() => {
    const loadRateMovies = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await fetch(`/api/ratedMovies`);
        if (!response.ok) {
          const responseStatusCheck = checkErrorStatus(
            response.status,
            "Rated",
          );
          return setError(responseStatusCheck);
        }
        const result = await response.json();
        setRatedMovies(result.results);
      } catch (error) {
        console.error(error);
        if (!navigator.onLine) {
          setError("No internet connection");
        } else setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    loadRateMovies();
  }, []);

  if (loading || genreLoading) return <LoadingSpinner />;

  const errors = error || genreError;

  return errors ? (
    <ErrorAlert type="error" title={errors} />
  ) : (
    <ul className="movies-container">
      {ratedMovies.map((movie: Movie) => (
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
              className="rate"
              value={movie.rating ?? 0}
              count={10}
              size="small"
              disabled
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
