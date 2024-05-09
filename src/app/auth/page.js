"use client"

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"


export default function AuthPage(){

    const provider = new GoogleAuthProvider();
    const router = useRouter();
    
    const googleAuthHandler = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
  
          router.push("/adminPage")
          
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }

    return(
        <main className="min-h-screen w-full p-3 flex justify-center items-center">
            <Button onClick={googleAuthHandler} variant="outline">Authenticate with google</Button>
        </main>
    )
}