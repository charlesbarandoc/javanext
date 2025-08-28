"use client"
import { useQuery, useMutation} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axiosAPI } from "../lib/axios";
import { toast } from 'react-toastify';

export const useLoginPosts = () => {
    return useMutation({mutationFn: async ({password, email}: {password: string, email: string}) => {
        const response = await axiosAPI.post(`http://localhost:8000/api/login`, {password, email}, 
        
        );
        localStorage.setItem("token",response.data.token)
        return response.data
    },
        onSuccess: () => {
            toast("Login Success!", {autoClose: 3000, type: "success", theme: "light", position: "top-center"})
        },

        onError: () => {
            toast("Login Failed! Please Try Again.", {autoClose: 3000, type: "error", theme: "light", position: "top-center"})
        }
        
    })
}
    