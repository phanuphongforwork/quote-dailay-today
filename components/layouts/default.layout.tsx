import { Icon } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";
import Link from "next/link";

type IProps = {
  children: React.ReactNode;
};
export const DefaultLayout = ({ children }: IProps) => {
  return (
    <>
      <div className="h-18 w-full bg-gray-800 flex justify-between gap-4 p-4 border-b border-gray-900">
        <div className=" flex gap-2 items-center">
          <div className="text-4xl  text-white cursor-pointer pl-1 flex ">
            <span>“ </span>
            <div>𝙌𝙪𝙤𝙩𝙚 𝘿𝙖𝙞𝙡𝙮</div>
            <span> ”</span>
          </div>
        </div>
        <Link href="https://www.instagram.com/pnp_mc">
          <Icon w={8} h={8} as={FaInstagram} color={"white"}></Icon>
        </Link>
      </div>
      <div className="w-full  flex flex-col h-screen items-center md:justify-normal pt-20  bg-gray-800 ">
        <div className=" text-white w-full md:w-2/3 text-center">
          {children}
        </div>
      </div>
    </>
  );
};
