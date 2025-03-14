import { NextResponse } from "next/server";
import { authMiddleware, redirectToLogin, redirectToHome } from "next-firebase-auth-edge";
import { clientConfig, serverConfig } from "./config";

const PUBLIC_PATHS = ['/login', '/register']

export async function middleware(request) {
	return authMiddleware(request, {
		loginPath: "/api/login",
		logoutPath: "/api/logout",
		apiKey: clientConfig.apiKey,
		cookieName: serverConfig.cookieName,
		cookieSignatureKeys: serverConfig.cookieSignatureKeys,
		cookieSerializeOptions: serverConfig.cookieSerializeOptions,
		serviceAccount: serverConfig.serviceAccount,
		handleValidToken: async () => {
			const { pathname } = request.nextUrl;
			if (PUBLIC_PATHS.includes(pathname)) {
				return redirectToHome(request);
			}
			const response = NextResponse.next();
			request.headers.forEach((value, key) => {
				response.headers.set(key, value);
			});
			return response;
		},
		handleInvalidToken: async (reason) => {
			console.info(reason);
			return redirectToLogin(request, {
				path: '/login',
				publicPaths: PUBLIC_PATHS
			});
		},
		handleError: async (error) => {
			console.error(error);
			return redirectToLogin(request, {
				path: '/login',
				publicPaths: PUBLIC_PATHS
			});
		}
	});
}

export const config = {
	matcher: [
		"/",
		"/((?!_next|api|.*\\.).*)",
		"/api/login",
		"/api/logout",
	],
};