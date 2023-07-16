import { useQuery } from "react-query";
import useIntersectedViewport from "../hooks/useIntersectedViewport";
import { GetMovieImage, imageUrl } from "../api/GetMovieImage";

interface Props {
  title: string;
  imdbId?: string;
}

const intersectionOptions = { rootMargin: "0px 0px 300px" };

const MovieCard = ({ title, imdbId }: Props) => {
  const { ref, hasIntersected } = useIntersectedViewport(intersectionOptions);
  const { data: posterPath, isSuccess } = useQuery({
    queryKey: ["tmdb/poster", imdbId],
    queryFn: ({ signal }) => GetMovieImage(imdbId!, signal),
    enabled: !!imdbId && hasIntersected,
  });
  const isPosterReady = isSuccess && posterPath;
  const hasNoPoster = !imdbId || (isSuccess && !posterPath);

  return (
    <div
      className="border-2 border-slate-950 bg-slate-800 rounded-sm w-min text-center"
      ref={ref}
    >
      <div style={{ minWidth: "185px", minHeight: "278px" }}>
        {isPosterReady && (
          <img src={imageUrl(posterPath, "w185")} alt={`${title} poster`} />
        )}
        {hasNoPoster && (
          <p className="text-red-500 h-full">No poster available</p>
        )}
      </div>
      <p className="text-slate-100 my-2">{title}</p>
    </div>
  );
};

export default MovieCard;
