import React, { useEffect, useState } from "react";
import "../assets/scss/pages/_flight.scss";
import ScaleOnline from "../components/Footer/ScaleOnline";
import { ReactComponent as Download } from "../assets/img/download.svg";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as Speech } from "../assets/img/speech.svg";
import { ReactComponent as Time } from "../assets/img/time.svg";
import { ReactComponent as Money } from "../assets/img/money.svg";
import { ReactComponent as Avatar } from "../assets/img/default-avatar.svg";
import CreateResponseModal from "../components/Main/CreateResponseModal";
import { chatApi, flightApi, userApi } from "../store";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import UpdateProfileModal from "../components/Main/UpdateProfile";
import ChangeParametrsModal from "../components/Main/ChangeParametrsModal";
import DoneModal from "../components/Modals/DoneModal";

const sortListEx = [
  // {
  //   id: 1,
  //   label: "МОИ БИЛЕТЫ",
  //   value: "responses",
  // },
  // {
  //   id: 2,
  //   label: "В ПРОЦЕССЕ",
  //   value: "processed",
  // },
  // {
  //   id: 3,
  //   label: "ВЫПОЛНЕННЫЕ",
  //   value: "done",
  // },
];

const UserPage = () => {
  const userId = window.location.pathname.replace("/profile/", "");
  const { data: user } = userApi.useGetProfileIdQuery(userId);
  console.log("userID", userId);

  const navigate = useNavigate();
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
    if (userLocal.id == userId) {
      navigate("/profile");
    }
  }, []);

  const [changePhoto] = userApi.useChangePhotoMutation();
  // const [checkFile] = casesApi.useCheckFileMutation();
  const [changeRole] = userApi.useChangeRoleMutation();
  const [page, setPage] = useState(1);
  const [isShowConfirmationModal, setIsShowConfirmationModal] = useState(false);
  const [isShowUpdateUserModal, setIsShowUpdateUserModal] = useState(false);
  const [isShowChangeParametrs, setIsShowChangeParametrs] = useState(false);
  const [isShowRaitingModal, setIsShowRaitingModal] = useState(false);

  const [addRaiting] = flightApi.useAddRaitingMutation();

  const [createChat] = chatApi.useRequestChatMutation();

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

  // if (tickets === undefined) return <Loader />;

  return (
    <div className="container box-profile-page ">
      {isShowConfirmationModal && (
        <ConfirmationModal
          setIsActive={setIsShowConfirmationModal}
          modalTitle="Вы действительно хотите выйти?"
          func={logOut}
        />
      )}

      {isShowUpdateUserModal && (
        <UpdateProfileModal
          isActive={isShowConfirmationModal}
          setIsActive={setIsShowUpdateUserModal}
        />
      )}

      {isShowChangeParametrs && (
        <ChangeParametrsModal
          isActive={isShowChangeParametrs}
          setIsActive={setIsShowChangeParametrs}
        />
      )}

      {isShowRaitingModal && (
        <DoneModal
          isActive={isShowRaitingModal}
          setIsActive={setIsShowRaitingModal}
          userId={userId}
        />
      )}

      <div className="body-deal-page">
        <div className="content-deal-page " style={{ border: "none" }}></div>
        <div></div>
      </div>

      <div className="box-dop-info">
        <div className="info-of-customer">
          <p> СТРАНИЦА ПОЛЬЗОВАТЕЛЯ</p>
          <div className="box-avatar-in-deal">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
            ></div>

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
            createChat({ userId: Number(userId) });
          }}
        >
          ЗАЯВКА НА ОБЩЕНИЕ
        </button>

        <button
          className="lightBtn btn"
          onClick={() => {
            setIsShowRaitingModal(true);
          }}
        >
          ПОСТАВИТЬ ОЦЕНКУ
        </button>
      </div>
    </div>
  );
};

export default UserPage;
