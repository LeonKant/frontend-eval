"use client";

async function fetchFromHackerNews<T>(url: string): Promise<T | undefined> {
  try {
    const result = await fetch(url);

    if (!result.ok || result.status !== 200) {
      throw new Error(result.statusText);
    }

    const json = await result.json().catch(() => null);

    if (json === null) {
      throw new Error("Error parsing JSON");
    }
    return json as T;
  } catch (e) {
    console.error(e instanceof Error ? e.message : "Unknown error");
  }
}

export const getIDs = async () =>
  await fetchFromHackerNews<number[]>(
    "https://hacker-news.firebaseio.com/v0/jobstories.json"
  );

export const getPost = async (id: number) =>
  await fetchFromHackerNews<Object>(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );