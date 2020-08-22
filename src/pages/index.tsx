import React from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

const Home = ({ blogs }: any): any => {
  return (
    <div>
      <h2>最新の記事</h2>

      <div>
        {blogs.map((blog) => (
          <React.Fragment key={blog.id}>
            <Link href="/blogs/[id]" as={`blogs/${blog.id}`}>
              <h2>{blog.title}</h2>
            </Link>
            {blog.tags.map((tag) => (
              <React.Fragment key={tag.id}>
                <span>{tag.name}</span>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const res = await fetch(`https://test_cms.microcms.io/api/v1/blogs`, key);
  const data = await res.json();

  return {
    props: {
      blogs: data.contents,
    },
  };
};

export default Home;
