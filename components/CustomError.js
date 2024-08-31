"use client";

import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomError = ({ errorMessage, onClose }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				backgroundColor: '#F8D7DA', // Light red background
				color: '#D32F2F', // Dark red text
				padding: '24px',
				borderRadius: '8px',
				marginTop: 2,
				marginBottom: 2,
				width: '100%',
				maxWidth: '370px',
				justifyContent: 'space-between', // Space between text and close button
				position: 'relative',
				textAlign: 'left',
			}}
		>
			<Typography variant="body2" sx={{ flex: 1 }}>
				{errorMessage}
			</Typography>
			<IconButton
				size="small"
				onClick={onClose}
				sx={{
					color: '#D32F2F',
					padding: 0,
					marginLeft: '10px',
				}}
			>
				<CloseIcon />
			</IconButton>
		</Box>
	);
};

export default CustomError;
