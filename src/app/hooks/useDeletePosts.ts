import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeletePosts = () => {
    return useMutation({mutationFn: async(id: string) => {
        const response = await axios.delete(`http://localhost:8000/api/posts/${id}`);
        return response.data
    },
    onSuccess: () => {
        return useQuery({queryKey:["posts"]})
    }
})}