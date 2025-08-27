import { useQuery } from "@tanstack/react-query"
import { axiosAPI } from "../lib/axios"

const fetchPost = async () => {
    const response = await axiosAPI.get("http://localhost:8000/api/posts")
    return response.data
}

const useGetPosts = () => {
    return useQuery({queryKey: ["posts"], queryFn: fetchPost},)

}
 
export {useGetPosts}