import "../../assets/scss/components/_scale-online.scss";

export interface ScaleOnlineProps {
  maxPlayers: number;
  rating: number;
}

const ScaleOnline = ({ rating, maxPlayers }: ScaleOnlineProps) => {
  return (
    <div className="boxScaleWithTitle">
      <div className="boxScale">
        <div
          className="activeScale"
          style={{ width: `${(rating / maxPlayers) * 100}%` }}
        >
          {rating !== 0 && (
            <p className="labelScale">{"Рейтинг:    " + String(rating)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScaleOnline;
