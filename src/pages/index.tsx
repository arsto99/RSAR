import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) {
    router.push('/auth/signin')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h1 className="text-2xl font-bold mb-4">مرحباً {session.user?.name}</h1>
            <div className="space-y-4">
              <p>البريد الإلكتروني: {session.user?.email}</p>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
