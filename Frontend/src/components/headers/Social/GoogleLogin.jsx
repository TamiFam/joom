import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
    const { googleLogin } = useAuth();
    
    const navigate = useNavigate();
    

    const handleLogin = () => {
        googleLogin()
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
               

                const userImp = {
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    role: 'user',
                    gender: 'Is not specified',
                    address: 'Is not specified',
                    phone: 'Is not specified',
                };

                if (user.email && user.displayName) {
                    const token = localStorage.getItem('token');
axios.post('http://localhost:3000/new-user', userImp, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then((response) => {
    console.log('Response:', response);
    navigate('/');
    return 'Registration Successful!';
})
.catch((err) => {
    console.error('Error creating user:', err);
});
                } else {
                    console.error('User email or displayName is missing');
                }
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Login error:', errorMessage,errorCode);
            });
    };
  return (
    <div className=" flex item-center justify-center my-3">
    <button onClick={() => handleLogin()} className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-md px-6 py-4 
    text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outlie-none">
         <FcGoogle className=" h-6 w-6 mr-2" />
        <span >Continue with Google</span>
       
    </button>
    </div>
  )
}

export default GoogleLogin