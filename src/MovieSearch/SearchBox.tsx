import { ChangeEventHandler } from "react";

interface Props {
  isLoading: boolean;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = ({ isLoading, value, onChange }: Props) => (
  <div className="bg-slate-900 w-full py-5 mb-5 text-center sticky top-0 shadow-lg shadow-slate-500/20 rounded-lg">
    <label>
      <p className="mb-3 text-slate-100 text-xl font-bold block">
        Search for movies
      </p>
      <input
        className="max-w-xl md:w-full lg:w-3/4 p-2 text-slate-100 bg-slate-800 border-2 border-slate-900 rounded-md"
        name="movieSearch"
        value={value}
        onChange={onChange}
      />
    </label>
    {isLoading && <p className="text-slate-100 text-xl">LOADING!...</p>}
  </div>
);

export default SearchBox;
