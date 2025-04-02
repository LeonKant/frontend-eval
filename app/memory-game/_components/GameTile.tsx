interface GameTileT {
  num: number;
  clicked: boolean;
  onClick?: () => void;
}
const GameTile = ({ num, clicked = false, onClick }: GameTileT) => (
  <div onClick={onClick} className={`board-tile`}>
    {clicked && num}
  </div>
);

export default GameTile;
