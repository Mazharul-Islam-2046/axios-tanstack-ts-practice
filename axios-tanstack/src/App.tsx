import './App.css'
import { createPost, deletePost, fetchPosts, updatePost } from './API/postAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
  
function App() {

  const [newPost, setNewPost] = useState({ userId:0, title: "", body: "", id:0 });
  const queryClient = useQueryClient();


  const { data, isLoading, error } = useQuery<Post[]>({
     queryKey: ["posts"], queryFn: fetchPosts
     });



  const createMutation = useMutation({
        mutationFn: (newPost: Post) => createPost(newPost.title, newPost.body, newPost.userId),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
      });

  const updateMutation = useMutation({
        mutationFn: (updatedPost: Post) => updatePost(updatedPost.id, updatedPost.title, updatedPost.body),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
      });



  const deleteMutation = useMutation({
        mutationFn: (id: number) => deletePost(id),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
      });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts</p>;

  

  return (
    <>
      <div>
      <h2>Posts</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMutation.mutate(newPost);
          setNewPost({ title: "", body: "", userId: 0, id: 0 });
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button type="submit">Create Post</button>
      </form>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <button onClick={() => updateMutation.mutate({ id: post.id, title: "Updated Title", body: "Updated Body", userId: 1})}>Update</button>
            <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
