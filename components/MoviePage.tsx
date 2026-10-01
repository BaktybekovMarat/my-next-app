"use client";

import Search from "@/components/Search";
import MoviesCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";
import useMovies from "../hooks/useMovies";
import { Pagination } from "antd";
import Link from "next/link";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import ErrorAlert from "./ErrorAlert";

export default function MoviePage() {
  const {
    movies,
    currentPage,
    setCurrentPage,
    totalResults,
    loading,
    moviesError,
  } = useMovies();
  const isConnected = useOnlineStatus();

  if (loading) return <LoadingSpinner />;

  return (
    <main>
      {isConnected && <ErrorAlert type="error" title={isConnected} />}
      <div className="SearchRated">
        <Link className="Search active" href="/">
          Search
        </Link>
        <Link className="Rated" href="/rated">
          Rated
        </Link>
      </div>
      <Search />
      <MoviesCard movies={movies} moviesError={moviesError} />
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
