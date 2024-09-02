"use client";

import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function HomePage({ email }) {
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
						onClick={() => router.push(`/dashboard/pricing`)}
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

			<Container maxWidth="md" className="container-homepage">
				<Typography variant="h4" className="heading-homepage">
					Super secure home page
				</Typography>
				<Typography variant="body1" className="text-homepage">
					Only <strong>{email}</strong> holds the magic key to this kingdom!
				</Typography>
			</Container>
		</>
	);
}