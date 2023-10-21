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
  orderId: string;
}

const CreateResponseModal = ({
  isActive,
  setIsActive,
  orderId,
}: MonitoringModalProps) => {
  const [createResponse] = flightApi.useСreateResponseMutation();

  const [description, setDescription] = useState("");

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={"Cоздание отклика"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{ name: "", tags: "", cost: "" }}
            validate={(values) => {
              const errors = {};
              if (!description) {
                //@ts-ignore
                errors.name = "Заполните описание";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              createResponse({
                orderId: orderId,
                comment: description,
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
                <div>
                  <p>ОПИСАНИЕ</p>
                  <textarea
                    name={"description"}
                    id="description"
                    rows={4}
                    className="textarea-description"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="lightBtn btn"
                >
                  {"ОТПРАВИТЬ ОТКЛИК"}
                </button>
                {errors.name && touched.name && errors.name}
              </form>
            )}
          </Formik>
        </div>
      </>
    </Modal>
  );
};

export default CreateResponseModal;
