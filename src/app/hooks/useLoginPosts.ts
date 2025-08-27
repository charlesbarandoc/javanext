
import { useQuery, useMutation} from "@tanstack/react-query";
import { axiosAPI } from "../lib/axios";

export const useLoginPosts = () => {
    return useMutation({mutationFn: async ({password, email}: {password: string, email: string}) => {
        const response = await axiosAPI.post(`http://localhost:8000/api/login`, {password, email}, 
        
        );
        localStorage.setItem("token",response.data.token)
        return response.data
    },
        onSuccess: () => {
            return useQuery({queryKey: ["posts"]})}
    })}