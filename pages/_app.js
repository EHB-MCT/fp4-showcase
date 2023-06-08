import Navigation from '../components/Navigation';
import '../styles/globals.css';
import { useUserData } from '../lib/hooks';
import { UserContext } from '../lib/context';

function MyApp({ Component, pageProps }) {
    const userData = useUserData()
    return (
        
        <UserContext.Provider value={userData} >
            <Navigation />
            <Component {...pageProps} />
        </UserContext.Provider>
    );
}

export default MyApp;
