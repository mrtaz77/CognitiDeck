"use client";

import { useRouter } from "next/navigation";
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Button,
	Container,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableContainer,
	Card,
	CardContent,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function HomePage({ userName }) {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			await fetch("/api/logout");
			router.push("/login");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};



	return (
		<>
			<AppBar position="static" className="navbar">
				<Toolbar>
					<Typography variant="h4" className="title">
						<b>CognitiDeck</b>
					</Typography>
					<Button
						className="button-navItem"
						onClick={() => router.push(`/pricing`)}
					>
						Pricing
					</Button>
					<Button
						onClick={handleLogout}
						className="button-logout"
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>

			<Box
				style={{
					minHeight: "100vh",
					padding: '32px',
					background: "linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb))",
					color: "rgb(var(--foreground-rgb))",
					width: '100%',
				}}
			>
				{/* Profile and Actions */}
				<Grid container spacing={2} style={{ marginBottom: '32px' }}>
					{/* Profile Section */}
					<Grid item xs={12} md={4}>
						<Card className="profile-card" style={{ backgroundColor: 'transparent', border: '2px solid rgb(var(--foreground-rgb))' }}>
							<CardContent>
								<Typography variant="h3" className="profile-title">
									Profile
								</Typography>
								<Typography variant="h4" className="profile-username">
									{userName}
								</Typography>
							</CardContent>
						</Card>
					</Grid>

					{/* Flashcard Table */}
					<Grid item xs={12} md={8}>
						<Card className="flashcard-container" style={{ backgroundColor: 'transparent', border: '2px solid rgb(var(--foreground-rgb))' }}>
							<TableContainer className="table-container">
								<Table aria-label="flashcard decks">
									<TableHead>
										<TableRow>
											<TableCell className="table-head-cell">
												<Typography variant="h5">
													Id
												</Typography>
											</TableCell>
											<TableCell className="table-head-cell">
												<Typography variant="h5">
													Flashcard Name
												</Typography>
											</TableCell>
											<TableCell className="table-head-cell">
												<Typography variant="h5">
													Created On
												</Typography>
											</TableCell>
											<TableCell className="table-head-cell">
												<Typography variant="h5">
													Last Update
												</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{/* Empty table body for now */}
									</TableBody>
								</Table>
							</TableContainer>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}