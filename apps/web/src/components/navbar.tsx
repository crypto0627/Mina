'use client'
import { useState, useEffect } from 'react'
import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import Link from 'next/link'
import { Eye, EyeOff, Menu, X } from 'lucide-react'

export function Navbar() {
  const LinkItem = [
    { name: 'Training', link: '/training' },
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Profile', link: '/profile' }
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginClick, setIsLoginClick] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleLogin = () => setIsLoginClick(!isLoginClick)

  useEffect(() => {
    // 檢查是否已登入
    const token = localStorage.getItem('accessToken')
    const email = localStorage.getItem('userEmail')
    if (token) {
      setIsLoggedIn(true)
      if (email) {
        setUserEmail(email)
      }
    }
  }, [])

  const handleSignOut = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      if (response.ok) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userEmail')
        document.cookie =
          'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
        setIsLoggedIn(false)
        setUserEmail('')
      }
    } catch (error) {
      console.error('登出失敗:', error)
    }
  }

  return (
    <header>
      <nav className="flex items-center justify-between p-4 bg-black">
        <Link href="/" className="md:pl-10 text-xl font-bold">
          Mina AI
        </Link>
        <div className="hidden md:flex items-center space-x-5">
          {isLoggedIn ? (
            <>
              {LinkItem.map((item, index) => (
                <div key={index}>
                  <Link
                    href={item.link}
                    className="text-gray-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <p className="text-xl font-bold text-white">
              Please Login/SignUp to use AIchat bot
            </p>
          )}

          {isLoggedIn ? (
            <>
              <Button
                className="text-purple-300 font-bold"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(userEmail)
                  alert('Email is copied!')
                }}
              >
                {userEmail}
              </Button>
              <Button
                className="text-purple-300 font-bold hover:scale-125 transition-transform duration-500"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              className="text-purple-300 font-bold hover:scale-125 transition-transform duration-500"
              onClick={toggleLogin}
            >
              Login/SignUp
            </Button>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden z-50">
          {isMenuOpen ? (
            <X
              className="h-6 w-6 hover:rotate-90 duration-300"
              onClick={toggleMenu}
              aria-label="Close Menu"
            />
          ) : (
            <Menu
              className="h-6 w-6"
              onClick={toggleMenu}
              aria-label="Open Menu"
            />
          )}
          {isMenuOpen && (
            <nav className="absolute top-14 left-0 right-0 flex flex-col items-start px-10 space-y-6 w-full py-8 bg-black opacity-75">
              {isLoggedIn ? (
                <>
                  {LinkItem.map((item, index) => (
                    <div key={index}>
                      <Link
                        href={item.link}
                        className="text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-xl font-bold text-white">
                  Please Login/SignUp to use AIchat bot
                </p>
              )}
              <hr className="my-8 w-full border-2 bg-white rounded-lg" />
              {isLoggedIn ? (
                <>
                  <Button
                    className="text-purple-300 font-bold"
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(userEmail)
                      alert('Email is copied!')
                    }}
                  >
                    {userEmail}
                  </Button>
                  <Button
                    className="text-purple-300 font-bold hover:scale-125 transition-transform duration-500"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  className="text-purple-300 font-bold hover:scale-125 transition-transform duration-500"
                  onClick={toggleLogin}
                >
                  Login/SignUp
                </Button>
              )}
            </nav>
          )}
        </div>

        {/* LoginWindows */}
        {isLoginClick && (
          <LoginWindows
            toggleLogin={toggleLogin}
            setIsLoggedIn={setIsLoggedIn}
            setUserEmail={setUserEmail}
          />
        )}
      </nav>
    </header>
  )
}

function LoginWindows({
  toggleLogin,
  setIsLoggedIn,
  setUserEmail
}: {
  toggleLogin: () => void
  setIsLoggedIn: (value: boolean) => void
  setUserEmail: (value: string) => void
}) {
  const [isSignUp, setIsSignUp] = useState(false)
  const toggleSignUp = () => setIsSignUp(!isSignUp)

  return (
    <div className="fixed inset-0 flex items-center justify-center round-2xl z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={toggleLogin}
        role="presentation"
      />
      <section className="bg-slate-800 p-8 rounded-lg shadow-lg w-96 relative">
        <X
          className="h-6 w-6 absolute top-2 right-2 text-gray-400 hover:rotate-90 duration-300"
          onClick={toggleLogin}
          aria-label="Close Dialog"
        />
        {isSignUp ? (
          <SignUp toggleSignUp={toggleSignUp} />
        ) : (
          <Login
            toggleSignUp={toggleSignUp}
            toggleLogin={toggleLogin}
            setIsLoggedIn={setIsLoggedIn}
            setUserEmail={setUserEmail}
          />
        )}
      </section>
    </div>
  )
}

function Login({
  toggleSignUp,
  toggleLogin,
  setIsLoggedIn,
  setUserEmail
}: {
  toggleSignUp: () => void
  toggleLogin: () => void
  setIsLoggedIn: (value: boolean) => void
  setUserEmail: (value: string) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        credentials: 'include', // 允許跨域請求攜帶 cookie
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await response.json()

      // 儲存 Access Token 到 localStorage
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('userEmail', email)

      setIsLoggedIn(true)
      setUserEmail(email)
      toggleLogin()
      console.log('登入成功:', data)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <header className="flex justify-center mb-4">
        <h2 className="text-2xl font-bold text-white">Login</h2>
      </header>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        type="email"
        placeholder="Email"
        className="bg-gray-700 text-white placeholder-gray-400 p-2 rounded-xl"
        aria-label="Email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          className="bg-gray-700 text-white placeholder-gray-400 p-2 rounded-xl"
          aria-label="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide Password' : 'Show Password'}
        >
          {showPassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="bg-purple-600 hover:bg-purple-700 rounded-xl px-8 py-3">
        <Button
          type="submit"
          className="text-white text-lg font-semibold w-full"
        >
          Login
        </Button>
      </div>
      <footer className="flex justify-center items-center space-x-2 text-sm text-gray-400">
        <span>Don&apos;t have an account?</span>
        <Button
          type="button"
          variant="link"
          className="text-purple-400 hover:text-purple-300"
          onClick={toggleSignUp}
        >
          Sign Up
        </Button>
      </footer>
    </form>
  )
}

function SignUp({ toggleSignUp }: { toggleSignUp: () => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Sign Up failed')
      }

      const data = await response.json()
      setSuccess('Sign Up successful! You can now log in.')
      console.log('Sign Up successful:', data)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
      <header className="flex justify-center mb-4">
        <h2 className="text-2xl font-bold text-white">Sign Up</h2>
      </header>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-700 text-white placeholder-gray-400 p-2 rounded-xl"
        aria-label="Email"
        name="email"
      />

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 p-2 rounded-xl"
          aria-label="Password"
          name="password"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide Password' : 'Show Password'}
        >
          {showPassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Password Confirm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 p-2 rounded-xl"
          aria-label="Confirm Password"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          aria-label={
            showConfirmPassword
              ? 'Hide Confirm Password'
              : 'Show Confirm Password'
          }
        >
          {showConfirmPassword ? (
            <Eye className="h-5 w-5" />
          ) : (
            <EyeOff className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className="bg-purple-600 hover:bg-purple-700 rounded-xl px-8 py-3">
        <Button
          type="submit"
          className="text-white text-lg font-semibold w-full"
        >
          Sign Up
        </Button>
      </div>

      <footer className="flex justify-center items-center space-x-2 text-sm text-gray-400">
        <span>Have an account?</span>
        <Button
          type="button"
          variant="link"
          className="text-purple-400 hover:text-purple-300"
          onClick={toggleSignUp}
        >
          Login
        </Button>
      </footer>
    </form>
  )
}
