"use client";

import { useEffect, useState } from "react";
import { getIDs, getPost } from "../_util";
import "../_css/job-board.css";

type JobCardPropsT = {
  time?: number;
  title?: string;
  url?: string;
  by?: string;
  type?: string;
  id?: string;
};

const JobCard = ({ data }: { data: JobCardPropsT }) => {
  const [title, desc, ...rest] = data.title?.split(/[Ii]s [Hh]iring/) || [];
  const date = new Date(data?.time || "").toLocaleDateString("en-US");

  return (
    <a
      className="job-card-cont"
      href={`${data?.url ?? `https://news.ycombinator.com/item?id=${data.id}`}`}
      target="_blank"
    >
      <div className="title">{title ?? "title"}</div>
      <div className="desc">
        Is hiring {desc}
        {...rest}
      </div>
      <div className="date">{date}</div>
    </a>
  );
};

export default function JobBoard() {
  const [idState, setIdState] = useState<number[]>([]);
  const [postsState, setPostsState] = useState<Object[]>([]);
  const [postInd, setPostInd] = useState<number>(9);

  useEffect(() => {
    (async () => {
      const ids = await getIDs();
      if (!ids) return;
      setIdState(ids);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idState.length === 0) {
        return;
      }

      const newPosts: Object[] = [];

      for (
        let i = postsState.length;
        i < Math.min(postInd, idState.length);
        i++
      ) {
        const post = (await getPost(idState[i])) || {};

        newPosts.push(post);
      }

      setPostsState((prev) => [...prev, ...newPosts]);
    })();
  }, [idState, postInd]);

  return (
    <div className="job-board-main">
      <div className="job-board-cont">
        {postsState.map((p, i) => (
          <JobCard key={`post-${i}`} data={p} />
        ))}
      </div>
      <div className="button-cont">
        <button
          onClick={() => {
            setPostInd((prev) => (prev < idState.length ? prev + 6 : prev));
          }}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
