import { useState, useRef } from 'react';
import Header from "./Header";
import { checkValidData } from '../utils/validate';
import { auth } from "../utils/firebase";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true); 
    const [errorMessage, setErrorMessage] = useState(null);

    const email = useRef(null);
    const password = useRef(null);
     
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        // Vaildate the form data

        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message){
            return;
        }

        
    if (!isSignInForm) {
        // Sign Up Logic
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + "-" + errorMessage);
          });
      }else{
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
      
      }
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img 
                   src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
                   alt = 'logo' 
                />
            </div>
            <form 
                onSubmit={(e) => e.preventDefault()} 
                className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white">
                <h1 className="font-bold text-3xl py-4">
                    {isSignInForm ? 'Sign In' : 'Sign Up'}
                </h1>
                {!isSignInForm && (<input 
                   type="text" 
                   placeholder="Full Name" 
                   className="p-4 my-4 w-full bg-gray-700"  
                />)}
                <input 
                   type="text" 
                   ref={email}
                   placeholder="Email Address" 
                   className="p-4 my-4 w-full bg-gray-700"
                />
                <input 
                   type="password" 
                   ref={password}
                   placeholder="Password" 
                   className="p-4 my-4 w-full bg-gray-700"  
                />
                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
                   {isSignInForm ? 'Sign In' : 'Sign Up'}
                </button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
                   {isSignInForm ? 'New to Netflix ? Sign Up Now' : 'Already registered ? Sign In Now.'}
                </p>
            </form>
        </div>
    )
}

export default Login;