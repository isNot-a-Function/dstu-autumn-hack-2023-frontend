import reverved from "../../assets/img/wagons/reverved.jpg";
import res1 from "../../assets/img/wagons/res1.jpg";
import res2 from "../../assets/img/wagons/res2.jpg";
import res3 from "../../assets/img/wagons/res3.jpg";
import { useState } from "react";
import { ReactComponent as Toilet } from "../../assets/img/wagons/toilet.svg";
import { flightPlace } from "../../types/flightTypes";
import { useNavigate } from "react-router-dom";

interface ReservedWagonProps {
  data: {
    carriageNumber: number;
    id: number;
    places: {
      cost: number;
      free: boolean;
      id: number;
      placeNumber: number;
      position: string;
      side: boolean;
      ticket: any;
      ticketId: number;
      recomendationScore: number;
    }[];
    type: string;
  };
  setSelectPlace: (value: number) => void;
}

const CoupeWagon = ({ data, setSelectPlace }: ReservedWagonProps) => {
  // const arr = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  //   41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
  // ];
  const changePlace = (value: number) => {
    setSelectPlace(value);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="box-wagon">
        <div className="top-wagon">
          <Toilet />
        </div>
        <div
          className={`wagon-gap-razdel
      `}
        ></div>
        {data.places.map((it: any, index: number) => {
          const countAll = data.places.length / 3;

          if (index % 2 == 0) {
            return (
              <div key={index} className="place-item">
                <div className="line-places">
                  <div className="box-polka">
                    <button
                      className={`box-place-top ${
                        data.places[index + 1]?.ticketId !== null
                          ? "place-busy"
                          : data.places[index + 1]?.recomendationScore < 0.4
                          ? "place-bad"
                          : data.places[index + 1]?.recomendationScore > 0.7
                          ? "place-good"
                          : ""
                      }`}
                      // disabled={data.places[index + 1]?.ticketId !== null}
                      onClick={() => {
                        if (it.ticketId === null) {
                          changePlace(it?.placeNumber);
                        } else {
                          navigate(`/profile/${it.ticket.user.id}`);
                        }
                      }}
                    >
                      <h1>{data.places[index + 1]?.placeNumber}</h1>
                      <p> {data.places[index + 1]?.cost + "p"}</p>
                    </button>
                    <button
                      className={`box-place-bottom ${
                        it.ticketId !== null
                          ? "place-busy"
                          : it.recomendationScore < 0.4
                          ? "place-bad"
                          : it.recomendationScore > 0.7
                          ? "place-good"
                          : ""
                      }`}
                      // disabled={it.ticketId !== null}
                      onClick={() => {
                        if (it.ticketId === null) {
                          changePlace(it?.placeNumber);
                        } else {
                          navigate(`/profile/${it.ticket.user.id}`);
                        }
                      }}
                    >
                      <h1>{it?.placeNumber}</h1>
                      <p> {it?.cost + "p"}</p>
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    (index + 2) % 4 === 0 ? "wagon-gap-razdel" : "wagon-gap"
                  }`}
                ></div>
              </div>
            );
          }
        })}
        <div className="bottom-wagon">
          <Toilet />
        </div>
      </div>
    </>
  );
};
export default CoupeWagon;
