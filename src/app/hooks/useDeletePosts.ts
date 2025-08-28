import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosAPI } from "../lib/axios";
import { toast } from "react-toastify";



export const useDeletePosts = () => {

const queryClient = useQueryClient()

    return useMutation({mutationFn: async(id: string) => {
        const response = await axiosAPI.delete(`http://localhost:8000/api/posts/${id}`);
        return response.data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["posts"]})
        toast('Deleted Success.', {type:"success", position: "top-center", autoClose: 3000 })
        
    },
    onError: () => {
        toast('Failed to Delete.', {type: "error", position: "top-center", autoClose: 3000})
    }
    
})}