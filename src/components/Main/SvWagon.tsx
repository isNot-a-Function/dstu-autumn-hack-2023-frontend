import reverved from "../../assets/img/wagons/reverved.jpg";
import res1 from "../../assets/img/wagons/res1.jpg";
import res2 from "../../assets/img/wagons/res2.jpg";
import res3 from "../../assets/img/wagons/res3.jpg";
import { useState } from "react";
import { ReactComponent as Toilet } from "../../assets/img/wagons/toilet.svg";
import { flightPlace } from "../../types/flightTypes";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
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

const SvWagon = ({ data, setSelectPlace }: ReservedWagonProps) => {
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

          return (
            <div key={index} className="place-item">
              <div className="line-places">
                <div className="box-polka">
                  <button
                    className={`box-place-sv ${
                      it.ticketId !== null
                        ? "place-busy"
                        : it.recomendationScore < 0.4
                        ? "place-bad"
                        : it.recomendationScore > 0.7
                        ? "place-good"
                        : ""
                    }`}
                    onClick={() => {
                      if (it.ticketId === null) {
                        changePlace(it?.placeNumber);
                      } else {
                        navigate(`/profile/${it.ticket.user.id}`);
                      }
                    }}
                    // disabled={it.ticketId !== null}
                  >
                    <h1>{it?.placeNumber}</h1>
                    <p> {it?.cost + "p"}</p>
                    {/* <p> {it?.position === "up" ? "B" : "H"}</p> */}
                  </button>
                </div>
              </div>
              <div
                className={`${
                  (index + 1) % 2 === 0 ? "wagon-gap-razdel" : "wagon-gap"
                }`}
              ></div>
            </div>
          );
        })}
        <div className="bottom-wagon">
          <Toilet />
        </div>
      </div>
    </>
  );
};
export default SvWagon;
