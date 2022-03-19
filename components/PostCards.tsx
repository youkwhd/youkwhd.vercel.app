import Link from "next/link";
import { PostType } from "../types/post";

type Props = {
    posts: PostType[];
};

const PostCards = ({ posts }: Props): JSX.Element => {
    return (
        <ul>
            {posts.map((post: PostType) => {
                return (
                    <li key={post.slug}>
                        <span>{post.date.split("T")[0]} - </span>
                        <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                            {post.title}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default PostCards;
