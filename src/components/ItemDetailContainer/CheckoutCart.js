
import { useContext, useState } from "react";
import cartContext from "../Context/CartContext";
import { addDoc, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import "./ItemDetail.css" 
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";

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

function CheckoutCart() {
  const [buyerInfo, setBuyerInfo] = useState({});
  const { cart, getTotal, clearCart } = useContext(cartContext);
  const [orderId, setOrderId]=useState('')
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const order = { buyer: buyerInfo, items: cart, total: getTotal()};
    console.log(order)
    const ordersCollection = collection(db, "orders");
    addDoc(ordersCollection, order)
      .then((docRef) => {
       setOrderId(docRef.id);
       clearCart()
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBuyerInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      {orderId ? (
        <div>
          <p className="text-center text-white">Muchas gracias! su orden de compra es : {orderId}</p>
         <div className="text-center mt-4"> 
        <Link to="/">   <button className="btn btn-secondary " onClick={() => console.log('Hiciste click!')}> Volver al Inicio </button> </Link></div>
        </div>
      ) : (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="text-center mb-4">Orden de Compra</h3>
              <form className="Form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" className="form-control" id="nombre" name="nombre" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono:</label>
                  <input type="text" className="form-control" id="telefono" name="telefono" onChange={handleInputChange} />
                </div>
                <button className="btn btn-primary btn-block mt-4" type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
  

  }
export default CheckoutCart  
