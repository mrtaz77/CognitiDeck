"use client";

import { React, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Typography, Container, Box } from '@mui/material';
import styles from '@/styles/auth.module.css';
import CustomTextField from '@/components/CustomTextField';
import CustomError from '@/components/CustomError';
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			const response = await fetch('/api/user/newUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userName }),
			});
			if (response.ok) {
				const res = await response.json();
				console.log(`${res.message} with username: ${res.userName} and userId: ${res.userId}`);
				router.push('/login')
			} else {
				const err = await response.json();
				setError(true);
				setErrorMessage(err.error);
			}
		} catch (err) {
			const errorMessage = err.message;
			const errorCode = err.code;
			setError(true);
			switch (errorCode) {
				case "auth/weak-password":
					setErrorMessage("The password is too weak.");
					break;
				case "auth/email-already-in-use":
					setErrorMessage(
						"This email address is already in use by another account."
					);
				case "auth/invalid-email":
					setErrorMessage("This email address is invalid.");
					break;
				case "auth/operation-not-allowed":
					setErrorMessage("Email/password accounts are not enabled.");
					break;
				default:
					setErrorMessage(errorMessage);
					break;
			}
		}
	};

	return (
		<Container maxWidth="xs" className={styles.container}>
			<Typography variant="h3" align="center" gutterBottom>
				Create your account
			</Typography>

			<Button variant="outlined" color="primary" className={styles.socialButton}>
				<Image
					src="/google.svg" // Path to the Google SVG icon
					alt="Google Icon"
					width={24}
					height={24}
					className={styles.googleIcon}
				/>
				Sign up with Google
			</Button>

			<Box className={styles.divider}>
				<Typography variant="body1" align="center">
					Or, sign up with your email
				</Typography>
			</Box>

			<form onSubmit={handleSubmit}>
				<Typography variant="body1" align="left">
					Username
				</Typography>

				<CustomTextField
					label="Enter your username"
					type="text"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>

				<Typography variant="body1" align="left">
					Your Email
				</Typography>

				<CustomTextField
					label="Enter your email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Typography variant="body1" align="left">
					Your Password
				</Typography>

				<CustomTextField
					label="Enter your password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={styles.submitButton}
				>
					Sign Up
				</Button>
				{error && (
					<CustomError
						errorMessage={errorMessage}
						onClose={() => setError(false)}
					/>
				)}
			</form>

			<Typography variant="body2" align="center">
				Already have an account?{' '}
				<Link href="/login" className={styles.link}>
					Sign In
				</Link>
			</Typography>
		</Container>
	);
}
