'use client'

import Link from 'next/link'
import { useAuth } from '@/components/Auth/AuthProvider'

export function Header() {
  const { user, profile, loading, signOut } = useAuth()

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white">
          Sputink
        </Link>

        <nav className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/logbook"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Mi Logbook
                  </Link>
                  {profile?.is_admin && (
                    <Link
                      href="/admin"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <span className="text-gray-400">
                    {profile?.username || user.email}
                  </span>
                  <button
                    onClick={signOut}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Entrar
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
