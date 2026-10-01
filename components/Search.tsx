"use client";
import { useState, useRef } from "react";
import ErrorAlert from "./ErrorAlert";
import Image from "next/image";
import { Spin } from "antd";
import checkErrorStatus from "@/utils/checkErrorStatus";

interface Movies {
  id: number;
  title: string;
  release_date: number;
  overview: string;
  poster_path: string | null;
  genre_ids: number[];
}

export default function Search() {
  const [movies, setMovie] = useState<Movies[]>([]);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputQuery, setInputQuery] = useState("");

  const searchMovie = async (
    event: React.ChangeEvent<HTMLInputElement>,
    debounceTimer = 500,
  ) => {
    const query = event.currentTarget.value.trim();
    setInputQuery(query);

    try {
      setLoading(true);
      if (clearTimer.current !== null) clearTimeout(clearTimer.current);
      clearTimer.current = setTimeout(async () => {
        const response = await fetch(`/api/movies?query=${query}`);

        if (!response.ok) {
          const responseStatusCheck = checkErrorStatus(
            response.status,
            "Search",
          );
          setError(`Search failed ${responseStatusCheck}`);
        }
        const result = await response.json();

        setMovie(result.results);
      }, debounceTimer);
    } catch (error) {
      console.error(error);
      setError("Failed to search movies");
    } finally {
      setLoading(false);
    }
  };
  const errors = error;
  return errors ? (
    <ErrorAlert type="error" title={errors}></ErrorAlert>
  ) : (
    <>
      <div className="search-input">
        <input
          type="text"
          placeholder="Type to search..."
          required
          onChange={searchMovie}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              if (clearTimer.current !== null) {
                clearTimeout(clearTimer.current);
                setMovie([]);
              }
            }
          }}
        />
      </div>
      <ul className="search-container">
        {loading && (
          <Spin
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          />
        )}
        {inputQuery.trim() !== "" && !loading && movies.length === 0 && (
          <p>Cant found movies with current name</p>
        )}
        {movies.slice(0, 4).map((movie) => (
          <li className="search-list" key={movie.id}>
            {movie.poster_path ? (
              <Image
                className="search-movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={40}
                height={50}
                loading="eager"
              />
            ) : (
              <p className="search-movie-poster">? Poster unavailable - - - </p>
            )}
            <h3 className="movie-title">{movie.title}</h3>
          </li>
        ))}
      </ul>
    </>
  );
}
