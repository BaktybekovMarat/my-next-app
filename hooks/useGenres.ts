"use client";
import { useEffect, useState } from "react";
import checkErrorStatus from "@/utils/checkErrorStatus";

type Genres = {
  id: number;
  name: string;
};

export default function useGenres() {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [genreError, setGenreError] = useState("");
  const [genreLoading, setGenreLoading] = useState(true);
  useEffect(() => {
    const loadMovie = async () => {
      setGenreError("");
      setGenreLoading(true);
      try {
        const response = await fetch(`/api/genre`);
        if (!response.ok) {
          const responseStatusCheck = checkErrorStatus(
            response.status,
            "useGenres",
          );
          setGenreError(responseStatusCheck);
          return;
        }
        const result = await response.json();
        setGenres(result.genres);
      } catch (error) {
        console.error(error);
        if (!navigator.onLine) {
          setGenreError("No internet connection");
        } else setGenreError("Failed to load movies");
      } finally {
        setGenreLoading(false);
      }
    };

    loadMovie();
  }, []);

  return {
    genreLoading,
    genres,
    genreError,
  };
}
