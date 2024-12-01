import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              We are committed to providing users with the best Web3 service
              experience and building a secure and reliable blockchain
              ecosystem.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-purple-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  className="text-gray-400 hover:text-purple-400"
                >
                  Training
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-purple-400"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-purple-400"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://x.com/LaiHongKuo"
                  className="text-gray-400 hover:text-purple-400"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://discordapp.com/users/573831241162293249"
                  className="text-gray-400 hover:text-purple-400"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://t.me/JakeKuo"
                  className="text-gray-400 hover:text-purple-400"
                >
                  Telegram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.jakekuo.com/"
                  className="text-gray-400 hover:text-purple-400"
                >
                  Personal website
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Mina AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
