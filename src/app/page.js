import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen w-full p-3 flex justify-center items-center">
      <Link href={"/auth"}><Button>Get started</Button></Link>
    </main>
  );
}
