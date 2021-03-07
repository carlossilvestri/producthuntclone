// import styled from "@emotion/styled";
import { Fragment, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Heading,
  Error,
} from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarIniciarSesion from "../validacion/validarIniciarSesion";
import firebase from "../firebase";
import Router from "next/router";
const STATE_INICIAL = {
  email: "",
  password: "",
};
export default function Login() {
  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);
  const { nombre, email, password } = valores;
  const [error, setError] = useState(false);
  async function iniciarSesion() {
    console.log("iniciando sesion...");
    try {
      await firebase.login( email, password);
      Router.push('/');
    } catch (error) {
      console.error("Hubo un error al iniciar sesion: ", error);
      setError(error.message);
    }
  }
  return (
    <Fragment>
      <div>
        <Layout>
          <div>
            <Heading>Iniciar Sesión</Heading>
            <Formulario onSubmit={handleSubmit} noValidate>
              <Campo>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Tu email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.email && <Error>{errores.email}</Error>}
              <Campo>
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Tu password"
                  value={password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.password && <Error>{errores.password}</Error>}
              {error && <Error>{error}</Error>}
              <InputSubmit type="submit" value="Iniciar Sesión" />
            </Formulario>
          </div>
        </Layout>
      </div>
    </Fragment>
  );
}
