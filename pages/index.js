import React, { Fragment } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../hooks/useProductos";
const Heading = styled.h1`
  color: red;
`;

export default function Home() {
  const {productos} = useProductos('creado');
  return (
    <Fragment>
      <div>
        <Layout>
        <Heading>Inicio</Heading>
          <div className="listado-productos">
            <div className="contenedor">
              <div className="bg-white">
                { productos.map(producto => (
                  <DetallesProducto key={producto.id} producto={producto} />
                )) }
              </div>
            </div>
          </div>
        </Layout>
      </div>
    </Fragment>
  );
}
