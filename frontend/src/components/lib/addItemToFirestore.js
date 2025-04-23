import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();

async function addItemToFirestore(itemName) {

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No user is currently signed in.");
  }

  const userId = user.uid;

  try {
    const itemsRef = collection(db, "users", userId, "items");
    const docRef = await addDoc(itemsRef, {
      name: itemName,
    });
    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
    throw e
  }
}

export default addItemToFirestore;


// import React, { useState, useEffect } from 'react';
// import AddItemForm from './AddItemForm';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

// const ItemList = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const auth = getAuth();
//   const db = getFirestore();
//   const user = auth.currentUser;

//   useEffect(() => {
//     const loadItems = async () => {
//       if (user) {
//         const itemsRef = collection(db, "users", user.uid, "items");
//         const querySnapshot = await getDocs(itemsRef);
//         const initialItems = querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
//         setItems(initialItems);
//       }
//       setLoading(false);
//     };

//     setLoading(true); // Set loading to true before fetching
//     loadItems();
//   }, [user, db]); // React to changes in user and db


//   const handleItemAdded = (itemId) => {
//     setItems(prevItems => [...prevItems, { id: itemId, name: 'New Item' }]); // You might want to fetch the item's data
//   };

//   if (loading) {
//     return <p>Loading items...</p>;
//   }

//   return (
//     <div>
//       <AddItemForm onAdd={handleItemAdded} />
//       <ul>
//         {items.map(item => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ItemList;
