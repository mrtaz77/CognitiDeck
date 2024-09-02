"use client";

import { useRouter } from "next/navigation";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

export default function Pricing() {
	const router = useRouter();

	return (
		<>
			<AppBar position="static" className="navbar">
				<Toolbar>
					<Typography variant="h4" className="title">
						<b>CognitiDeck</b>
					</Typography>
					<Button
						className="button-navItem"
						onClick={() => router.push(`/`)}
					>
						Dashboard
					</Button>
				</Toolbar>
			</AppBar>

			<Container maxWidth="md" className="container-homepage">
				<Typography variant="h4" className="heading-homepage">
					Pricing
				</Typography>
			</Container>
		</>
	);
}