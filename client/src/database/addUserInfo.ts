import { collection, addDoc, DocumentReference } from "firebase/firestore";
import { db } from "../api/firebase/firebaseConfig";
import { User } from "../interfaces/database/dbInterface";

export const createUser = async (user: User): Promise<DocumentReference> => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};
