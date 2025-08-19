'use client';

import { MdDeleteOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { useGetPosts } from "../hooks/useGetPosts";
import axios from "axios"; 
import { useState } from "react";
import { useDeletePosts } from "../hooks/useDeletePosts";
import 'flowbite';

const addPost = async ({title, body}: {title: string, body: string}) => {
  const response = await axios.post(
    "http://localhost:8000/api/posts", 
    {title, body},
    {withXSRFToken: true, withCredentials: true}
  )

  return response;
}

const TestPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const {data: posts, isLoading, isError, error, isFetching} = useGetPosts();

  const {mutate: postAdd, isPending} = useMutation({mutationFn: addPost, mutationKey: ['posts']});

  const {mutate: postDelete} = useDeletePosts();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // console.log(title, body)
    postAdd({title, body})
     
  }

  const deletePost = (id: string) => {
    postDelete(id);
  }
  
  if(isLoading){

        return (
        <div role="status" className="flex justify-center items-center mt-60">
            <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
        )
    }  
 
  if(isError) {
    return <p>error: {error.message}</p>
  }
  
  return(
    <div className="mt-10">
      <div className="flex flex-row justify-center">
        <h1 className="text-3xl font-bold mr-10">Javagram</h1>
        {/* <!-- Modal toggle --> */}
      <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        +
      </button>
      </div>

      {/* <pre>{JSON.stringify(postMessage,null,4)}</pre> */}
      <div className="">
        <form className="flex flex-col w-40 m-auto" onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="enter title" className="border" onChange={e => setTitle(e.target.value)} />
          <input type="text" name="body" placeholder="enter body" className="border"  onChange={e => setBody(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>

      </div>

      

        <div className="flex flex-col-reverse">
            {posts.map(post => {
              return (
              <div key={post.id} className="rounded-4xl m-auto w-75 flex flex-col 
                my-2 border-b-gray-700 border-4 p-6 bg-gray-300">
                <div className="flex flex-row mb-4">
                  <div className="rounded-full w-20 h-20 bg-gray-600"></div>
                  <p className="font-bold ml-6 mt-5">chrlsmrn</p>
                  <button onClick={() => deletePost(post.id.toString())} className="bg-red-600 ml-6 w-10 h-10 text-white flex justify-center items-center text-3xl rounded-2xl mt-4">
                    <MdDeleteOutline />
                  </button>
                </div>
                <div className="flex flex-box justify-center">
                  <div className="w-60 h-60 bg-gray-600 rounded-2xl mb-4" ></div>
                </div>
                
                <p>{post.body}</p>
                <p>{post.title}</p>
                <p><span className="font-bold">@paul </span>{post.comment}</p>
              </div>
            )})}
        </div>
    </div>
  )
}

export default TestPage