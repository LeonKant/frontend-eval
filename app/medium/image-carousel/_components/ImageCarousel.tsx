"use client";
import { useEffect, useState } from "react";
import "../_css/image-carousel.css";

export default function ImageCarousel() {
  const [imagesState, setImagesState] = useState<string[]>([]);
  const [indexState, setIndexState] = useState<number>(0);
  const getImages = async () => {
    try {
      const result = await fetch(
        "https://www.reddit.com/r/aww/top/.json?t=all"
      );

      const json = await result.json();
      const imageData = json.data.children as Array<any>;

      if (!imageData) {
        throw new Error("Invalid image data");
      }

      const imageUrls = imageData
        .filter(
          (d) =>
            !d?.data?.is_video &&
            !d?.data?.secure_media?.is_gif &&
            !!d?.data?.url_overridden_by_dest
        )
        .map((d) => d?.data?.url_overridden_by_dest);

      setImagesState(imageUrls);
    } catch (e) {
      console.error(e instanceof Error ? e.message : "Unknown error");
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    if (imagesState.length === 0) return;

    const int = setInterval(() => {
      setIndexState((prev) => (prev + 1) % imagesState.length);
    }, 3 * 1000);

    return () => clearInterval(int);
  }, [imagesState]);

  const modulo = (n: number, m: number) => {
    return ((n % m) + m) % m;
  };
  const handleClick = (dir: "right" | "left") => () => {
    if (dir === "right") {
      setIndexState((prev) => modulo(prev + 1, imagesState.length));
    } else if (dir === "left") {
      setIndexState((prev) => modulo(prev - 1, imagesState.length));
    }
  };

  return (
    <>
      {imagesState.length > 0 && (
        <div className="image-caro-cont">
          <div className="caro-button-cont">
            <button className="caro-button" onClick={handleClick("left")}>
              {"<"}
            </button>
            <button className="caro-button" onClick={handleClick("right")}>
              {">"}
            </button>
          </div>
          <img
            onError={handleClick("right")}
            alt={`image`}
            src={`${imagesState[indexState]}`}
          />
        </div>
      )}
    </>
  );
}
