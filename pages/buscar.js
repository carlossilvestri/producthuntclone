import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Router, { useRouter } from "next/router";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../hooks/useProductos";
const Heading = styled.h1`
  color: red;
`;

export default function Buscar() {
  const router = useRouter();
  const { query: {q}} = router;
  console.log(q);
  // Todos los productos.
  const {productos} = useProductos('creado');
  const [resultado, guardarResultado] = useState([]);
  useEffect(() => {
    if(q){
   const busqueda = q.toLowerCase();
   const filtro = productos.filter(producto => {
     return (producto.nombre.toLowerCase().includes(busqueda) || producto.descripcion.toLowerCase().includes(busqueda));

   });
   guardarResultado(filtro);
  //  console.log('busqueda ', busqueda);
  //  console.log('filtro ', filtro);
    }
  }, [q, productos])
  return (
    <Fragment>
      <Layout>
        <Heading>Buscar</Heading>
          <div className="listado-productos">
            <div className="contenedor">
              <div className="bg-white">
                { resultado.map(producto => (
                  <DetallesProducto key={producto.id} producto={producto} />
                )) }
              </div>
            </div>
          </div>
        </Layout>
    </Fragment>
  );
}
