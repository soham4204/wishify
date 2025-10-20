// src/services/firestore.js
import { db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { nanoid } from 'nanoid';

/**
 * Checks if a document ID already exists in the 'birthdays' collection
 * @param {string} id - The ID to check
 * @returns {Promise<boolean>} - True if the ID exists, false otherwise
 */
const checkIdExists = async (id) => {
  const docRef = doc(db, "birthdays", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

/**
 * Generates a unique, 8-character ID
 * (Fulfills FR-1.1 and FR-1.4)
 */
export const generateUniqueId = async () => {
  let uniqueId = nanoid(8);
  let exists = await checkIdExists(uniqueId);

  // Keep generating until an unused ID is found
  while (exists) {
    uniqueId = nanoid(8);
    exists = await checkIdExists(uniqueId);
  }

  return uniqueId;
};

/**
 * Saves the birthday page data to Firestore
 * (Fulfills FR-1.3)
 * @param {string} id - The unique document ID
 * @param {object} data - The page data from the creator store
 * @returns {Promise<object>} - The saved document data
 */
export const createBirthdayPage = async (id, data) => {
  const docRef = doc(db, "birthdays", id);

  // Format the data according to our Data Model (SRS 5.2)
  const pageData = {
    id: id,
    createdAt: serverTimestamp(),
    birthdayPersonName: data.birthdayPersonName,
    theme: data.theme,
    images: data.images || [], // Array of { url, id }

    // Phase 2 & 3 data
    messages: data.messages || [],
    settings: {
      music: data.music || null,
      birthdayDate: data.birthdayDate || null,
      age: data.age || null,
    },
    voiceMessage: data.voiceMessage || null,
    creatorName: data.creatorName || '',
    viewCount: 0, // Default view counter
  };

  await setDoc(docRef, pageData);
  return pageData;
};

/**
 * Fetches a single birthday page document from Firestore
 * (Fulfills FR-9.3 and FR-9.6)
 * @param {string} id - The document ID from the URL
 * @returns {Promise<object|null>} - The document data or null if not found
 */
export const getBirthdayPage = async (id) => {
  if (!id) return null;
  const docRef = doc(db, "birthdays", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // Return the data if found
  } else {
    return null; // FR-9.4: Return null if no doc
  }
};