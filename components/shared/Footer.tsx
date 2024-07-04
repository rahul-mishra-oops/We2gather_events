import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="border-t bg-black">
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href='/'>
                    <Image
                        src="/assets/images/logo.png"
                        alt="logo"
                        width={50}
                        height={38}
                    />
                </Link>

                <p className="text-white">2024 We2gather. All Rights reserved.</p>
                <p className="text-white">Made with ❤️ By Rahul Jyoti Mishra</p>
            </div>
        </footer>
    )
}

export default Footer