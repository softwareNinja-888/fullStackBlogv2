import { Mail,User,EyeOff,Eye } from 'lucide-react'
import {  useEffect, useState } from "react";

import { useNavigate } from '@tanstack/react-router';
// import { SuccessToast } from '@src/components/helper/SuccessToast'



function Input({title,type='text',placeholder='John Doe',width='w-90',field,setField,section='',styles='',IconRender}){
    return (
      <>
         <div className="">
            <label htmlFor={section} className="mb-[10px] block text-base font-mont text-black">{title}</label>
            <div className="relative flex flex-row"> 
                <div className="">{IconRender()}</div>
                <input type={type} placeholder={placeholder} id={section} value={field} onChange={(e) => setField(e.target.value)} className={`${width} rounded-md border border-black py-[10px] pr-3 pl-12 focus:border-none focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:cursor-default disabled:bg-gray-2 font-extralight text-black`}/>
            </div>
        </div>
      </>
    )
}
function PasswordIcon({showPassword,setShowPassword,togglePassword}){

 
  return (
    <>
         {showPassword ? (
            <Eye className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer text-black/70" onClick={()=>{togglePassword()}} />
         ):(
            <EyeOff className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer text-black/70" onClick={()=>{togglePassword()}} />
         )}
    </>
  )
}

 
export function SignUp(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()

    // Handle form submission

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (error){
        //     setMessage(error.message)
        // } else{
        //     setMessage('Signup successfully. Check your email.')
        // }

        // setIsSubmitted(true)
        // setName('')
        // setEmail('')
        // setPassword('')
        // setPasswordConfirm('')

        // setTimeout(()=>{
        //     console.log('wait')
        //     setIsSubmitted(false)
        // },4000)
    };

    // Toggle password visibility
    function togglePassword() {
        setShowPassword(!showPassword);
    }

    
    return (
        <>
             <form action="" onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 ">
                {isSubmitted ? (
                    alert("SUCESS!!!!")
                    // <SuccessToast message={message}/>
                ): null}
                <Input title='Name' type='text' placeholder='John Doe' width='w-90' field={name} setField={setName} section='nameSignUp' styles='' IconRender={() => <User className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer text-black/70"/>} />
                <Input title='Email' type='email' placeholder='email@gmail.com' width='w-90' field={email} setField={setEmail} section='emailSignUp' styles='' IconRender={() => <Mail className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer text-black/70"/>} />
                <Input title='Create Password' type={showPassword ? 'text' : 'password'} placeholder='Password' width='w-90' field={password} setField={setPassword} section='passwordSignUp' styles='' IconRender={() => <PasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} togglePassword={togglePassword} />} />
                <Input title='Confirm Password' type={showPassword ? 'text' : 'password'} placeholder='Confirm password' width='w-90' field={passwordConfirm} setField={setPasswordConfirm} section='passwordConfirmSignUp' styles='' IconRender={() => <PasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} togglePassword={togglePassword} />} />

                <button aria-label="Submit Form" id="submit_form_SignUp" type="submit" className="w-90 mt-3 border border-black text-black text-lg font-poppins py-2 cursor-pointer gap-2 transition duration-500 hover:scale-103 hover:bg-purple-500 hover:text-white" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <div className="flex justify-center items-center gap-3">
                                <svg className="animate-spin h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-100" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                                </svg>
                                Submitting...
                            </div>
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </form>
        </>
    )
}