import React, { useState, useEffect } from "react";
import SearchInput from "../components/UI/SearchInput";
import Menu from "../components/Main/Menu";
import { ReactComponent as Trash } from "../assets/img/trashSort.svg";
import TrainCard from "../components/Main/TrainCard";
import { flightApi } from "../store";
import Pagination from "../components/Pagination/Pagination";
import CreateCaseModal from "../components/Main/CreateCaseModal";
import ReactDatePicker from "react-datepicker";
import CustomSelect from "../components/UI/CustomSelect";

const cityes = [
  {
    value: "Москва",
    label: "Москва",
  },
  {
    value: "Нижний Новгород",
    label: "Нижний Новгород",
  },
  {
    value: "СПБ",
    label: "СПБ",
  },
  {
    value: "Казань",
    label: "Казань",
  },
  {
    value: "Мурманск",
    label: "Мурманск",
  },
];

const Main = () => {
  const [activeSection, setActiveSection] = useState<string[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [sortValue, setSortValue] = useState<string | null>(null);
  const [directionSort, setDirectionSort] = useState("asc"); //asc - по возрастанию, desc - по убыванию
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);

  const [selectCity1, setSelectCity1] = useState(cityes[0]);
  const [selectCity2, setSelectCity2] = useState(cityes[3]);

  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [value, setValue] = useState("");

  const { data: flights } = flightApi.useGetFlightsQuery({
    place1: selectCity2.value,
    place2: selectCity1.value,
    date: dateValue.toLocaleDateString(),
  });

  useEffect(() => {
    console.log("flights", flights);
  }, [flights]);

  const sortList = [
    {
      id: 1,
      label: "ПО ДАТЕ СОЗДАНИЯ",
      value: "1",
    },
    {
      id: 2,
      label: "ПО РЕЙТИНГУ ЗАКАЗЧИКА",
      value: "2",
    },
    {
      id: 3,
      label: "ПО КОЛИЧЕСТВУ ОТКЛИКОВ",
      value: "3",
    },
    {
      id: 4,
      label: "ПО РАЗМЕРУ СТОИМОСТИ",
      value: "4",
    },
  ];

  const handlerClickSort = (value: string) => {
    if (sortValue === value) {
      setDirectionSort(directionSort === "asc" ? "desc" : "asc");
    } else {
      setSortValue(value);
    }
  };

  return (
    <div className="box-main-page container">
      <div>
        <div className="box-filters">
          <div className="item-filters">
            <p>Дата начала поездки</p>
            <ReactDatePicker
              id="startDate"
              minDate={new Date()}
              wrapperClassName="datePicker"
              selected={dateValue}
              //@ts-ignore
              onChange={(date) => setDateValue(date)}
              dateFormat="dd.MM.yyyy"
            />
          </div>
          <div className="item-filters">
            <p>Город отправления</p>
            <CustomSelect
              value={selectCity1}
              options={cityes}
              onChange={setSelectCity1}
              isHaveIcon={false}
              width={"200px"}
              heightSelect={45}
              paddingIndicator={0}
              paddingContainer={12}
              backgroundColor={"#171226"}
              menuPlacement={"bottom"}
            />
          </div>
          <div className="item-filters">
            <p>Город прибытия</p>
            <CustomSelect
              value={selectCity2}
              options={cityes}
              onChange={setSelectCity2}
              isHaveIcon={false}
              width={"200px"}
              heightSelect={45}
              paddingIndicator={0}
              paddingContainer={12}
              backgroundColor={"#171226"}
              menuPlacement={"bottom"}
            />
          </div>
        </div>

        <div className="box-list-cases">
          {flights?.flights.map((item) => (
            <TrainCard data={item} key={item?.id} />
          ))}
        </div>
      </div>
      <div style={{ paddingRight: 12, top: 80 }}>
        {/* <Menu
          setActiveSection={setActiveSection}
          activeSection={activeSection}
          openSection={openSection}
          setOpenSection={setOpenSection}
        /> */}
      </div>
    </div>
  );
};

export default Main;
