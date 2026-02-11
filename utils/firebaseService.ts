import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { LogEntry, AppSettings } from '../types';

interface AppData {
    logs: Record<string, LogEntry>;
    settings: AppSettings;
}

const COLLECTION_NAME = 'user_data';

export const saveToFirebase = async (syncKey: string, data: AppData) => {
    if (!syncKey || syncKey.length < 3) return;

    try {
        const docRef = doc(db, COLLECTION_NAME, syncKey);
        await setDoc(docRef, {
            ...data,
            updatedAt: Date.now()
        });
        console.log("Synced to Firebase");
    } catch (e) {
        console.error("Error syncing to Firebase:", e);
    }
};

export const fetchFromFirebase = async (syncKey: string): Promise<AppData | null> => {
    if (!syncKey || syncKey.length < 3) return null;

    try {
        const docRef = doc(db, COLLECTION_NAME, syncKey);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data() as AppData;
        }
    } catch (e) {
        console.error("Error fetching from Firebase:", e);
    }
    return null;
};
