import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import ItemDetail from "./ItemDetai";
import { initializeApp } from "firebase/app";

//Configuracion de firebase-----------------------------------------------------
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "olivernachermanuel-proyecto",
  storageBucket: "olivernachermanuel-proyecto.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_ID,
  appId: "1:721612872490:web:de05500ee31ae065e21c53",
  measurementId: "G-CTY1J091SS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//Configuracion de firebase------------------------------------------------------


function ItemDetailContainer() {
  const [prod, setProd] = useState({});
  const { idProd } = useParams();
 
  useEffect(() => {
    async function fetchProduct() {
      try {
        const productosColRef = collection(db, "productos");
        const docRef = doc(productosColRef, idProd);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setProd(docSnapshot.data());
          console.log(docSnapshot.data())
        } else {
          console.log("");
        }
      } catch (error) {
        console.log("", error);
      }
    }

    fetchProduct();
  }, [idProd, db]);

  return (
    <>
      <ItemDetail idProd={idProd} prod={prod} db={db} />
    </>
  );
}

export default ItemDetailContainer;