"use client";
import { Payment, columns } from "@/components/(dashboard)/User/Columns";
import { DocumentTable } from "@/components/(dashboard)/User/DocumentTable";
import Cookies from "js-cookie";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadContainer from "../../../../components/(dashboard)/User/UploadContainer";
import H2 from "@/components/Typography/H2";

import TableMenu from "@/components/TableMenu";
import { useSession } from "next-auth/react";
import { ALL_DOCS } from "./signdoc/docstatus";
import { getSession } from "next-auth/react";

export default function Dashboard({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [docstatus, setdocStatus] = useState<string>(ALL_DOCS);

  const [user, setUser] = React.useState<any>(null);
  const session = useSession();

  React.useEffect(() => {
    if (!session?.data?.user) {
      router.push("/login");
    } else {
      setUser(session.data.user);
      const cookieData = JSON.stringify(session);
      Cookies.set("session", cookieData, { expires: 1 / 3 });
    }
  }, [session]);

  React.useEffect(() => {
    const cookieData = Cookies.get("session");
    if (cookieData) {
      const jsonData = JSON.parse(cookieData);
      console.log(jsonData, "jssson data");
      setUser(jsonData.data.user);
    }
  }, []); // Run only once on component mount

  // React.useEffect(() => {
  //   const session = getSession();
  //   if (!session?.user) {
  //     console.log(session);
  //     redirect(`/login`);
  //   } else {
  //     console.log(session?.user, "user archit");
  //   }
  // }, []);

  return (
    <main className=" container flex flex-col gap-4  items-center px-16">
      {/* User Dashboard with ID here the user should be directed to after login
      here will be the upload and table function */}

      <div className="w-full   mt-8">
        <UploadContainer id={params.id} />
      </div>
      <div className="mt-10 w-full flex items-center">
        <div className="w-full">
          <H2>Documents</H2>
        </div>
        <div className="w-full justify-end items-center flex">
          <TableMenu status={docstatus} setdocStatus={setdocStatus} />
        </div>
      </div>
      <div className="w-full">
        <DocumentTable id={params.id} email={user?.email} status={docstatus} />
      </div>
      {/* <p>navbar upload table</p> */}
    </main>
  );
}
