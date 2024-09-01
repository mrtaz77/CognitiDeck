"use client";

import { React, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Typography, Container, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './login.module.css';
import CustomTextField from '@/components/CustomTextField';
import { auth, googleAuth } from '@/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const idToken = await userCredential.user.getIdToken();
			const response = await fetch("/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${idToken}`,
				},
			});
			if (!response.ok) {
				setError(true);
				setErrorMessage('Failed to log in');
			}else {
				router.push('/');
			}
		} catch (err) {
			const errorMessage = err.message;
			const errorCode = err.code;

			setError(true);

			switch (errorCode) {
				case "auth/invalid-email":
					setErrorMessage("This email address is invalid.");
					break;
				case "auth/user-disabled":
					setErrorMessage(
						"This email address is disabled by the administrator."
					);
					break;
				case "auth/user-not-found":
					setErrorMessage("This email address is not registered.");
					break;
				case "auth/wrong-password":
					setErrorMessage("The password is invalid or the user does not have a password.")
					break;
				default:
					setErrorMessage(errorMessage);
					break;
			}
		};
	}

	const handleGoogleSignIn = async () => {
		try {
			const credential = await signInWithPopup(auth, googleAuth);
			const idToken = await credential.user.getIdToken();
			const response = await fetch("/api/login", {
				method: "POST", // Make sure the method matches your backend handler
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${idToken}`, // Include the token in the Authorization header
				},
			});
			if (!response.ok) {
				setError(true);
				setErrorMessage('Failed to log in');
			}
			else router.push('/');
		} catch (err) {
			const errorMessage = err.message;
			setError(true);
			setErrorMessage(errorMessage);
		}
	};

	return (
		<Container maxWidth="xs" className={styles.container}>
			<Typography variant="h3" align="center" sx={{ marginBottom: 4 }}>
				Sign in to your account
			</Typography>

			<Button variant="outlined" color="primary" className={styles.socialButton} onClick={handleGoogleSignIn}>
				<Image
					src="/google.svg" // Path to the Google SVG icon
					alt="Google Icon"
					width={24}
					height={24}
					className={styles.googleIcon}
				/>
				Sign in with Google
			</Button>

			<Box className={styles.divider}>
				<Typography variant="body1" align="center">
					Or, sign in with your email
				</Typography>
			</Box>

			<form onSubmit={handleSubmit}>
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
					Sign in
				</Button>
				{error && (
					<Box className={styles.errorBox}>
						<Typography variant="body2" sx={{ flex: 1 }}>
							{errorMessage}
						</Typography>
						<IconButton
							size="small"
							onClick={() => setError(false)}
							className={styles.errorButton}
						>
							<CloseIcon />
						</IconButton>
					</Box>
				)}
			</form>

			<Typography variant="body2" align="center">
				Don&#39;t you have an account?{' '}
				<Link href="/register" className={styles.link}>
					Sign Up
				</Link>
			</Typography>
		</Container>
	);
}
