"use client";
import { useEffect, useState } from "react";
import checkErrorStatus from "@/utils/checkErrorStatus";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
  vote_average: number;
}

export default function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [getMoviesError, setGetMoviesError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      setGetMoviesError("");
      setLoading(true);
      try {
        const response = await fetch(
          `/api/movies?query=return&page=${currentPage}`,
        );
        if (!response.ok) {
          const responseStatusCheck = checkErrorStatus(
            response.status,
            "useMovies",
          );
          setGetMoviesError(responseStatusCheck);
          return;
        }
        const result = await response.json();
        setTotalResults(result.total_results);
        setMovies(result.results);
        console.log(result.results);
      } catch (error) {
        console.error(error);
        if (!navigator.onLine) {
          setGetMoviesError("No internet connection");
        } else setGetMoviesError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [currentPage]);

  return {
    movies,
    setLoading,
    totalResults,
    currentPage,
    setCurrentPage,
    loading,
    getMoviesError,
  };
}
