import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { clientConfig } from './config';

const app = initializeApp(clientConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };