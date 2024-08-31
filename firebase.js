import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from 'firebase/auth';
import { clientConfig } from './config';

const app = initializeApp(clientConfig);
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();

export { app, analytics, auth, googleAuth };