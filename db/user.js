import "server-only"

import { getFirestore } from "firebase-admin/firestore"

export async function checkIfUserNameExists (userName) {
	try {
		const firestore = getFirestore();
        const userQuerySnapshot = await firestore
            .collection('users')
            .where('userName', '==', userName)
            .get();

        return !userQuerySnapshot.empty;
    } catch (error) {
        console.error('Error checking username:', error);
        throw new Error('Error checking username');
    }
}

export async function checkIfEmailExists (email) {
	try {
		const firestore = getFirestore();
        const userQuerySnapshot = await firestore
            .collection('users')
            .where('email', '==', email)
            .get();

        return !userQuerySnapshot.empty;
    } catch (error) {
        console.error('Error checking email:', error);
        throw new Error('Error checking email');
    }
}


export async function addUser (userName, email) {
	try {
		const firestore = getFirestore();
        const usersCollection = firestore.collection('users');
        const lastUserSnapshot = await usersCollection
            .orderBy('userId', 'desc')
            .limit(1)
            .get();

        let newUserId = 1;
        if (!lastUserSnapshot.empty) {
            const lastUser = lastUserSnapshot.docs[0].data();
            newUserId = lastUser.userId + 1;
        }

        const newUserRef = usersCollection.doc();
        await newUserRef.set({
            userName: userName,
            userId: newUserId,
			email: email
        });

        return { userName: userName, userId: newUserId, email: email };
    } catch (error) {
        console.error('Error adding new user:', error);
        throw new Error('Error creating new user');
    }
}