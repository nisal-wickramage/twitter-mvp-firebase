import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { addProfileUrl } from './add-profileurl';

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const addProfilePicUrl = functions.storage.object().onFinalize(async (object) => {
    console.log(object.name);
    await addProfileUrl(object.name ? object.name: '');
});
