import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO } from '../utils/constants';
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";



const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          navigate("/error");
        });
    };

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
          } else {
            dispatch(removeUser());
            navigate('/');
          }
        });
  }, []);

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
        <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
          {user && <div className="flex p-2 justify-between">
            <img
              className="hidden md:block w-12 h-12"
              alt="usericon"
              src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
            />
            <button onClick={handleSignOut} className="font-bold text-white ">
              (Sign Out)
            </button>
          </div>
          }
        </div>
    )
}

export default Header;