import { NextResponse } from 'next/server';
import { checkIfUserNameExists, addUser, checkIfEmailExists } from '@/db/user';
import { initAdmin } from '@/db/firebaseAdmin';

export async function POST(req) {
	try {
		const data = await req.json();
		const userName = data.userName;
		const email = data.email;
		await initAdmin();
		const userNameExists = await checkIfUserNameExists(userName);
		if (userNameExists) return NextResponse.json({ error: 'Username unavailable' }, { status: 400 });
		const emailExists = await checkIfEmailExists(email);
		if (emailExists) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
		const user = await addUser(userName, email);
		return NextResponse.json({ message: 'User created successfully' , userName: user.userName, userId: user.userId, email: user.email }, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
	}
}