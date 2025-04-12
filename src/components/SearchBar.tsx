import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"


interface IProps{
    setSearchInput: (value: string) => void
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void
    searchInput: string
}

export default function SearchBar({ setSearchInput, handleSearch, searchInput }: IProps) {

    return(
      <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-3 text-slate-400">
            <Search size={18} />
          </div>
          <Input
            type="text"
            placeholder="Search city or location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 pr-20 py-6 rounded-full border-slate-200 shadow-sm focus-visible:ring-sky-400 bg-white/90 backdrop-blur-sm"
          />
          <Button
            type="submit"
            className="absolute right-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-5 py-5 h-auto"
          >
            Search
          </Button>
        </div>
      </form>
    </div>

    )
}