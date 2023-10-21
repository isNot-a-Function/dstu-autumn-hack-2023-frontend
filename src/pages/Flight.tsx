import React, { useState, useEffect } from "react";
import "../assets/scss/pages/_flight.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";

import { flightApi } from "../store";
import Loader from "../components/Loader";
import CoupeWagon from "../components/Main/CoupeWagon";
import ReservedWagon from "../components/Main/ReservedWagon";
import SvWagon from "../components/Main/SvWagon";
import LuxWagon from "../components/Main/LuxWagon";
import TrainCard from "../components/Main/Case";

const Flight = () => {
  const flightId = window.location.pathname.replace("/flight/", "");
  const { data: flight, isLoading } = flightApi.useGetFlightQuery(flightId);
  const [buy] = flightApi.useBuyTicketMutation();
  const [selectWagon, setSelectWagon] = useState<number>(
    flight?.flights?.carrriages[0].carriageNumber || 0
  );
  const [selectPlace, setSelectPlace] = useState(0);
  const [haveChildren, setHaveChildren] = useState(false);
  const [haveAnimals, setHaveAnimals] = useState(false);

  const [isShowResponseModal, setIsShowResponseModal] = useState(false);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [isShowDeclineOrder, setIsShowDeclineOrder] = useState(false);
  const [isShowDone, setIsShowDone] = useState(false);

  useEffect(() => {
    if (flight) {
      setSelectWagon(flight?.flights?.carrriages[0].carriageNumber);
    }
  }, [flight]);
  const user =
    localStorage.getItem("user") != null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  useEffect(() => {
    setSelectPlace(0);
  }, [selectWagon]);

  if (isLoading || !flight?.flights?.carrriages) return <Loader />;
  return (
    <div className="container box-deal-page ">
      <div className="info-train">
        {/* <TrainCard data={flight?.flights} /> */}
      </div>

      <div className="help-info-flight">
        <div className="box-help-item">
          <button
            className={`box-place place-bad`}
            style={{ borderRadius: 5, width: 20, height: 20 }}
            disabled={true}
          >
            {/* <h1>{5}</h1>
            <p>{"B"}</p> */}
          </button>
          <h2> - место не соответствует вашим предпочтениям</h2>
        </div>

        <div className="box-help-item">
          <button
            className={`box-place place-good`}
            style={{ borderRadius: 5, width: 20, height: 20 }}
            disabled={true}
          >
            {/* <h1>{10}</h1>
            <p>{"H"}</p> */}
          </button>
          <h2> - место соответствует вашим предпочтениям</h2>
        </div>
      </div>

      {flight?.flights?.carrriages.map((item, index) => {
        if (selectWagon === item.carriageNumber) {
          return (
            <div key={index} className="box-flight">
              <div className="title-box-wagon">
                <button
                  onClick={() => {
                    const el =
                      flight?.flights?.carrriages[index - 1]?.carriageNumber;
                    if (el !== undefined) {
                      setSelectWagon(el);
                    } else {
                      setSelectWagon(
                        flight?.flights?.carrriages[
                          flight?.flights?.carrriages.length - 1
                        ].carriageNumber
                      );
                    }
                  }}
                >
                  ❮{" "}
                </button>
                <div
                  style={{
                    width: 200,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h2>
                    Вагон: {flight?.flights.carrriages[index].carriageNumber}
                  </h2>
                  <p>
                    Тип:{" "}
                    {flight?.flights.carrriages[index].type === "reserved"
                      ? "Плацкартный"
                      : flight?.flights.carrriages[index].type === "coupe"
                      ? "Купейный"
                      : flight?.flights.carrriages[index].type === "sv"
                      ? "CВ"
                      : flight?.flights.carrriages[index].type === "lux"
                      ? "Люкс"
                      : ""}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const el =
                      flight?.flights?.carrriages[index + 1]?.carriageNumber;
                    if (el !== undefined) {
                      setSelectWagon(el);
                    } else {
                      setSelectWagon(
                        flight?.flights?.carrriages[0].carriageNumber
                      );
                    }
                  }}
                >
                  {" "}
                  ❯
                </button>
              </div>

              {item.type === "reserved" && (
                <ReservedWagon data={item} setSelectPlace={setSelectPlace} />
              )}
              {item.type === "coupe" && (
                <CoupeWagon data={item} setSelectPlace={setSelectPlace} />
              )}
              {item.type === "sv" && (
                <SvWagon data={item} setSelectPlace={setSelectPlace} />
              )}
              {item.type === "lux" && (
                <LuxWagon data={item} setSelectPlace={setSelectPlace} />
              )}

              {selectPlace !== 0 && (
                <div className="place-card">
                  <h1>Место: {selectPlace}</h1>
                  <p>
                    Вагон: {flight?.flights.carrriages[index].carriageNumber}
                  </p>{" "}
                  <p>
                    Тип:{" "}
                    {flight?.flights.carrriages[index].type === "reserved"
                      ? "Плацкартный"
                      : flight?.flights.carrriages[index].type === "coupe"
                      ? "Купейный"
                      : flight?.flights.carrriages[index].type === "sv"
                      ? "CВ"
                      : flight?.flights.carrriages[index].type === "lux"
                      ? "Люкс"
                      : ""}
                  </p>
                  <p>
                    {flight?.flights?.carrriages[index]?.places[selectPlace - 1]
                      ?.position === "up"
                      ? "Bерхняя полка"
                      : "Hижняя полка"}
                  </p>
                  <p>
                    Цена:
                    {" " +
                      flight?.flights?.carrriages[index]?.places[
                        selectPlace - 1
                      ].cost}
                    руб
                  </p>
                  <div className="box-checkbox">
                    <input
                      type="checkbox"
                      checked={haveAnimals}
                      onChange={() => {
                        setHaveAnimals(!haveAnimals);
                      }}
                    ></input>
                    <p>Я буду с животными</p>
                  </div>
                  <div className="box-checkbox">
                    <input
                      type="checkbox"
                      checked={haveChildren}
                      onChange={() => {
                        setHaveChildren(!haveChildren);
                      }}
                    ></input>
                    <p>Я буду с детьми</p>
                  </div>
                  <button
                    className="lightBtn btn"
                    onClick={() => {
                      buy({
                        flightPlaceId:
                          flight?.flights?.carrriages[index]?.places[
                            selectPlace - 1
                          ].id,
                        withAnimals: haveAnimals,
                        withChildren: haveChildren,
                      });
                    }}
                  >
                    Купить
                  </button>
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Flight;
