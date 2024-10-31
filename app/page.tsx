import Image from "next/image";
import { LandingPageComponent } from "@/components/landing-page";
import { cookies } from "next/headers";

export default function Home() {
  const session = cookies().get("session")?.value;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LandingPageComponent />
    </main>
  );
}
