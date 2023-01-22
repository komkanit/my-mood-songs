import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="px-2">
            <Link href="/">
                <Image width={86} height={48} src="/images/logo.png" alt="logo moodtify" />
            </Link>
        </div>
    )
}
