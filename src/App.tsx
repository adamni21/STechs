import { QueryClient, QueryClientProvider } from "react-query";
import MovieSearch from "./MovieSearch/MovieSearch";

// increase cache time as the data should be pretty static
//                hh   mm   ss     ms
const cacheTime = 24 * 60 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnWindowFocus: false, cacheTime },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-slate-900">
        <MovieSearch />
      </main>
    </QueryClientProvider>
  );
}

export default App;
