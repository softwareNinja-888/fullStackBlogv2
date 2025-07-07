import { Hero } from "../components/Hero"
import { NewsLetter } from "../components/NewsLetter"
import { PostList } from "../components/PostList"


export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
        <Hero/>
        <NewsLetter/>
        <PostList/>
      </div>
    </>
  );
} 