import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { topUpMonitoringServers } from "../../consts/modal";
import { Formik, Field, useFormik, FormikProvider } from "formik";

import CustomSelect from "../UI/CustomSelect";
import Loader from "../Loader";
import { flightApi, userApi } from "../../store";

interface MonitoringModalProps {
  isActive: boolean;
  setIsActive: (param: boolean) => void;
  isExecutor?: boolean;
}

const UpdateProfileModal = ({
  isActive,
  setIsActive,
}: MonitoringModalProps) => {
  const [updateUser] = userApi.useUpdateUserMutation();

  const select_cost_type = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
  ];

  // if (isLoading) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Изменение профиля"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{ name: "", family: "", email: "", phone: "" }}
            // validate={(values) => {
            //   const errors = {};
            //   // if (!values.name) {
            //   //   //@ts-ignore
            //   //   errors.name = "Заполните имя";
            //   // }
            //   if (!/^([А-Я]|[а-я]|\s|,|[A-Z]|[a-z]){0,30}$/.test(values.tags)) {
            //     //@ts-ignore
            //     errors.name =
            //       "Для создания тегов используйте русские и латинские буквы, а также запятую";
            //   }
            //   console.log("errors", errors);
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              updateUser({
                firstname: values.name,
                lastname: values.family,
                email: values.email,
                phone: values.phone,
              });
              setIsActive(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className="box-form-create-case-modal"
              >
                <>
                  <div>
                    <p>ИМЯ</p>
                    <input
                      type="string"
                      name="name"
                      className="input"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>

                  <div>
                    <p>ФАМИЛИЯ</p>
                    <input
                      type="string"
                      name="family"
                      className="input"
                      onChange={handleChange}
                      value={values.family}
                    />
                  </div>

                  <div>
                    <p>ТЕЛЕФОН</p>
                    <input
                      type="phone"
                      name="phone"
                      className="input"
                      onChange={handleChange}
                      value={values.phone}
                    />
                  </div>

                  <div>
                    <p>EMAIL</p>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </div>

                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="lightBtn btn"
                  >
                    ИЗМЕНИТЬ
                  </button>
                  {/* {errors.name && touched.name && errors.name} */}
                </>
              </form>
            )}
          </Formik>
        </div>
      </>
    </Modal>
  );
};

export default UpdateProfileModal;
