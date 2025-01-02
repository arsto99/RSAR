import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

export default function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col">
        <h1 className="text-4xl font-bold mb-12 text-white">Login Page</h1>
        
        <div className="login-container p-8 flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
          <h2 className="text-3xl font-bold mb-8 text-white">Sign in</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="USERNAME"
                className="auth-input w-full px-4 py-2 text-white placeholder-gray-500"
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                className="auth-input w-full px-4 py-2 text-white placeholder-gray-500"
              />
            </div>
            
            <button
              type="submit"
              className="sign-in-button w-full py-2 px-4 rounded-full text-white font-semibold"
            >
              SIGN IN
            </button>
            
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => signIn('google')}
                className="social-button p-2 rounded-full bg-white"
              >
                <FaGoogle className="w-6 h-6 text-red-500" />
              </button>
              
              <button
                onClick={() => signIn('facebook')}
                className="social-button p-2 rounded-full bg-white"
              >
                <FaFacebook className="w-6 h-6 text-blue-600" />
              </button>
            </div>
            
            <div className="flex justify-between text-sm text-gray-400 mt-6">
              <Link href="/auth/register" className="hover:text-white">
                Create new account
              </Link>
              <Link href="/auth/forgot-password" className="hover:text-white">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right side - Welcome section */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-400 p-8 flex flex-col justify-center items-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Welcome to the site</h2>
          <div className="mt-8">
            <Image
              src="/rasar-logo.png"
              alt="Rasar Logo"
              width={200}
              height={80}
              className="mx-auto"
            />
          </div>
        </div>
        <div className="absolute top-4 right-4 text-white writing-vertical">
          BEAUTIFUL WATER
        </div>
      </div>
    </div>
  )
}
