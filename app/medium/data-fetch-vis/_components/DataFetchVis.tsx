"use client";
import { useEffect, useState } from "react";
import "../_css/data-fetch-vis.css";

const GraphTop2 = ({ data }: { data: number[] }) => {
  const maxYLabel = Math.ceil(Math.max(...data) / 10) * 10;
  const yLabels = new Array(maxYLabel / 10 + 1)
    .fill(null)
    .map((_, ind) => ind * 10);

  return (
    <>
      <div className="graph-y-axis">
        {yLabels.map((l, ind) => (
          <div className={`y-label`} key={`label-${ind}`} style={{bottom: `${(l / maxYLabel) * 100}%`}}>
            {l}
          </div>
        ))}
      </div>
      <div className="graph-main">
        {data.map((d, ind) => {
          const percent = (d / maxYLabel) * 100;
          return (
            <div
              key={`data-${ind}`}
              className="graph-rect"
              style={{
                height: `${percent}%`,
                backgroundColor: "aquamarine",
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default function DataFetchVis() {
  const [displayDataState, setDisplayDataState] = useState<number[] | null>(
    null
  );
  const [maxNumsState, setMaxNumsState] = useState<number | null>(null);

  const getList = async () => {
    try {
      const result = await fetch(
        "https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new"
      );

      if (!result.ok || result.status !== 200) {
        throw new Error(result.statusText);
      }

      const text = await result.text();

      const nums: number[] = text
        .trim()
        .split("\n")
        .map((s) => parseInt(s));

      const maxNums = Math.max(...nums);

      setMaxNumsState(maxNums);
      const displayData = new Array(maxNums).fill(0);

      nums.forEach((n) => displayData[n - 1]++);

      setDisplayDataState(displayData);

      console.log(displayData);
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error");
      return;
    }
  };
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="graph">
      {displayDataState && <GraphTop2 data={displayDataState} />}
      <div className={"bottom-left"} />
      <div className="graph-x-axis">
        {maxNumsState !== null &&
          new Array(maxNumsState)
            .fill(null)
            .map((_, ind) => <div key={`x-label-${ind}`}>{ind + 1}</div>)}
      </div>
    </div>
  );
}
