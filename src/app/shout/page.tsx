'use client';

import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetPosts } from "../hooks/useGetPosts";
import { useState } from "react";
import { useDeletePosts } from "../hooks/useDeletePosts";
import 'flowbite';
import { axiosAPI } from "../lib/axios";
import { toast } from "react-toastify";


const addPost = async ({title, body}: {title: string, body: string}) => {
  const response = await axiosAPI.post(
    "http://localhost:8000/api/posts", 
    {title, body},
    {withXSRFToken: true, withCredentials: true},

  )

  return response;
}

const TestPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();
  const [editingModal, setEditingModal] = useState(false);
  const [postModal, setPostModal] = useState(false);

  const {data: posts, isLoading, isError, error, isFetching,} = useGetPosts();


  const {mutate: postAdd} = useMutation(
    {mutationFn: addPost, 
    mutationKey: ['posts'],     
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["posts"]})
      toast('Add new post successful.', { position: "top-center", autoClose: 3000,  type: "success"})
    }});

  const {mutate: postDelete} = useDeletePosts();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    // console.log(title, body)
    postAdd({title, body})
    setPostModal(false)
     
  }

  const deletePost = (id: string) => {
    postDelete(id);
  }

  const editPost = (id: string) => {
    setEditingModal(true);
  }

  const addPostModal = () => {
    setPostModal(true)
  }
  
  if(isLoading){

        return (
        // <div role="status" className="flex justify-center items-center mt-60">
        //     <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        //         <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        //     </svg>
        //     <span className="sr-only">Loading...</span>
        // </div>
        <div role="status" className="max-w-sm animate-pulse flex flex-col justify-center items-center m-auto mt-13 duration-1000">
          <div className="w-110 h-20 bg-gray-200 rounded-4xl dark:bg-gray-500 mb-6"></div>
          <div className="w-110 h-40 bg-gray-200 rounded-4xl dark:bg-gray-500 mb-4"></div>
          <div className="w-110 h-40 bg-gray-200 rounded-4xl dark:bg-gray-500 mb-4"></div>
          <div className="w-110 h-40 bg-gray-200 rounded-4xl dark:bg-gray-500 mb-4"></div>
        </div>
        )
    }  
 
  if(isError) {
    return <p>error: {error.message}</p>
  }
  
  return(
    <div className="mt-10">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-bold mr-10">Shout It Out</h1>
        {/* <!-- Modal toggle --> */}
      <button onClick={addPostModal} className="shadow-[0px_4px_8px_3px_rgba(0,_0,_0,_0.1)] cursor-pointer block w-10 h-10 text-2xl font-black text-black border-3 bg-white hover:bg-blue-400 rounded-lg transition-transform duration-5000">
        +
      </button>
      </div>

      {/* <pre>{JSON.stringify(postMessage,null,4)}</pre> */}
      
      {
        postModal &&
      <div className="popup-post">
        <form className="flex flex-col m-auto bg-white p-4 border rounded-3xl shadow-[0px_4px_7px_-2px_rgba(0,_0,_0,_0.1)]" onSubmit={handleSubmit}>
          <div className="flex justify-end">
            <button className=" text-red-500  mb-2 cursor-pointer w-5 font-extrabold pointer-cursor" onClick={() => setPostModal(false)}>X</button>
          </div>
          <h1 className="text-3xl text-center font-bold mb-4">New Post</h1>
          <input type="text" name="title" placeholder="Add a caption..." className="border mb-2 p-1 pl-1 rounded-xl" onChange={e => setTitle(e.target.value)} required/>
          <input  type="text" name="body" placeholder="Share your toughts..." className="border p-1 pl-1 h-20 rounded-xl"  onChange={e => setBody(e.target.value)} required/>
          <button className="mt-5 h-10 bg-blue-500 text-white text-xl font-medium rounded-2xl hover:bg-blue-800 cursor-pointer" type="submit">Submit</button>
        </form>
      </div>
        }

        <div className="flex flex-col-reverse mt-4">
            {posts.map(post => {
              return (
              <div key={post.id}>
                {
                  editingModal &&
                  <div className="bg-white popup p-3 rounded-2xl">
                    <form className="flex flex-col w-90 h-60 m-auto gap-2" onSubmit={handleSubmit}>
                      <button className="font-bold text-red-500 text-right" onClick={() => setEditingModal(false)}>X</button>
                      <input  type="text" name="title" placeholder="update title"className="text-2xl border mb-2 p-1 pl-1 rounded-xl" value={post.title} onChange={e => setTitle(e.target.value)} />
                      <input type="text" name="body" placeholder="update body" className="text-2xl border p-1 pl-1 h-20 rounded-xl" value={post.body}  onChange={e => setBody(e.target.value)}/>
                      <button type="submit" className="mt-5 h-10 bg-blue-500 text-white text-xl font-medium rounded-2xl hover:bg-blue-800 cursor-pointer">Submit</button>
                    </form>
                  </div>
                }
                
                  <div className="rounded-4xl m-auto w-110 flex flex-col my-2 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] p-6 bg-gray-200">
                  <div className="flex flex-row mb-4 m-auto">
                    <div className="rounded-full w-15 h-15 bg-[url('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small_2x/default-avatar-icon-of-social-media-user-vector.jpg')] bg-center bg-cover"></div>
                    <p className="font-bold ml-6 mt-5">Anonymous</p>
                    <button onClick={() => deletePost(post.id.toString())} className="bg-red-600 cursor-pointer ml-20 w-10 h-8 text-white flex justify-center items-center text-2xl rounded-2xl mt-4">
                      <MdDeleteOutline />
                    </button>
                    <button onClick={() => editPost(post.id)} className="bg-green-600 cursor-pointer ml-3 w-10 h-8 text-white flex justify-center items-center text-2xl rounded-2xl mt-4">
                      <MdModeEdit />
                    </button>
                   
                  </div>
                  <div className="border-t-gray-700 border-1 w-90 justify-center m-auto"></div> 
                    <p className="font-bold text-2xl ml-4 mr-4 mb-1 mt-2">{post.title}</p>
                    <p className="text-xl ml-4 mr-4 mb-2">{post.body}</p>
                </div>
              
              </div>
            )})}
        </div>

    </div>
  )
}

export default TestPage