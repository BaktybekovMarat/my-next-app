"use client";
import RatedMovies from "@/components/Rated";
import Link from "next/link";
import useOnlineStatus from "@/hooks/useOnlineStatus";
import ErrorAlert from "@/components/ErrorAlert";
export default function RatedPage() {
  const connection = useOnlineStatus();
  return (
    <main>
      {connection && <ErrorAlert type="error" title={connection} />}
      <div className="SearchRated">
        <Link className="Search" href="/">
          Search
        </Link>
        <Link className="Rated active" href="/rated">
          Rated
        </Link>
      </div>
      <RatedMovies />
    </main>
  );
}
