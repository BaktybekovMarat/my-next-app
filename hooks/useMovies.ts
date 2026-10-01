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
  rating: number;
}

export default function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesError, setMoviesError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      setMoviesError("");
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
          setMoviesError(responseStatusCheck);
          return;
        }
        const result = await response.json();
        setTotalResults(result.total_results);
        setMovies(result.results);
        console.log(result.results);
      } catch (error) {
        console.error(error);
        setMoviesError("Failed to load movies");
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
    moviesError,
  };
}
