"use client";
import { useEffect, useState } from "react";

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadMovie = async () => {
      const response = await fetch(
        `/api/movies?query=return&page=${currentPage}`,
      );

      if (!response.ok) {
        throw new Error("Error happened" + response.status);
      }
      const result = await response.json();
      console.log(result);
      setTotalPages(result.total_results);
      setMovies(result.results);
      setIsLoading(false);
    };
    loadMovie();
  }, [currentPage]);

  return { movies, isLoading, totalPages, currentPage, setCurrentPage };
}
