import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { BehaviorSubject } from 'rxjs';

export default function Home() {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  

  //sign in function with fetch to /api/auth/login with email and password
  const signIn = async () => {

    const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
      
    })
    const data = await response.json();

    if (data.error) {
      setError(data.error);
    }else{
      localStorage.setItem('user', JSON.stringify(data.message));
      userSubject.next(data.message);
      setError(null);
    }
    
  };

  return (
    <div className="bg-slate-600">
      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     {/* create login page and form */}
     <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
          <div className="flex flex-col items-center justify-center">
            {/* <Image
              src="/images/logo.png"
              alt="logo"
              width={200}
              height={200}
              className="rounded-full"
            /> */}

            <h1 className="text-2xl font-bold text-center mb-10">
              Sign In
            </h1>

              <form className="w-full">
                {/* email input with label and full width input */}
                {/* alert if have error */}
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="md:flex flex-col md:items-center mb-6">
                  <div className="md:w-full">
                    <label
                      className="block text-gray-500 font-bold mb-1 md:mb-1 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Email
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="email"
                      placeholder="Enter your email"
                      value={email }
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:flex flex-col md:items-center mb-6">
                  <div className="md:w-full">
                    <label
                      className="block text-gray-500 font-bold mb-1 md:mb-1 pr-4"
                      htmlFor="inline-full-name"
                    >
                      Password
                    </label>
                  </div>
                  <div className="md:w-full">
                    <input
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                      id="inline-full-name"
                      type="password"
                      placeholder="Enter your password"
                      value={password }
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                  {/* create sign in button and sign up button */}
                  <div className="flex gap-2 mt-4">
                    <button
                      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => {
                        signIn();
                      } }
                    >
                      Sign In
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Sign Up
                    </button>
                    </div>
                </div>
              </form>
           </div>
          </div>
        </div>
    </div>

    )
}
