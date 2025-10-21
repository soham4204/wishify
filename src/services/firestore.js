// src/services/firestore.js
import { db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, increment } from "firebase/firestore";
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
    images: data.images || [],
    photoLayout: data.photoLayout,

    // Phase 2 & 3 data
    messages: data.messages || [],
    settings: {
      music: data.music || null,
      birthdayDate: data.birthdayDate || null,
      age: data.age || null,
      showViewCount: data.showViewCount,
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

// --- NEW FUNCTION (FR-16.1) ---
/**
 * Atomically increments the view count for a birthday page.
 * This is "atomic," meaning it's safe from race conditions.
 * @param {string} id - The document ID
 */
export const incrementViewCount = async (id) => {
  if (!id) return;
  const docRef = doc(db, "birthdays", id);

  try {
    await updateDoc(docRef, {
      viewCount: increment(1) // Atomically increments the field
    });
  } catch (error) {
    // This might fail if the document doesn't exist, but that's okay.
    console.warn("Could not increment view count:", error.message);
  }
};

/**
 * Saves the birthday person's thank you message to the document.
 * @param {string} id - The document ID
 * @param {string} message - The thank you message
 */
export const saveThankYouMessage = async (id, message) => {
  if (!id || !message) return;
  const docRef = doc(db, "birthdays", id);

  try {
    await updateDoc(docRef, {
      thankYouMessage: {
        content: message,
        timestamp: serverTimestamp() // FR-17.6
      }
    });
  } catch (error) {
    console.error("Error saving thank you message:", error);
    throw new Error("Could not save thank you message.");
  }
};