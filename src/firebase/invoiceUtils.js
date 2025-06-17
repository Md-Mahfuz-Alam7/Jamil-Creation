import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

// Initialize counter if it doesn't exist
export const initializeCounter = async () => {
  const counterRef = doc(db, 'counters', 'invoice');
  const counterDoc = await getDoc(counterRef);
  
  if (!counterDoc.exists()) {
    await setDoc(counterRef, { value: 0 });
  }
};

// Get current invoice number without incrementing counter
export const getCurrentInvoiceNumber = async () => {
  const counterRef = doc(db, 'counters', 'invoice');
  const counterDoc = await getDoc(counterRef);
  
  if (!counterDoc.exists()) {
    await initializeCounter();
    return 'INV-0001';
  }
  
  const currentValue = counterDoc.data().value;
  const formattedNumber = String(currentValue + 1).padStart(4, '0');
  return `INV-${formattedNumber}`;
};

// Get next invoice number and increment counter
export const getNextInvoiceNumber = async () => {
  const counterRef = doc(db, 'counters', 'invoice');
  const counterDoc = await getDoc(counterRef);
  
  if (!counterDoc.exists()) {
    await initializeCounter();
    return 'INV-0001';
  }
  
  const currentValue = counterDoc.data().value;
  const nextValue = currentValue + 1;
  
  // Update counter
  await updateDoc(counterRef, { value: nextValue });
  
  // Format invoice number with leading zeros
  const formattedNumber = String(nextValue).padStart(4, '0');
  return `INV-${formattedNumber}`;
};

// Get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};
