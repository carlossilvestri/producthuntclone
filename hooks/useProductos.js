import React, {useState, useEffect, useContext} from 'react';
import { FirebaseContext } from '../firebase';

const useProductos = orden => {
    const [productos, guardarProductos] = useState([]);
    const { firebase } = useContext(FirebaseContext);
    // Al cargar. Hacer la consulta 1 vez.
    useEffect(() => {
      const obtenerProductos = () => {
        firebase.db.collection('productos').orderBy(orden, 'desc').onSnapshot(manejarSnapshot);
      }
      obtenerProductos();
    }, []);
    const manejarSnapshot = (snapshot) => {
      const productos = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data() 
        }
      });
      // console.log('productos ', productos);
      guardarProductos(productos);
    }
    return {
        productos
    }
}
export default useProductos;