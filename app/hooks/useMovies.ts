"use client";
import { useEffect, useState } from "react";

export default function useMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      const response = await fetch(`/api/movies?query=return`);

      if (!response.ok) {
        throw new Error("Error happened" + response.status);
      }
      const result = await response.json();
      console.log(result.results);
      setMovies(result.results);
      setIsLoading(false);
    };
    loadMovie();
  }, []);

  return { movies, isLoading };
}
