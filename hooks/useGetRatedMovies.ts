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
  rating: number;
  vote_average: number;
}

export default function useGetRatedMovies() {
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [ratedError, setRatedError] = useState("");
  const [loadingRatedMovies, setLoadingRatedMovies] = useState(false);

  useEffect(() => {
    const loadRateMovies = async () => {
      setRatedError("");
      setLoadingRatedMovies(true);
      try {
        const response = await fetch(`/api/ratedMovies`);
        if (!response.ok) {
          const responseStatusCheck = checkErrorStatus(
            response.status,
            "RatedMovies",
          );
          return setRatedError(responseStatusCheck);
        }
        const result = await response.json();
        setRatedMovies(result.results);
        console.log(result);
      } catch (error) {
        console.error(error);
        setRatedError("Failed to load rated movies");
      } finally {
        setLoadingRatedMovies(false);
      }
    };
    loadRateMovies();
  }, []);

  return {
    ratedMovies,
    ratedError,
    loadingRatedMovies,
  };
}
