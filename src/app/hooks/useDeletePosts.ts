import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";



export const useDeletePosts = () => {

const queryClient = useQueryClient()

    return useMutation({mutationFn: async(id: string) => {
        const response = await axios.delete(`http://localhost:8000/api/posts/${id}`);
        return response.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["posts"]})

        return useQuery({queryKey:["posts"]})
    }
})}