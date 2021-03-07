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
import validarCrearCuenta from "../validacion/validarCuenta";
import firebase from "../firebase";
import Router from "next/router";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

export default function CrearCuenta() {
  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);
  const { nombre, email, password } = valores;
  const [error, setError] = useState(false);
  async function crearCuenta() {
    console.log("Creando cuenta...");
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/');
    } catch (error) {
      console.error("Hubo un error al crear el usuario: ", error);
      setError(error.message);
    }
  }
  return (
    <Fragment>
      <div>
        <Layout>
          <div>
            <Heading>Crear Cuenta</Heading>
            <Formulario onSubmit={handleSubmit} noValidate>
              <Campo>
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Campo>
              {errores.nombre && <Error>{errores.nombre}</Error>}
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
              <InputSubmit type="submit" value="Crear Cuenta" />
            </Formulario>
          </div>
        </Layout>
      </div>
    </Fragment>
  );
}
