"use client";

import { React, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import styles from '@/styles/auth.module.css';
import CustomTextField from '@/components/CustomTextField';
import { auth, firestore } from '@/firebase'

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
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
					<Box className="error-box">
						<Typography variant="body2" className="error-box-text">
							{errorMessage}
						</Typography>
						<IconButton
							size="small"
							onClick={() => setError(false)}
							className="error-box-close"
						>
							<CloseIcon />
						</IconButton>
					</Box>
				)}
			</form>

			<Typography variant="body2" align="center">
				Don&#39;t you have an account?{' '}
				<Link href="/register" className={styles.signUpLink}>
					Sign Up
				</Link>
			</Typography>
		</Container>
	);
}
