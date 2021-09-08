import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import Seo from "../components/Seo";

const Blog = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title;
	const posts = data.allMdx.nodes;

    return (
        <Layout location={location} title={siteTitle}>
            <Seo title="Blog, All posts" />
                {posts.map((post) => {
					const title = post.frontmatter.title;
					const timeToRead = post.timeToRead;
                    const slugLink = post.slug.slice(5);

					let emoji;

					if (timeToRead >= 0 && timeToRead < 7) {
						emoji = "☕️";
					} else if (timeToRead >= 7 && timeToRead < 17) {
						emoji = "☕️☕️";
					} else if (timeToRead >= 17) {
						emoji = "☕️☕️☕️";
					}

					return (
						<article key={post.slug} className="global-article">
							<h2><Link to={slugLink}>{title}</Link></h2>
							<p>{post.frontmatter.date} • {emoji} {post.timeToRead} min read</p>
							<p>{post.frontmatter.description}</p>
						</article>
					);
				})}
        </Layout>
    );
}

export default Blog;

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				description
				title
			}
		}
		allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
    		nodes {
    			excerpt
				slug
				timeToRead
    			frontmatter {
        			date(formatString: "MMMM DD, YYYY")
        			description
        			title
      			}
    		}
  		}
	}
`;