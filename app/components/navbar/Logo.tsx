"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="flex justify-end" onClick={() => router.push("/")}>
      <Image
        alt="Logo"
        className="cursor-pointer"
        height="40"
        width="40"
        src="/images/logo1.png"
      ></Image>
      <div className="text-[#FF1829] cursor-pointer font-extrabold text-2xl mb-0 mt-auto mb-1.5">
        ootcamp
      </div>
    </div>
  );
};

export default Logo;
