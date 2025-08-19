import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"

const newPost = {
    title: '',
    body: ''
}

const { mutate } = useMutation({
    const addPost = async() => {
        const response = await axios.post("http://127.0.0.1:8000/api/posts", {newPost})
        return response.data
    }
})


const usePostPosts = () => {
    return {mutationFn: mutate}
}

export {usePostPosts}