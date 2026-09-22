"use client";
import { useState, useRef } from "react";
type Movies = {
  id: number;
  title: string;
  release_date: number;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
};
type Movie = {
  title: string;
  id: number;
};

export default function Search() {
  const [movies, setMovie] = useState<Movies[]>([]);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchMovie = async (
    event: React.ChangeEvent<HTMLInputElement>,
    debounceTimer = 300,
  ) => {
    const query = event.currentTarget.value;
    if (clearTimer.current !== null) clearTimeout(clearTimer.current);

    clearTimer.current = setTimeout(async () => {
      const response = await fetch(`/api/movies?query=${query}&per_page=2`);

      if (!response.ok) {
        throw new Error("Error happened" + response.status);
      }
      const result = await response.json();
      setMovie(result.results);
    }, debounceTimer);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Type to search..."
          required
          onChange={searchMovie}
        />
      </div>
      <div>
        {movies.map((movie: Movie) => (
          <span key={movie.id}>{movie.title}</span>
        ))}
      </div>
    </>
  );
}
