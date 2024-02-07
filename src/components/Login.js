import { useState, useRef } from 'react';
import Header from "./Header";
import { checkValidData } from '../utils/validate';
import { auth } from "../utils/firebase";
import { USER_AVATAR } from "../utils/constants";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { addUser } from "../utils/userSlice";
import { useDispatch } from 'react-redux';
import { BG_URL } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const navigate = useNavigate();

    const getUser = {
        name: 'Test',
        email: 'test1234@gmail.com',
        password: 'test@1234'
    }

    const guestUserHandler = (event) => {
      event.preventDefault();
      if (nameRef.current && emailRef.current && passwordRef.current) {
          nameRef.current.value = getUser.name;
          emailRef.current.value = getUser.email;
          passwordRef.current.value = getUser.password;
      } else {
          console.error("One or more refs are not initialized.");
      }
    }
  

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        // Validate the form data

        const message = checkValidData(emailRef.current.value, passwordRef.current.value);
        setErrorMessage(message);
        if (message) {
            return;
        }

        if (!isSignInForm) {
            // Sign Up Logic
            createUserWithEmailAndPassword(
                auth,
                emailRef.current.value,
                passwordRef.current.value
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: nameRef.current.value,
                        photoURL: USER_AVATAR,
                    })
                        .then(() => {
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                    photoURL: photoURL,
                                })
                            );
                            navigate('/browse');
                        })
                        .catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate('/browse');
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
                    className="h-screen w-screen object-cover"
                    src={BG_URL}
                    alt="BG-IMG"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute left-0 right-0 mt-[70px] w-[70%] md:w-[70%] xl:w-[25%] p-4 md:p-8 mx-auto text-white bg-black rounded-lg my-36 bg-opacity-888 "
            >
                <h1 className="py-4 text-3xl font-bold">
                    {isSignInForm ? 'Sign In' : 'Sign Up'}
                </h1>
                {!isSignInForm && (
                    <input
                       ref={nameRef}
                        type="text"
                        placeholder="Full Name"
                        className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2  border-transparent  focus:border-b-2 focus:outline-0"
                        value={getUser.name}
                    />
                )}
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email Address"
                    className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2  border-transparent focus:border-b-2  focus:outline-0"
                    value={getUser.email}
                />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    className="p-4 rounded-md my-2 w-full bg-[#333333] border-b-2 border-transparent  focus:border-b-2  focus:outline-0"
                    value={getUser.password}
                />
                <p className="text-[#e50914]">{errorMessage}</p>
                <button className='p-4 my-6 rounded-md bg-[#e50914] hover:bg-[#d6180b] w-full font-medium'
                    onClick={guestUserHandler}
                >
                    Add Guest Credentials
                </button>
                <button
                    className="p-4 my-6 rounded-md bg-[#e50914] hover:bg-[#d6180b] w-full font-medium"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? 'Sign In' : 'Sign Up'}
                </button>
                <p
                    className="my-4 cursor-pointer opacity-100  hover:opacity-100 hover:underline"
                    onClick={toggleSignInForm}
                >
                    {isSignInForm
                        ? 'New to Netflix? Sign Up Now'
                        : 'Already registered? Sign In Now'}
                </p>
            </form>
        </div>
    )
}

export default Login;
