"use client";

import Image from "next/image";

const Footer = () => {
  return (
    <div className="ps-28 pe-20 py-8 bg-black text-white text-sm">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-14 items-center place-items-center">
        <div className="col-spans-1 cursor-pointer ">
          <ul>
            <li className="hover:text-blue-500 hover:underline mb-1">About</li>
            <li className="hover:text-blue-500 hover:underline mb-1">
              Community Guideline
            </li>
            <li className="hover:text-blue-500 hover:underline mb-1">
              Help Center
            </li>
            <li className="hover:text-blue-500 hover:underline mb-1">
              Privacy & Term
            </li>
          </ul>
        </div>
        <div className="col-spans-1 cursor-pointer">
          <ul>
            <li className="hover:text-blue-500 hover:underline mb-1">
              Careers
            </li>
            <li className="hover:text-blue-500 hover:underline mb-1">
              Contact Informations
            </li>
            <li className="hover:text-blue-500 hover:underline mb-1">FAQs</li>
            <li className="hover:text-blue-500 hover:underline mb-1">
              Advertising
            </li>
          </ul>
        </div>
        <div className="col-spans-1 cursor-pointer">
          <div>Follow Us</div>
          <div className="flex flex-row gap-3 mt-2">
            <a href="https://www.facebook.com" target="_blank">
              <Image
                alt="facebook"
                height={25}
                width={25}
                src={"/facebook.png"}
              />
            </a>
            <a href="https://www.instagram.com" target="_blank">
              <Image
                alt="instagram"
                height={25}
                width={25}
                src={"/instagram.png"}
              />
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <Image
                alt="twitter logo"
                height={25}
                width={25}
                src={"/twitter.png"}
              />
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <Image
                alt="youtube logo"
                height={25}
                width={25}
                src={"/youtube.png"}
              />
            </a>
          </div>
        </div>
      </div>
      <div className=" grid pt-8 place-items-center">
        Bootcamp © 2024. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
