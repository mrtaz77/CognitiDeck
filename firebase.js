import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { clientConfig } from './config';

const app = initializeApp(clientConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();

export { app, analytics, auth, googleAuth };