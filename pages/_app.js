import '../styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserService } from '../services/UserService';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [authorize, setAuthorize] = useState(false);

  useEffect(() => {
    checkUser();

    const hideContent = () => setAuthorize(false);

    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', checkUser);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', checkUser);
    }

  }, [])

  //function to check if user is logged in
  const checkUser = () => {
    if (router.pathname === '/') {
      if (UserService.userValue) {
        setAuthorize(true)
        router.push('/home')
      } else {
        setAuthorize(false)
      }
    }
  }

  return <Component {...pageProps} />
}

export default MyApp
