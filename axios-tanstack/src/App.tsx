
import { fetchPosts } from './API/fetchAPI';
import './App.css'
import { useQuery } from '@tanstack/react-query';


function App() {

  type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };


  const { data, isLoading, error } = useQuery<Post[]>({ queryKey: ["posts"], queryFn: fetchPosts });


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching posts</p>;



  return (
    <>
      <div>
      <h2>Posts</h2>
      <ul>
        {data?.map((post: Post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
