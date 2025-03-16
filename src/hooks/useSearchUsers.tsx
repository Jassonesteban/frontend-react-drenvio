import { useEffect, useState } from "react";
import { User } from "../interfaces/User";
import { searchUsers } from "../services/user";

const useSearchUsers = (query:string) => {

    const[results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(!query){
            setResults([]);
            return;
        }

        const fetchUsers = async() => {
            setLoading(true);
            const users = await searchUsers(query);
            setResults(users);
            setLoading(false);
        };

        const debounce = setTimeout(fetchUsers, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    return {results, loading}
}

export default useSearchUsers;