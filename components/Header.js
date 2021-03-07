import Link from "next/link";
import React, { Fragment, useContext } from "react";
import Navegacion from "./layout/Navegacion";
import Buscar from "./ui/Buscar";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Boton from "./ui/Boton";
import { FirebaseContext } from "../firebase";

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;
const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: "Roboto Slab", serif;
  margin-right: 2rem;
  a{
    color: var(--naranja);
  }
`;

const Header = () => {
  const { usuario, firebase } = useContext(FirebaseContext);
  // const usuario = false;
  return (
    <Fragment>
      <header
        css={css`
          border-bottom: 2px solid var(--gris3);
          padding: 1rem 0;
        `}
      >
        <ContenedorHeader>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            <Logo>
              <Link href="/">P</Link>
            </Logo>

            <Buscar />
            <Navegacion />
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            {usuario ? (
              <Fragment>
                <p
                  css={css`
                    margin-right: 2rem;
                  `}
                >
                  Hola { usuario.displayName}
                </p>
                <Boton bgColor="true" onClick={() => firebase.cerrarSesion()}>Cerrar Sesion</Boton>
              </Fragment>
            ) : (
              <Fragment>
                <Link href="/login">
                  <Boton bgColor="true">Loging</Boton>
                </Link>
                <Link href="/crear-cuenta">
                  <Boton>Crear Cuenta</Boton>
                </Link>
              </Fragment>
            )}
          </div>
        </ContenedorHeader>
      </header>
    </Fragment>
  );
};

export default Header;
