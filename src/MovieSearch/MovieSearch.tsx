import { useState } from "react";
import { useQuery } from "react-query";
import { SearchMovies } from "../api/SearchMovie";
import { useDebounced } from "../hooks/useDebounced";
import { Movie } from "../types";

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
    <>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {isLoading && <h2>LOADING!...</h2>}
      <ul>
        {movies.map(({ title, imdbId }) => (
          <li key={imdbId}>{title}</li>
        ))}
      </ul>
    </>
  );
};

export default MovieSearch;
