import {SignUp} from "@clerk/nextjs";
import Header from "@/components/shared/Header";

export default function page(){
    return (
        <div className="flex-center min-h-screen justify-center bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center ">
            <SignUp/>
        </div>
    )
}
