import RatedMovies from "@/components/Rated";
import Link from "next/link";
export default function RatedPage() {
  return (
    <main>
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
