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
  isUpdate?: boolean;
  info?: any;
  children?: React.ReactNode;
  orderId?: string;
}

const CreateCaseModal = ({
  isActive,
  setIsActive,
  isUpdate = false,
  info = null,
  orderId,
}: MonitoringModalProps) => {
  const [createCase, {}] = flightApi.useCreateOrderMutation();
  const [updateCase, {}] = flightApi.useUpdateOrderMutation();
  const [checkFile, { data: link, isSuccess }] =
    flightApi.useCheckFileMutation();
  const [linkFiles, setLinkFiles] = useState<any>(
    info === null ? [] : info.files
  );
  const { data: specializationsInServer, isLoading } =
    flightApi.useGetSpecializationsQuery();

  const select_cost_type = [
    {
      value: "inHour",
      label: "почасовая",
    },
    {
      value: "contract",
      label: "договорная",
    },
    {
      value: "inOrder",
      label: "за проект",
    },
  ];
  const select_specializations = () => {
    return specializationsInServer
      ? specializationsInServer?.specializations.map((item) => {
          return {
            value: item.title,
            label: item.title,
          };
        })
      : [];
  };

  const [description, setDescription] = useState(
    info === null ? "" : info.description
  );
  const [fileList, setFileList] = useState<any>(
    info === null ? [] : info.files
  );
  const [cost, setCost] = useState<string | null>(
    info === null ? "" : info.cost
  );
  const [costType, setCostType] = useState(
    info === null
      ? select_cost_type[0]
      : select_cost_type.filter((item) => item.value === info.costType)[0]
  );
  const [specializations, setSpecializations] = useState(
    info === null
      ? select_specializations()[0]
      : select_specializations().filter(
          (item) => item.value === info.specialization.title
        )[0]
  );

  const handleFileChange = async (e: any) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    checkFile(formData).then((data: any) => {
      if (data?.data.files !== undefined) {
        setFileList([...fileList, ...e.target.files]);
        setLinkFiles([...linkFiles, ...data?.data.files]);
      }
    });
  };

  useEffect(() => {
    if (costType.value === "contract") {
      setCost(null);
    }
  }, [costType]);

  if (isLoading) return <Loader />;

  return (
    <Modal
      isActive={isActive}
      setIsActive={setIsActive}
      headerTitle={!isUpdate ? "Cоздание заказа" : "Изменение заказа"}
      className="monitoringModal"
    >
      <>
        <div className="monitoringModalContainer">
          <Formik
            initialValues={{
              name: info === null ? "" : info.title,
              tags: info === null ? "" : info.tags.join(","),
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                //@ts-ignore
                errors.name = "Заполните имя";
              } else if (costType.value !== "contract" && !cost) {
                //@ts-ignore
                errors.name =
                  "При таком формате работы необходимо указать стоимость заказа";
              }
              if (!/^([А-Я]|[а-я]|\s|,|[A-Z]|[a-z]){0,30}$/.test(values.tags)) {
                //@ts-ignore
                errors.name =
                  "Для создания тегов используйте русские и латинские буквы, а также запятую";
              }
              console.log("errors", errors);
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              !isUpdate
                ? createCase({
                    title: values.name,
                    description: description,
                    files: linkFiles,
                    tags: values.tags.split(",").map((it: any) => it.trim()),
                    costType: costType.value,
                    cost: Number(cost),
                    specialization: specializations.value,
                  })
                : updateCase({
                    title: values.name,
                    description: description,
                    files: linkFiles,
                    tags: values.tags.split(",").map((it: any) => it.trim()),
                    costType: costType.value,
                    cost: Number(cost),
                    specialization: specializations.value,
                    orderId: orderId,
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
                    <p>НАЗВАНИЕ</p>
                    <input
                      type="string"
                      name="name"
                      className="input"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </div>

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

                  <div>
                    <p>ФАЙЛЫ (до 4 шт)</p>
                    <input
                      type="file"
                      name="files"
                      className="input"
                      onChange={handleFileChange}
                    />
                    <ul style={{ paddingTop: 12 }}>
                      {fileList.map((file: any, i: any) => (
                        <li key={i}>
                          {file.name === undefined ? file : file.name}{" "}
                          <p
                            onClick={() => {
                              setFileList(
                                fileList.filter(
                                  (it: any, index: number) => index !== i
                                )
                              );
                              setLinkFiles(
                                linkFiles.filter(
                                  (it: any, index: number) => index !== i
                                )
                              );
                            }}
                          >
                            Удалить
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p>CПЕЦИАЛИЗАЦИЯ</p>

                    <CustomSelect
                      value={specializations}
                      options={select_specializations()}
                      onChange={setSpecializations}
                      isHaveIcon={false}
                      width={"100%"}
                      heightSelect={45}
                      paddingIndicator={0}
                      paddingContainer={12}
                      backgroundColor={"#171226"}
                      menuPlacement={"bottom"}
                    />
                  </div>

                  <div>
                    <p>ТЭГИ(введите через запятую)</p>
                    <input
                      type="string"
                      name="tags"
                      className="input"
                      onChange={handleChange}
                      value={values.tags}
                    />
                  </div>

                  <div>
                    <p>СТОИМОСТЬ</p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <input
                        type="string"
                        name="cost"
                        className="input"
                        onChange={(v: any) => setCost(v.target.value)}
                        style={{ width: "50%" }}
                        disabled={costType.value === "contract"}
                        value={cost === null ? "" : cost}
                      />
                      <CustomSelect
                        value={costType}
                        options={select_cost_type}
                        onChange={setCostType}
                        isHaveIcon={false}
                        width={"50%"}
                        heightSelect={45}
                        paddingIndicator={0}
                        paddingContainer={12}
                        backgroundColor={"#171226"}
                        menuPlacement={"top"}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    // disabled={isSubmitting}
                    className="lightBtn btn"
                  >
                    {isUpdate ? "ИЗМЕНИТЬ ЗАКАЗ" : "CОЗДАТЬ ЗАКАЗ"}
                  </button>
                  {errors.name && touched.name && errors.name}
                </>
              </form>
            )}
          </Formik>
        </div>
      </>
    </Modal>
  );
};

export default CreateCaseModal;
