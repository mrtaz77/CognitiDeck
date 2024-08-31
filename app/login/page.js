"use client";

import { React, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import styles from '@/styles/auth.module.css';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
	};

	return (
		<Container maxWidth="xs" className={styles.container}>
			<Typography variant="h3" align="center" gutterBottom>
				Sign in to your account
			</Typography>

			<Button variant="outlined" color="primary" className={styles.socialButton}>
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

				<TextField
					label="Enter your email"
					variant="outlined"
					fullWidth
					margin="normal"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					sx={{
						marginBottom: '1.5rem',
						backgroundColor: '#2c2c2c',
						borderColor: '#444',
						'& .MuiInputBase-input': {
							color: '#ffffff',
						},
						'& .MuiInputLabel-root': {
							color: '#e0e0e0',
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: '#444',
						},
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: '#00BF56',
						},
						'& .MuiInputLabel-root.Mui-focused': {
							color: '#00BF56',
						},
						'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: '#00BF56',
						},
					}}
				/>
				<Typography variant="body1" align="left">
					Your Password
				</Typography>

				<TextField
					label="Enter your password"
					variant="outlined"
					fullWidth
					margin="normal"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					sx={{
						marginBottom: '1.5rem',
						backgroundColor: '#2c2c2c',
						borderColor: '#444',
						'& .MuiInputBase-input': {
							color: '#ffffff',
						},
						'& .MuiInputLabel-root': {
							color: '#e0e0e0',
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: '#444',
						},
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: '#00BF56',
						},
						'& .MuiInputLabel-root.Mui-focused': {
							color: '#00BF56',
						},
						'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: '#00BF56',
						},
					}}
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className={styles.submitButton}
				>
					Sign in
				</Button>
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
