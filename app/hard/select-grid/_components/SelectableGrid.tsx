"use client";
import { RefObject, useEffect, useRef, useState } from "react";
import "../_css/select-grid.css";

type CoordsT = {
  x: number;
  y: number;
};
export default function SelectableGrid() {
  const [NUMROWS, NUMCOLS] = [10, 10];
  const NUMTILES = NUMROWS * NUMCOLS;

  const mouseDownRef = useRef<null | CoordsT>(null);
  const selectedGridsRef = useRef<number[]>([]);

  const gridRefs = Array.from({ length: NUMTILES }, () =>
    useRef<null | HTMLDivElement>(null)
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const onMouseDown = (e: MouseEvent) => {
      const { x, y } = e;
      mouseDownRef.current = { x, y };
      selectedGridsRef.current = [];
      window.addEventListener("mousemove", onMouseMove, { signal });
    };
    const onMouseUp = (e: MouseEvent) => {
      mouseDownRef.current = null;
      window.removeEventListener("mousemove", onMouseMove);

      selectedGridsRef.current.forEach((i) => {
        if (gridRefs[i].current) {
          gridRefs[i].current.style.backgroundColor = "blue";
        }
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!mouseDownRef.current) return;

      const { x: mdX, y: mdY } = mouseDownRef.current;
      const { x: cursorX, y: cursorY } = e;

      selectedGridsRef.current = [];

      gridRefs.forEach((ref, i) => {
        const divObject = ref.current;

        if (!divObject) return;

        const { x: divX, y: divY } = divObject.getBoundingClientRect();

        if (
          divX > Math.min(mdX, cursorX) &&
          divX < Math.max(mdX, cursorX) &&
          divY > Math.min(mdY, cursorY) &&
          divY < Math.max(mdY, cursorY)
        ) {
          divObject.style.backgroundColor = "grey";
          selectedGridsRef.current.push(i);
        } else {
          divObject.style.backgroundColor = "white";
        }
      });
    };

    window.addEventListener("mousedown", onMouseDown, { signal });
    window.addEventListener("mouseup", onMouseUp, { signal });

    return () => controller.abort();
  }, []);

  return (
    <div
      className="select-grid-cont"
      style={{
        gridTemplateColumns: `repeat(${NUMCOLS}, 1fr)`,
        gridTemplateRows: `repeat(${NUMROWS}, 1fr)`,
      }}
    >
      {gridRefs.map((r, ind) => (
        <div ref={r} key={`${ind}`} className={`grid-square`} />
      ))}
    </div>
  );
}
