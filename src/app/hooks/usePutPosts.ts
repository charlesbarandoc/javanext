import React from 'react'
import { useQuery, useMutation, } from '@tanstack/react-query'
import axios from 'axios'

const usePutPosts = () => {
  return useMutation({mutationFn: async(id: string) => {
    const response = await axios.put(`http://localhost:8000/api/posts/${id}`)
  }}
    
  )
}

export default usePutPosts