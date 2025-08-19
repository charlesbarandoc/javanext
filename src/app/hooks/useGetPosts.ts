import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchPost = async () => {
    const response = await axios.get("http://localhost:8000/api/posts")
    return response.data
}

const useGetPosts = () => {
    return useQuery({queryKey: ["posts"], queryFn: fetchPost},)
}
 
export {useGetPosts}