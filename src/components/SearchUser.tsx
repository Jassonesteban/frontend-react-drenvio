import { useEffect, useRef, useState } from "react";
import useSearchUsers from "../hooks/useSearchUsers";
import { User } from "../interfaces/User";

interface SearchUserProps {
  onSelectUser: (userId: string) => void;
}

const SearchUser: React.FC<SearchUserProps> = ({ onSelectUser }) => {
  const [query, setQuery] = useState("");
  const { results } = useSearchUsers(query);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSelectUser = (user: User) => {
    setQuery(user.name);
    onSelectUser(user._id);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <input
        type="text"
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Buscar usuario..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
      />

      {showDropdown && results.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-50">
          {results.map((user: User) => (
            <li
              key={user._id}
              className="p-3 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleSelectUser(user)}
            >
              {user.name} ({user.role})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUser;
