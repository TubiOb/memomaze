import { updateDoc, serverTimestamp } from "firebase/firestore";

export const editFile = async (fileDocRef, fileDetails, fetchFiles) => {
    try {
        await updateDoc(fileDocRef, {
            ...fileDetails,
            updatedAt: serverTimestamp(),
        });
        console.log('File updated successfully.');
    }
    catch (err) {
        console.log('Error updating file:', err);
    }
};




export const updateFile = async (updatedFileSetter, folderName, fetchFiles) => {
    try {
        const updatedFiles = await fetchFiles(folderName);
        updatedFileSetter(updatedFiles);
    }
    catch (err) {
        console.log('Error updating files', err);
    }
}