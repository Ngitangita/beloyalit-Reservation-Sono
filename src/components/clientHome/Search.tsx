
function Search() {
  return (
  <div className="w-[300px]">
  <input className="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 
  py-2 transition duration-300 ease focus:outline-none 
  focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
  placeholder="Que cherchez-vous?"
  type="text"
  name="search"/>
</div>
  )
}

export default Search