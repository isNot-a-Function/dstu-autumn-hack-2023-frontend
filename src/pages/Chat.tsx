import React, { useEffect, useState } from "react";
import "../assets/scss/pages/_chat.scss";
import { chatApi } from "../store";
import Loader from "../components/Loader";

const Chat = () => {
  const userLocal =
    localStorage.getItem("user") !== null
      ? //@ts-ignore
        JSON.parse(localStorage.getItem("user"))
      : undefined;

  const [message, setMessage] = useState("");
  const { data: chats } = chatApi.useGetGroupsQuery();
  const [selectGroup, setSelectGroup] = useState(undefined);
  const [acceptRequest] = chatApi.useAcceptRequetMutation();
  const { data: messages } = chatApi.useGetMessagesQuery(selectGroup, {
    pollingInterval: 3000,
  });
  const [sendMessage] = chatApi.useSendMessageMutation();

  if (chats === undefined) return <Loader />;
  return (
    <div className="container box-chat-page ">
      <div className="list-group">
        <h1>СПИСОК ЧАТОВ</h1>
        {chats.groups.map((item: any) => (
          <div
            className="item-list-group"
            onClick={() => {
              setSelectGroup(item.id);
            }}
          >
            <p>{item.title}</p>
            <p style={{ fontSize: 12, color: "#ff0000" }}>
              {item.active === false &&
                item.creatorId !== userLocal?.id &&
                "Требуется подтверждение"}
            </p>
          </div>
        ))}
      </div>
      {chats.groups.length !== 0 && selectGroup != undefined && (
        <div className="box-chat">
          <div className="header-chat">
            <p>
              {
                chats?.groups?.filter((item: any) => item.id === selectGroup)[0]
                  ?.title
              }
            </p>
          </div>
          {chats?.groups?.filter((item: any) => item.id === selectGroup)[0]
            ?.active === false ? (
            <button
              className="lightBtn btn"
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 9,
                paddingRight: 8,
                marginTop: 10,
                marginRight: 10,
                width: "100%",
              }}
              onClick={() => {
                if (
                  chats?.groups?.filter(
                    (item: any) => item.id === selectGroup
                  )[0]?.active === false &&
                  chats?.groups?.filter(
                    (item: any) => item.id === selectGroup
                  )[0]?.creatorId !== userLocal?.id
                ) {
                  if (selectGroup != undefined) {
                    acceptRequest({ groupId: selectGroup });
                  }
                }
              }}
            >
              {chats?.groups?.filter((item: any) => item.id === selectGroup)[0]
                ?.active === false
                ? chats?.groups?.filter(
                    (item: any) => item.id === selectGroup
                  )[0]?.creatorId !== userLocal?.id
                  ? "Подтвердите заявку на общение"
                  : "Ожидайте подтверждения заявки"
                : ""}
            </button>
          ) : (
            <>
              <div className="box-messages">
                {messages?.messages.map((item: any) => {
                  return (
                    <div
                      className={`item-message ${
                        userLocal.id === item.senderId
                          ? "my-message"
                          : "nomy-message"
                      }`}
                    >
                      <p>{item.text}</p>
                      <p style={{ fontSize: 12 }}>
                        {new Date(item.createdAt).toLocaleDateString() +
                          "   " +
                          new Date(item.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  );
                })}

                {/* <div className="item-message nomy-message">
                <p>Привет! Я только за! Во что будет играть?</p>
                <p style={{ fontSize: 12 }}>12.03.2023 16:40</p>
              </div> */}
              </div>
              <div className="send-messages">
                <input
                  className="input-chat"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <button
                  className="lightBtn btn chatBtn"
                  onClick={() => {
                    if (selectGroup != undefined) {
                      sendMessage({
                        groupId: selectGroup,
                        text: message,
                      }).then(() => setMessage(""));
                    }
                  }}
                >
                  Отправить
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {chats.groups.length === 0 && <h1>У ВАС ПОКА НЕТ ЧАТОВ</h1>}
      {chats.groups.length !== 0 && selectGroup === undefined && (
        <h1>ВЫБЕРИТЕ ЧАТ</h1>
      )}
    </div>
  );
};

export default Chat;
