import { useState } from "react";
import { useQuery } from "react-query";
import { SearchMovies } from "../api/SearchMovie";
import { useDebounced } from "../hooks/useDebounced";
import { Movie } from "../types";
import MovieCard from "./MovieCard";
import SearchBox from "./SearchBox";

const MovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const search = useDebounced(searchValue, 400);
  const { isLoading } = useQuery({
    queryKey: ["search", search],
    queryFn: ({ signal }) => SearchMovies(search, signal),
    onSuccess: (data) => setMovies(data),
    enabled: searchValue.length > 0,
  });

  return (
    <div className="sm:w-full md:w-2/3 mx-auto min-h-screen ">
      <SearchBox
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        isLoading={isLoading}
      />
      <div className="max-w-2xl mx-auto px-5 flex flex-wrap justify-center gap-4">
        {movies.map(({ title, imdbId }) => (
          <MovieCard title={title} imdbId={imdbId} key={imdbId ?? title} />
        ))}
        {!movies.length && (
          <p className="text-xl text-slate-100 py-5">No Results!</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
