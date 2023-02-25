import Image from "next/image";
import Link from "next/link";
import { APP_ENV } from "../../config";

function Navbar() {
  return (
    <div className="navbar py-4 lg:px-5">
      <div className="navbar-start">
        <Link href="/app/dashboard">
          <a className="btn bg-transparent border-0 hover:bg-transparent normal-case">
            <span className="flex flex-row">
              <h2 className="font-bold text-2xl text-neutral">
                {APP_ENV.name.slice(0, 4)}
              </h2>
              <h2 className="font-bold text-2xl text-brand-accent">
                {APP_ENV.name.slice(4)}
              </h2>
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
