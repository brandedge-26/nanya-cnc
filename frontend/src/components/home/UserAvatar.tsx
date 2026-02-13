import { useAuthStore } from '@/store/authStore';
import { User } from '@/store/userStore';
import Image from 'next/image';
import Link from 'next/link';


interface UserAvatarProps {
    user: User
}


const UserAvatar = ({ user }: UserAvatarProps) => {


    // auth state from auth store
    const { logout } = useAuthStore();


    // extract name first letters
    const getInitialName = (name: string) => {
        if (!name) return "";

        const words = name.trim().split(" ");

        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        } else {
            return name.substring(0, 2).toUpperCase();
        }
    };


    return (<>

        <div className="relative group flex items-center">

            {/* User Profile */}
            <button className="flex items-center gap-2 cursor-pointer focus:outline-none">
                <div className="h-8.5 w-8.5 rounded-full overflow-hidden bg-gray-800">

                    {user?.avatar ? (
                        <Image
                            src={user?.avatar || "/default-avatar.png"}
                            alt={user?.name}
                            className="h-full w-full object-cover"
                            width={40}
                            height={40}
                        />
                    ) : (
                        <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-black/10 font-medium text-white border border-black/20">
                            {getInitialName(user?.name)}
                        </div>
                    )}

                </div>
            </button>


            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-64 mt-6 glass rounded-2xl shadow-xl p-6 bg-black border-2 border-gray-900 z-50">

                <div className="flex flex-col gap-4">

                    {/* User Info Section */}
                    <div className="border-b border-gray-800 pb-3">
                        <p className="font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                    </div>

                    {/* Navigation Links */}
                    <ul className="space-y-3">
                        <li>
                            {user?.role === "user" ?
                                (<Link href="/dealer-request" className="text-sm text-gray-300 hover:text-orange-500 transition block">
                                    Dealer Portal
                                </Link>) :
                                (<Link href="/dashboard" className="text-sm text-gray-300 hover:text-orange-500 transition block">
                                    Dashboard
                                </Link>)}
                        </li>
                        <li>
                            {user?.role === "user" && <Link href="/get-quote" className="text-sm text-gray-300 hover:text-orange-500 transition block">
                                Get Quote
                            </Link>}
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="text-sm text-red-400 hover:text-red-500 transition block w-full text-left cursor-pointer"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>

                </div>
            </div>
        </div>

    </>)
}

export default UserAvatar;