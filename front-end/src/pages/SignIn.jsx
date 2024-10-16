import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SignIn() {

    const navigate = useNavigate();

    // Check If User Is Logged In //
    if (localStorage.getItem("userId") !== null) {
        localStorage.removeItem("userId"); // LogIn
    };
    //== Check If User Is Logged In ==//

    const [user, setUser] = React.useState({ email: '', password: '' });
    const [validity, setValidity] = React.useState({ email: true, password: true });

    const addUser = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });

        if (name === 'email') {
            setValidity({ ...validity, email: /\@(Tuwaiq|tuwaiq)\.com$/.test(value) });
        }
        
        if (name === 'password') {
            setValidity({ ...validity, password: value.length >= 6 });
        }
    };

    const Sign_in = () => {
        const isEmailValid = /\@(Tuwaiq|tuwaiq)\.com$/.test(user.email);
        const isPasswordValid = user.password.length >= 6;

        if (!isEmailValid || !isPasswordValid) {
            Swal.fire({
                icon: 'warning',
                title: 'تحذير',
                text: 'يرجى إدخال البريد الإلكتروني وكلمة المرور بشكل صحيح',
            });
            return;
        }

        axios.post('http://localhost:4000/api/users/login', {
            email: user.email,
            password: user.password,
        })
        .then((response) => {
            const result = response.data; // Directly use the response data
            console.log('result', response)
            if (result) {
                localStorage.setItem('userId', result.id);
                localStorage.setItem('username', result.name); // Assuming 'id' is returned
                localStorage.setItem('isLoggIn', true);
                Swal.fire({
                    icon: 'success',
                    title: 'تم تسجيل الدخول بنجاح!',
                    showConfirmButton: false,
                    timer: 1500
                });
                if (result.usertype === "user") {
                    navigate('/user-home');
                } else {
                    navigate('/home');
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
            });
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 bg-gray-900">
            <div className="sm:w-full sm:max-w-md w-full bg-gray-800 py-8 px-6 shadow sm:rounded-xl">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-white">
                    تسجيل الدخول
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-gray-400 max-w">
                    ليس لديك حساب مسبق؟ <Link to="/" className="font-medium text-[#8f37ff] hover:text-[#6e27c1]">
                        أنشئ حساب جديد الآن
                    </Link>
                </p>

                <div className="mt-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">البريد الألكتروني</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="email" name="email" placeholder="user@Tuwaiq.com"
                               type="email" value={user.email} onChange={addUser}
                               className={`block w-full px-3 py-2 border ${validity.email ? 'border-gray-600' : 'border-red-600'} bg-[#161328] text-white rounded-xl`} />
                    </div>
                    {!validity.email && <small className="text-red-600">يرجى إدخال بريد إلكتروني صالح </small>}
                </div>

                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">كلمة المرور</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="password" name="password" type="password" value={user.password}
                               placeholder='ادخل كلمة المرور'
                               onChange={addUser}
                               className={`block w-full px-3 py-2 border ${validity.password ? 'border-gray-600' : 'border-red-600'} bg-[#161328] text-white rounded-xl`} />
                    </div>
                    {!validity.password && <small className="text-red-600">يجب أن تتكون كلمة المرور من ٦ أحرف على الأقل</small>}
                </div>

                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button onClick={Sign_in} 
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-[#8f37ff] hover:bg-[#7321cc] transition duration-300 ease-in-out transform hover:scale-105">
                            تسجيل الدخول
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
