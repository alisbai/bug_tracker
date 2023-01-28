import { Link, Head, useForm } from '@inertiajs/inertia-react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';
import { router as inertiaRouter } from '@inertiajs/react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Bug Tracker" />
            <div className='flex justify-end  w-screen h-screen background-image-container'>
                <nav className='p-2 bg-slate-900 flex justify-end items-center w-full h-10'>
                {!props.auth.user ? 
                    <>
                        <Link href={route("login")} className='m-3 text-slate-50	'>Login</Link>
                        <Link href={route("register")} className='m-3 text-slate-50	'>Signup</Link>
                    </> :
                    <Link href={route("logout")} method="post" className='m-3 text-slate-50	'>Logout</Link>
                }
                </nav>
            </div>

        </>
    );
}


