"use client";

import { React, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Typography, Container, Box, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './register.module.css';
import CustomTextField from '@/components/CustomTextField';
import { auth, googleAuth } from '@/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const blankError = (error) => {
		setError(true);
		setErrorMessage(`${error} is required`);
	}

	const newUserReq = async (userName, email) => {
		const response = await fetch('/api/user/newUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				userName: userName,
				email: email
			}),
		});
		if (response.ok) {
			const res = await response.json();
			router.push('/login')
		} else {
			const err = await response.json();
			setError(true);
			setErrorMessage(err.error);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!userName.length) blankError("Username");
		else if (!email.length) blankError("Email");
		else if (!password.length) blankError("Password");
		else {
			try {
				await createUserWithEmailAndPassword(auth, email, password);
				await newUserReq(userName, email);
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
						break;
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
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, googleAuth);
			const user = result.user;
			const userName = user.displayName;
			const email = user.email;
			await newUserReq(userName, email);
			router.push('/login');
		} catch (error) {
			console.error('Error signing in with Google:', error);
		}
	};

	return (
		<Box className={styles.mainContainer}>
			<Box className={styles.imageContainer}>
				<Stack
					className={styles.stackContainer}
					direction="column"
					alignItems="center"
					justifyContent="center"
					spacing={2}
				>
					<Image
						src="/CognitiDeck-removebg.png" // Path to your logo
						alt="Logo"
						width={400}
						height={400}
						className={styles.logoImage}
					/>
					<Typography variant="h1" className={styles.heading}>
						Cogniti Deck
					</Typography>
				</Stack>
			</Box>

			<Container maxWidth="xs" className={styles.container} sx={{ flex: 1 }}>
				<Typography variant="h3" align="center" gutterBottom>
					Create your account
				</Typography>

				<Button variant="contained" color="primary" className={styles.socialButton} onClick={handleGoogleSignIn}>
					<Image
						src="/google.svg" 
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
					Already have an account?{' '}
					<Link href="/login" className={styles.link}>
						Sign In
					</Link>
				</Typography>
			</Container>
		</Box>
	);
}
