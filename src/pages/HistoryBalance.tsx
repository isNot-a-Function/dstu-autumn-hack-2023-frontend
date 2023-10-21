import React, { useEffect, useState } from "react";
import "../assets/scss/pages/_flight.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";
import { ReactComponent as Download } from "../assets/img/download.svg";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as Speech } from "../assets/img/speech.svg";
import { ReactComponent as Time } from "../assets/img/time.svg";
import { ReactComponent as Money } from "../assets/img/money.svg";
import { ReactComponent as Avatar } from "../assets/img/default-avatar.svg";
import Loader from "../components/Loader";
import { getHours } from "../utils/getHours";
import CreateResponseModal from "../components/Main/CreateResponseModal";
import { userApi } from "../store";
import { useNavigate } from "react-router-dom";
import Case from "../components/Main/Case";
import Pagination from "../components/Pagination/Pagination";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import TopUpModal from "../components/Modals/TopUpModal";

const sortList = [
  {
    id: 1,
    label: "ПОПОЛНЕНИЯ",
    value: "1",
  },
  {
    id: 2,
    label: "СНЯТИЯ",
    value: "2",
  },
];
const HistoryBalance = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data: user } = userApi.useGetUserQuery();
  const [changePhoto] = userApi.useChangePhotoMutation();
  // const [checkFile] = casesApi.useCheckFileMutation();
  const { data: history, isLoading } = userApi.useGetHistoryBalanceQuery({
    page: page,
  });
  const [sortValue, setSortValue] = useState(sortList[0].value);

  console.log("history", history);

  const [changeRole] = userApi.useChangeRoleMutation();

  const [isShowDecreaseBalanceModal, setIsShowDecreaseBalanceModal] =
    useState(false);

  const userLocal =
    localStorage.getItem("user") !== null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      localStorage.clear();
      navigate("/");
    }
  }, []);

  const handlerChangePhoto = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    // checkFile(formData).then((data: any) => {
    //   if (data?.data.files !== undefined) {
    //     changePhoto({ logo: data?.data.files[0] });
    //   }
    // });
  };
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const getRating = () => {
    return user?.user.role === "customer"
      ? user?.user.custoremInfo.rating
      : user?.user.executorInfo.rating;
  };

  if (isLoading) return <Loader />;
  return (
    <div className="container box-deal-page ">
      {isShowDecreaseBalanceModal && (
        <TopUpModal
          setIsActive={setIsShowDecreaseBalanceModal}
          isTopUp={false}
        />
      )}
      <div className="body-deal-page">
        <div className="content-deal-page " style={{ border: "none" }}>
          <div className="box-list-sort">
            {sortList.map((sort: any, index: number) => {
              return (
                <button
                  className={`${
                    sortValue === sort.value ? "box-active-item-sort" : ""
                  } box-item-sort`}
                  onClick={() => setSortValue(sort.value)}
                  key={index}
                >
                  <p>{sort.label}</p>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="box-list-cases">
            {(sortValue === "1"
              ? history.topUpBalance
              : history.decreaseBalance
            ).map((it: any) => (
              <div className="box-history-balance">
                <div className="title-item-history-balance">
                  {it.reason} : {it.sum + "₽"}
                </div>
                <div className="box-time-history-balance">
                  {new Date(it.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          {(sortValue === "1" && history?.topUpBalance.length !== 0) ||
          (sortValue === "2" && history?.decreaseBalance.length !== 0) ? (
            <Pagination
              currentPage={page}
              setCurrentPage={setPage}
              pagesAmount={
                sortValue === "1"
                  ? history?.topUpBalanceCount
                  : history?.decreaseBalanceCount
              }
              perPage={15}
            />
          ) : (
            <h1>Список пуст</h1>
          )}
        </div>
      </div>

      <div className="box-dop-info">
        <div className="info-of-customer">
          <p> ИСТОРИЯ БАЛАНСА</p>
          <div className="box-avatar-in-deal">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                id="imgupload"
                onChange={handlerChangePhoto}
                style={{ display: "none", cursor: "pointer" }}
              />
              <label htmlFor="imgupload">
                {!user?.user.logo ? (
                  <Avatar style={{ cursor: "pointer" }} />
                ) : (
                  <img
                    src={user?.user.logo}
                    className="avatar-customer"
                    style={{ cursor: "pointer" }}
                  />
                )}
              </label>
            </div>

            <p>
              {user?.user.family
                ? user.user.family + " " + user?.user.name
                : user?.user.id}
            </p>
          </div>
        </div>

        <button
          className="lightBtn btn"
          onClick={() => {
            setIsShowDecreaseBalanceModal(true);
          }}
        >
          ВЫВЕСТИ ДЕНЬГИ
        </button>
      </div>
    </div>
  );
};

export default HistoryBalance;
