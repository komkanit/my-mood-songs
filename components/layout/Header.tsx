import { getCookie } from "cookies-next";
import { deleteCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        const accessToken = getCookie('accessToken');
        if (accessToken) {
            setIsLogin(true);
        }
    }, [])
    const router = useRouter();
    return (
        <div className="px-2 flex justify-between">
            <Link href="/">
                <Image width={86} height={48} src="/images/logo.png" alt="logo moodtify" />
            </Link>
            {
                isLogin &&
                <button onClick={() => {
                    deleteCookie('accessToken', { path: '/', domain: window.location.hostname });
                    deleteCookie('refreshToken', { path: '/', domain: window.location.hostname });
                    router.reload();
                }}>Logout</button>
            }
        </div>
    )
}
