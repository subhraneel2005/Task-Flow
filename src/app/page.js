import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="select-none min-h-screen w-full p-3 flex justify-center items-center">
      
      <div className="block space-y-5">
      <h1 className="text-center mb-7 text-4xl md:text-[6vw]">Task Flow 🎯</h1>
      <p className="text-center text-xl mb-8 text-gray-500">Be more productive by using our go to solution of managing your day to day tasks as well as your large projects</p>
      <div className="flex justify-center items-center mt-5">
      <Link href={"/auth"}><Button variant="outline">Get started</Button></Link>
      </div>
      </div>
    </main>
  );
}
