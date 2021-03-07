import { Fragment, useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  Campo,
  InputSubmit,
  Heading,
  Error,
} from "../components/ui/Formulario";
import useValidacion from "../hooks/useValidacion";
import validarCrearProducto from "../validacion/validarCrearProducto";
import { FirebaseContext } from "../firebase";
import Router, { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
import Error404 from "../components/layout/404";
const STATE_INICIAL = {
  nombre: '',
  empresa: '',
    imagen: '',
  url: '',
  descripcion: ''
}

export default function NuevoProducto() {
  // State de las imagenes.
  const [nombreimagen, guardarNombreImagen] = useState("");
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");
  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);
  const { nombre, email, empresa, url, descripcion } = valores;
  // Hook de routing para redireccionar.
  const router = useRouter();
  // Context con las operacion crud de firebase.
  const { usuario, firebase } = useContext(FirebaseContext);
  const [error, setError] = useState(false);
  async function crearProducto() {
    // Si el usuario no esta autenticado
    if (!usuario) {
      return router.push("/login");
    }
    // Crear el obj de nuevo producto.
    const producto = {
      nombre,
      empresa,
      url,
      urlimagen,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      }, 
      haVotado: []
    };
    // Insertarlo en la BD.
    await firebase.db.collection("productos").add(producto);
    // Redireccionar al usuario a la pag principal cuando carga bien el nuevo producto.
    return router.push('/');
  }
  // Funciones del componente FileUploader.
  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };

  const handleProgress = (progreso) => guardarProgreso({ progreso });

  const handleUploadError = (error) => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = (nombre) => {
    // console.log('En handleUploadSuccess ');
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombreImagen(nombre);
    firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        guardarUrlImagen(url);
      })
      .catch(function(error) {
        console.log('error.code ', error.code);
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
      
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  };
  return (
    <Fragment>
      <div>
        <Layout>
          { !usuario ? <Error404/> : (
            <div>
            <Heading>Nuevo producto</Heading>
            <Formulario onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Información General</legend>
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
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    type="text"
                    name="empresa"
                    id="empresa"
                    placeholder="Nombre de tu empresa"
                    value={empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.empresa && <Error>{errores.empresa}</Error>}
                <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </Campo>
                {/* errores.imagen && <Error>{errores.imagen}</Error>} */}
                <Campo>
                  <label htmlFor="url">url</label>
                  <input
                    type="url"
                    name="url"
                    id="url"
                    placeholder="URL del producto"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.url && <Error>{errores.url}</Error>}
              </fieldset>
              <fieldset>
                <legend>Sobre tu Producto</legend>
                <Campo>
                  <label htmlFor="descripcion">Descripción</label>
                  <textarea
                    name="descripcion"
                    id="descripcion"
                    placeholder="Tu Descripción"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.descripcion && <Error>{errores.descripcion}</Error>}
              </fieldset>
              {error && <Error>{error}</Error>}
              <InputSubmit type="submit" value="Crear Producto" />
            </Formulario>
          </div>
          )}
        </Layout>
      </div>
    </Fragment>
  );
}
