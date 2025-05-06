const Square = ({ piece }: { piece: number | null }) => (
  <div className={`game-square`}>
    {piece && (
      <div
        className={`game-piece ${
          piece === 1 ? "red" : piece === 2 ? "yellow" : ""
        }`}
      />
    )}
  </div>
);

export default Square;
