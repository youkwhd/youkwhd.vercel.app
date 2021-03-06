import { PageConfig } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";

import { getAllPosts } from "../../../utils/getPosts";
import { Banner, Post } from "../../../types";
import { MainLayout } from "../../../components/Layout";
import { getAllBanners } from "../../../utils/getBanners";

export const config: PageConfig = {
    unstable_runtimeJS: false
};

type Props = {
    filteredPosts: Post[];
    currentPostTag: string;
    banners: Banner[];
};

const TagRelatePage = ({ filteredPosts, currentPostTag, banners }: Props): JSX.Element => {
    return (
        <>
            <NextSeo
                title={`${currentPostTag} related posts`}
            />
            <MainLayout banners={banners}>
                <h1>{currentPostTag} related posts:</h1>
                <ul>
                    {filteredPosts.map((post: Post) => {
                        const parsedPostDate: string = post.date.split("T")[0];

                        return (
                            <li key={post.slug}>
                                <span>{parsedPostDate} - </span>
                                <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                                    {post.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </MainLayout>
        </>
    );
};

export default TagRelatePage;

type Params = {
    params: {
        tag: string;
    };
};

export const getStaticProps = ({ params }: Params) => {
    const banners: Banner[] = getAllBanners();
    const posts: Post[] = getAllPosts();

    // filter all the posts that has the current tag.
    const filteredPosts: Post[] = posts.filter((post: Post) => Object.keys(post.tags).includes(params.tag));

    // get the current unparsed tag
    let currentPostTag: string = "";
    filteredPosts.forEach((post: Post) => {
        for (const key in post.tags) {
            if (key === params.tag) {
                currentPostTag = post.tags[key];
                break;
            }
        }
    });
    
    return {
        props: {
            filteredPosts,
            currentPostTag,
            banners
        }
    };
};

export const getStaticPaths = () => {
    const posts: Post[] = getAllPosts();

    const uniqueTags: { [key: string]: string } = {};
    posts.forEach((post: Post) => {
        for (const key in post.tags) {
            // perf: checks if key is not present
            if (!uniqueTags[key]) {
                uniqueTags[key] = post.tags[key];
            }
        }
    });

    return {
        paths: Object.keys(uniqueTags).map((tag: string) => {
            return {
                params: {
                    tag
                }
            }
        }),
        fallback: false,
    };
};
