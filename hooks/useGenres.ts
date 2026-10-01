"use client";
import { useEffect, useState } from "react";
import checkErrorStatus from "@/utils/checkErrorStatus";

type Genres = {
  id: number;
  name: string;
};

export default function useGenres() {
  const [genres, setGenres] = useState<Genres[]>([]);
  const [genresError, setGenresError] = useState("");
  const [genresLoading, setGenresLoading] = useState(true);
  useEffect(() => {
    const loadMovie = async () => {
      setGenresError("");
      setGenresLoading(true);
      try {
        const response = await fetch(`/api/genre`);
        if (!response.ok) {
          const responseStatusCheck = checkErrorStatus(
            response.status,
            "useGenres",
          );
          setGenresError(responseStatusCheck);
          return;
        }
        const result = await response.json();
        setGenres(result.genres);
      } catch (error) {
        console.error(error);
        setGenresError("Failed to load genres");
      } finally {
        setGenresLoading(false);
      }
    };

    loadMovie();
  }, []);

  return {
    genresLoading,
    genres,
    genresError,
  };
}
