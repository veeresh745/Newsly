import Image from "next/image";
import Link from "next/link";
import { SiTwitter, SiDiscord, SiDocusign } from "react-icons/si";
import { IoIosDocument } from "react-icons/io";
import { APP_ENV } from "../../config";

function LandingNavbar() {
  return (
    <div className="navbar px-4  mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow-xl  bg-white rounded-md border w-52 text-neutral"
          >
            <li>
              <a className="hover:text-green-400 normal-case">
                <span>
                  <IoIosDocument size={15} />
                </span>
                <p className="normal-case">Docs</p>
              </a>
            </li>
            <li>
              <a className="hover:text-blue-400 normal-case">
                <span>
                  <SiTwitter />
                </span>
                <p className="normal-case">Twitter</p>
              </a>
            </li>
            <li>
              <a
                className="hover:text-indigo-400 normal-case"
                href="https://discord.gg/e69CsCwyrP"
              >
                <span>
                  <SiDiscord />
                </span>
                <p className="normal-case">Discord</p>
              </a>
            </li>
          </ul>
        </div>
        <Link href="/">
          <a className="btn bg-transparent border-0 hover:bg-transparent normal-case text-xl space-x-2">
            <span>
              <Image src={APP_ENV.logo} width={30} height={30} />
            </span>
            <h2 className="font-bold  text-neutral">{APP_ENV.name}</h2>
          </a>
        </Link>
      </div>
      <div className="navbar-end hidden sm:flex">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a
              className="hover:text-green-400 hover:bg-transparent btn btn-ghost text-neutral normal-case"
              href="#"
            >
              <span>
                <IoIosDocument size={15} />
              </span>
              <p>Docs</p>
            </a>
          </li>
          <li>
            <a
              className="hover:text-blue-400 btn hover:bg-transparent btn-ghost text-neutral normal-case"
              href="https://twitter.com/publicator_app"
            >
              <span>
                <SiTwitter />
              </span>
              <p>Twitter</p>
            </a>
          </li>
          <li>
            <a
              className="hover:text-indigo-400 hover:bg-transparent btn btn-ghost text-neutral normal-case"
              href="https://discord.gg/e69CsCwyrP"
            >
              <span>
                <SiDiscord />
              </span>
              <p>Discord</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LandingNavbar;
