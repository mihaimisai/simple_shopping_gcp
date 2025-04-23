import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const addItemToFirestore = async (itemName) => {
  console.log("item to add is: ", itemName)
}

export default addItemToFirestore;
