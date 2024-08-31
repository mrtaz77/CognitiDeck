"use client";

import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ label, type, value, onChange }) => {
	return (
		<TextField
			label={label}
			variant="outlined"
			fullWidth
			margin="normal"
			type={type}
			value={value}
			onChange={onChange}
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
	);
};

export default CustomTextField;
