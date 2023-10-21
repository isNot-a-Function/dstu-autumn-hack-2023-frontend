import React, { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../store";
import { UserData } from "../types/authTypes";
import Input from "../components/UI/Input";
import { Formik } from "formik";
import "../assets/scss/pages/_login.scss";
import { sign } from "crypto";
import "../assets/scss/components/UI/_input.scss";
import Train from "../components/Train";
import { useWindowSize } from "../hooks/useWindowSize";

const Login = () => {
  const [signUp, { data: dataSignUp, error: errorSignUp }] =
    authApi.useLazySignUpQuery();
  const [logIn, { data: dataLogIn, error: errorLogIn }] =
    authApi.useLazySignInQuery();
  const [isLogIn, setIsLogIng] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dimensions = useWindowSize();

  useEffect(() => {
    if (errorLogIn) {
      navigate("/login");
    } else {
      if (dataLogIn !== undefined || dataSignUp != undefined) {
        const token: string | undefined = dataLogIn?.token || dataSignUp?.token;
        console.log("token", token);
        const user: UserData | undefined = dataLogIn?.user || dataSignUp?.user;
        if (token !== undefined) {
          localStorage.setItem("accessToken", token);
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/store");
        } else {
          navigate("/");
        }
      }
    }
  }, [dataLogIn, dataSignUp]);

  return (
    <div className="box-login-page">
      {/* <div className="box-symbols waviy">
        <span style={{ "--i": 1 } as React.CSSProperties}>D</span>
        <span style={{ "--i": 2 } as React.CSSProperties}>E</span>
        <span style={{ "--i": 3 } as React.CSSProperties}>L</span>
        <span style={{ "--i": 4 } as React.CSSProperties}>O</span>
      </div> */}
      {dimensions.width > 800 && isLogIn && <Train />}
      <div className="box-formik-login">
        <h1>{isLogIn ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
            phone: "",
            family: "",
            name: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email || !values.password) {
              //@ts-ignore
              errors.email = "Заполните все поля";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              //@ts-ignore
              errors.email = "Некорректный адрес электронной почты";
            }
            if (values.password.length < 8) {
              //@ts-ignore
              errors.password = "Некорректный пароль";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            isLogIn
              ? logIn({
                  email: values.email,
                  password: values.password,
                })
              : signUp({
                  email: values.email,
                  password: values.password,
                  // firstname: values.name,
                  // lastname: values.family,
                  // phone: values.phone,
                });
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
            <form onSubmit={handleSubmit} className="box-form-login">
              <div className="item-form-login">
                <p>Email</p>
                <input
                  type="string"
                  name="email"
                  className="input"
                  onChange={handleChange}
                  placeholder="puti@mail.ru"
                  // onBlur={handleBlur}
                  value={values.email}
                />
              </div>

              <div className="item-form-login">
                <p>Пароль</p>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="123456"
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  value={values.password}
                />
              </div>
              {/* 
              {!isLogIn && (
                <>
                  <div className="item-form-login">
                    <p>Номер телефона</p>
                    <input
                      type="phone"
                      name="phone"
                      className="input"
                      placeholder="+79181175755"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      value={values.phone}
                    />
                  </div>
                  <div className="item-form-login">
                    <p>Фамилия</p>
                    <input
                      type="family"
                      name="family"
                      className="input"
                      placeholder="Иванов"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      value={values.family}
                    />
                  </div>
                  <div className="item-form-login">
                    <p>Имя</p>
                    <input
                      type="name"
                      name="name"
                      className="input"
                      placeholder="Иван"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>
                </>
              )} */}

              <div
                className="box-sign-up"
                onClick={() => setIsLogIng(!isLogIn)}
              >
                <p>{!isLogIn ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}</p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="lightBtn btn"
              >
                {isLogIn ? "ВОЙТИ" : "ЗАРЕГИСТРИРОВАТЬСЯ"}
              </button>
              {(errors.email && touched.email && errors.email) ||
                (errors.password && touched.password && errors.password)}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
