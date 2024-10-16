import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 

function SignUp() {
    
    const navigate = useNavigate();
    // Check If User Is Logged In //
    if (localStorage.getItem("userId") !== null) {
        localStorage.removeItem("userId"); // LogIn
    };
    //== Check If User Is Logged In ==//
    const [inputs, setInputs] = React.useState({
        name: '',
        email: '',
        password: '',
        usertype: 'user',
    });

    const [validity, setValidity] = React.useState({
        name: true,
        email: true,
        password: true,
    });

    const addInputs = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });

        const { name, value } = event.target;
        if (name === 'name') {
            setValidity({ ...validity, name: value.length >= 3 });
        } else if (name === 'email') {
            setValidity({ ...validity, email: /\@(Tuwaiq|tuwaiq)\.com$/.test(value) && value !== '' });
        } else if (name === 'password') {
            setValidity({ ...validity, password: value.length >= 6 && /[a-zA-Z]/.test(value) && /\d/.test(value) });
        }
    };

    const selectUserType = (type) => {
        setInputs({ ...inputs, usertype: type });
    };

    const Sign_up = () => {
        if (!inputs.name || !inputs.email || !inputs.password) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'يرجى ملء جميع الحقول قبل الإرسال',
            });
            return;
        }

        if (!validity.name || !validity.email || !validity.password) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'يرجى إصلاح الأخطاء في النموذج قبل الإرسال',
            });
            return;
        }

        axios.post('http://localhost:4000/api/users/register', {
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
            idea: '',
            state: '',
            usertype: inputs.usertype,
        })
        .then((response) => {
            localStorage.setItem('userId', response.data.id);
            navigate('/signin');
        })
        .catch((error) => {
            console.error('خطأ:', error);
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'حدث خطأ ما.. حاول مرة أخرى لاحقًا',
            });
        });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 bg-gray-900">
            <div className="sm:w-full sm:max-w-md w-full bg-gray-800 py-8 px-4 shadow sm:rounded-lg">
                <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-white">
                    إنشاء حساب جديد
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-gray-400 max-w">
                    لديك حساب مسبق؟ <Link to="/signin" className="font-medium text-[#8f37ff] hover:text-[#6e27c1]">
                        سجل دخولك
                    </Link>
                </p>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">الاسم:</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="name" name="name" placeholder="ادخل الاسم"
                               type="text" value={inputs.name} onChange={addInputs}
                               className={`block w-full px-3 py-2 border ${validity.name ? 'border-gray-600' : 'border-red-600'} bg-[#161328] text-white rounded-md`} />
                    </div>
                    {!validity.name && <small className="text-red-600">يجب أن يتكون الإسم من ٣ أحرف على الأقل</small>}
                </div>

                <div className="mt-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">البريد الإلكتروني:</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="email" name="email" placeholder="user@Tuwaiq.com"
                               type="email" value={inputs.email} onChange={addInputs}
                               className={`block w-full px-3 py-2 border ${validity.email ? 'border-gray-600' : 'border-red-600'} bg-[#161328] text-white rounded-md`} />
                    </div>
                    {!validity.email && <small className="text-red-600">يرجى إدخال بريد إلكتروني صالح </small>}
                </div>

                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">كلمة المرور:</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input id="password" name="password" type="password" value={inputs.password} placeholder="ادخل كلمة المرور"
                               onChange={addInputs}
                               className={`block w-full px-3 py-2 border ${validity.password ? 'border-gray-600' : 'border-red-600'} bg-[#161328] text-white rounded-md`} />
                    </div>
                    {!validity.password && <small className="text-red-600">يجب أن تتكون كلمة المرور من ٦ أحرف على الأقل</small>}
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={() => selectUserType('admin')}
                        className={`flex-1 mx-1 py-2 border border-transparent text-sm font-medium rounded-md text-white ${inputs.usertype === 'admin' ? 'bg-[#8f37ff]' : 'bg-gray-700'} hover:bg-[#7321cc] transition duration-300 ease-in-out`}
                    >
                        مشرف
                    </button>
                    <button
                        onClick={() => selectUserType('user')}
                        className={`flex-1 mx-1 py-2 border border-transparent text-sm font-medium rounded-md text-white ${inputs.usertype === 'user' ? 'bg-[#8f37ff]' : 'bg-gray-700'} hover:bg-[#7321cc] transition duration-300 ease-in-out`}
                    >
                        طالب
                    </button>
                </div>

                <div className="mt-6">
                    <span className="block w-full rounded-md shadow-sm">
                        <button onClick={Sign_up}
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#8f37ff] hover:bg-[#7321cc] transition duration-300 ease-in-out transform hover:scale-105">
                            إنشاء حساب
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
