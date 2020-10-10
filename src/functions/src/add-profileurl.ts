import * as admin from 'firebase-admin';

export async function addProfileUrl(url: string): Promise<void> {
    if(url) {
        const userId = getUserId(url);
        await updateProfilePicUrl(userId, url);
    } else {
        throw new Error('profile pic url cannot be empty.');
    }

}

function getUserId(url: string): string {
    const urlParts = url.split('/');
    if(urlParts.length > 1) {
        const filenameParts = urlParts[1].split('.');
        if(filenameParts.length > 1) {
            return filenameParts[0];
        }
    }
    throw new Error('profile pic url is not in correct format.');
}

async function updateProfilePicUrl(userId: string, url: string) : Promise<void> {
    const db = admin.firestore();
    await db.collection('UserProfiles').doc(userId).set({'profilePicUrl': url}, { merge: true });
}