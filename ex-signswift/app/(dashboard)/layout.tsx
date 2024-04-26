import Navbar from "@/components/(dashboard)/User/Navbar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
// import { redirect } from "next/dist/server/api-utils";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

 
  if (!session?.user) {
    console.log(session);
    // redirect(`/login`);
    redirect('/login')
  }else{
    console.log(session?.user, "user archit")
  return (
    <div className=" ">
      <nav>
        <Navbar user={session?.user} />
      </nav>
      {children}
    </div>
  );
}
}
