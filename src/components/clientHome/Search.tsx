import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react"; 

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const qParam = searchParams.get("q") || "";
  const [q, setQ] = useState(qParam);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (q) {
      setSearchParams({ q });
      if (window.location.pathname !== '/catalogue') {
        navigate('/catalogue');
      }
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-[300px]">
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Que cherchez-vous?"
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      />
    </form>
  );
}
