import { Link, Head } from '@inertiajs/inertia-react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { router as inertiaRouter } from '@inertiajs/react';

export default function Welcome(props) {

    const [isLoginVisible, setIsLoginVisible] = useState(true);

    function handleClick() {
        alert("click")
        setIsLoginVisible(!isLoginVisible);
    }
    
    return (
        <>
            <Head title="Bug Tracker" />
            <div className='flex justify-center items-center w-screen h-screen background-image-container'>
                {isLoginVisible ?<LoginForm onClick={handleClick}/> : <SignupForm  onClick={handleClick}/>}
            </div>

        </>
    );
}

function LoginForm({onClick}) {
    const [values, setValues] = useState({
        email: "",
        password:""
    })
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues({
            ...values,
            [key]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        inertiaRouter.get(route("dashboard"));
    }
    
    return (
        <form onSubmit={handleSubmit} className='w-4/5 md:w-1/3 lg:w-1/4 flex flex-col p-5 bg-slate-50 rounded'>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='email' className='text-sm'>Email</label>
                        <TextInput id="email" className="w-full" type="email" required="required" handleChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='password' className='text-sm'>Password</label>
                        <TextInput id= "password" className="w-full" type="password" required="required" handleChange={handleChange} />
                    </div>
                    <PrimaryButton className='flex justify-center mb-1' children="Login"/>
                    <small className='text-slate-500 cursor-pointer' onClick={onClick}>Signup</small>
                </form>
    )
}


function SignupForm({onClick}) {
    const [values, setValues] = useState({
        email: "",
        password:""
    })
    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues({
            ...values,
            [key]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        inertiaRouter.get(route("dashboard"));
    }
    
    return (
        <form onSubmit={handleSubmit} className='w-4/5 md:w-1/3 lg:w-1/4 flex flex-col p-5 bg-slate-50 rounded'>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='first-name' className='text-sm'>First Name</label>
                        <TextInput id="first-name" className="w-full" type="text" required="required" handleChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='last-name' className='text-sm'>Last Name</label>
                        <TextInput id="last-name" className="w-full" type="text" required="required" handleChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='email' className='text-sm'>Email</label>
                        <TextInput id="email" className="w-full" type="email" required="required" handleChange={handleChange}/>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor='password' className='text-sm'>Password</label>
                        <TextInput id= "password" className="w-full" type="password" required="required" handleChange={handleChange} />
                    </div>
                    <PrimaryButton className='flex justify-center mb-1' children="Login"/>
                    <small className='text-slate-500 cursor-pointer' onClick={onClick}>login</small>
                </form>
    )
}
