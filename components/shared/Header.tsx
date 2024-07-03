import Link from "next/link"
import Image from "next/image";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {Button} from "@/components/ui/button";
import NavItems from "@/components/shared/NavItems";
import MobileNav from "@/components/shared/MobileNav";
const Header = () =>{
    return (
        <header className="w-full border-b">
            <div className="wrapper flex items-center justify-between">
                <Link href="/">
                    <Image src="/assets/images/logo.png" alt="logo" width={100} height={20}/>

                </Link>

                    <SignedIn>
                        <nav className="md:flex hidden">
                            <NavItems/>
                        </nav>
                    </SignedIn>

                <div className="flex w-32 justify-end gap-3">
                    <SignedOut>
                        <Button
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                            <SignInButton/>
                        </Button>
                    </SignedOut>

                    <SignedIn>
                        <UserButton/>
                        <MobileNav/>
                    </SignedIn>
                </div>
            </div>
        </header>
    )
}

export default Header;

