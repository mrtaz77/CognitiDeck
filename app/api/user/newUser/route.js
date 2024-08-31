import { NextResponse } from 'next/server';
import { checkIfUserNameExists, addUser } from '@/db/user';
import { initAdmin } from '@/db/firebaseAdmin';

export async function POST(req) {
	try {
		const { userName } = await req.json();
		if (!userName) return NextResponse.json({ error: 'Username is required' }, { status: 400 });
		await initAdmin();
		const userNameExists = await checkIfUserNameExists(userName);
		if (userNameExists) return NextResponse.json({ error: 'Username unavailable' }, { status: 400 });
		const user = await addUser(userName);
		return NextResponse.json({ message: 'User created successfully' , userName: user.userName, userId: user.userId }, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
	}
}