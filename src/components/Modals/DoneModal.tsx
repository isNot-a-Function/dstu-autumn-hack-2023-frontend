import React, { useEffect, useState } from "react";
import Modal from "../UI/Modal";
import { topUpMonitoringServers } from "../../consts/modal";
import { Formik, Field, useFormik, FormikProvider } from "formik";

import CustomSelect from "../UI/CustomSelect";
import Loader from "../Loader";
import { flightApi } from "../../store";

interface MonitoringModalProps {
  isActive: boolean;
  setIsActive: (param: boolean) => void;
  isExecutor?: boolean;
  info?: any;
  children?: React.ReactNode;
  orderId?: string;
  isHaveCost?: boolean;
  userId: string;
}

const DoneModal = ({
  isActive,
  setIsActive,
  isExecutor = true,
  info = null,
  orderId,
  isHaveCost = true,
  userId,
}: MonitoringModalProps) => {
  // const [done] = flightApi.useDoneExecutorMutation();
  // const [approve] = flightApi.useCustomerApproveMutation();

  const [addRaiting] = flightApi.useAddRaitingMutation();

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
  const [rating, setRating] = useState(
    select_cost_type[select_cost_type.length - 1]
  );

  const [description, setDescription] = useState(
    info === null ? "" : info.description
  );

  // if (isLoading) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Поcтавьте оценку попутчику"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{ cost: 0 }}
            // validate={(values) => {
            //   const errors = {};
            //   if (!values.name) {
            //     //@ts-ignore
            //     errors.name = "Заполните имя";
            //   }
            //   if (!/^([А-Я]|[а-я]|\s|,|[A-Z]|[a-z]){0,30}$/.test(values.tags)) {
            //     //@ts-ignore
            //     errors.name =
            //       "Для создания тегов используйте русские и латинские буквы, а также запятую";
            //   }
            //   console.log("errors", errors);
            //   return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
              addRaiting({
                toWhomId: Number(userId),
                rating: Number(rating.value),
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
                  {/* <div>
                    <p>КОММЕНТАРИЙ</p>
                    <textarea
                      name={"description"}
                      id="description"
                      rows={4}
                      className="textarea-description"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>
                  </div> */}

                  <div>
                    <p>ОЦЕНКА ПОПУТЧИКА </p>

                    <CustomSelect
                      value={rating}
                      options={select_cost_type}
                      onChange={setRating}
                      isHaveIcon={false}
                      width={"100%"}
                      heightSelect={45}
                      paddingIndicator={0}
                      paddingContainer={12}
                      backgroundColor={"#171226"}
                      menuPlacement={"bottom"}
                    />
                  </div>

                  {!isHaveCost && !isExecutor && (
                    <div>
                      <p>СТОИМОСТЬ ЗАКАЗА</p>
                      <input
                        type="string"
                        name="cost"
                        className="input"
                        onChange={handleChange}
                        value={values.cost}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    // onClick={() => {
                    //   addRaiting({
                    //     toWhomId: Number(userId),
                    //     rating: Number(rating.value),
                    //   });
                    // }}
                    className="lightBtn btn"
                  >
                    ОЦЕНИТЬ
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

export default DoneModal;
