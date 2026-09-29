"use client";

import Search from "@/components/Search";
import MoviesCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import useMovies from "../hooks/useMovies";
import { Pagination } from "antd";
import Link from "next/link";

export default function MoviePage() {
  const {
    movies,
    currentPage,
    setCurrentPage,
    totalResults,
    loading,
    getMoviesError,
  } = useMovies();

  if (loading) return <LoadingSpinner />;

  return (
    <main>
      <div className="SearchRated">
        <Link className="Search active" href="/">
          Search
        </Link>
        <Link className="Rated" href="/rated">
          Rated
        </Link>
      </div>
      <Search />
      <MoviesCard movies={movies} getMoviesError={getMoviesError} />
      <Pagination
        className="pagination"
        current={currentPage}
        total={totalResults}
        pageSize={20}
        onChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
}
