import { db } from "../api/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  WhereFilterOp,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Favorite } from "../interfaces/database/dbInterface";

export const addData = async (dbName: string, data: Favorite) => {
  try {
    const docRef = await addDoc(collection(db, dbName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

export const deleteData = async (dbName: string, id: string) => {
  try {
    const delRef = await deleteDoc(doc(db, dbName, id));
    console.log("Document removed with ID: ", id);
    return delRef;
  } catch (error) {
    console.error("Error removing document:", error);
    throw error;
  }
};

export const getData = async (
  dbName: string,
  field: string,
  operator: WhereFilterOp,
  value: string
) => {
  try {
    const q = query(collection(db, dbName), where(field, operator, value));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      user_id: doc.data().user_id ?? "",
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};
