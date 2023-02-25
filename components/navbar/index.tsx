import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signOut } from "../../lib/authContext";
import { useRouter } from "next/router";
import { APP_ENV } from "../../config";
import Image from "next/image";
import { MdAdd, MdOutlineLogout } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";

type T_Mailbox = {
  id: string;
  email: string;
};

const mailboxes: T_Mailbox[] = [
  {
    id: "abcded",
    email: "abcded@gmail.com",
  },
];

function DashboardNavbar() {
  const router = useRouter();

  const [activeOption, setActiveOption] = useState<string | null>(null);

  const confirmAndLogout = () => {
    if (!window.confirm("Are you sure you want to log out?")) return;
    signOut();
    router.push("/login");
  };

  useEffect(() => {
    const asPathWithoutQuery = router.asPath.split("?")[0];
    const activeOption = mailboxes.filter((option) =>
      asPathWithoutQuery.includes(option.id)
    );
    if (activeOption.length > 0) {
      setActiveOption(activeOption[0].id);
    }
  }, [router.asPath]);

  return (
    <div className="flex flex-col items-center justify-between py-1 min-h-full bg-dark-mode-primary">
      {/* middle icons */}
      <ul className="flex flex-col items-center">
        {/* TODO: add active option */}
        {mailboxes?.map((mailbox) => (
          <li key={mailbox.id}>
            <div
              className={`p-3 rounded hover:text-brand-accent hover:cursor-pointer flex items-center justify-center text-gray-400  tooltip hover:tooltip-open tooltip-right`}
              data-tip={mailbox.email}
            >
              <Link href={`/app/dashboard/${mailbox.id}`}>
                <a
                  className={`${
                    activeOption == mailbox.id && "text-neutral bg-brand-accent"
                  }`}
                >
                  <div className="btn btn-circle btn-ghost avatar placeholder">
                    <div className="border border-brand-accent rounded-full w-14  hover:bg-dark-mode-secondary text-brand-accent">
                      <span className="text-xl uppercase">
                        {mailbox.email[0] + mailbox.email[1]}
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          </li>
        ))}
        <li>
          <label className="btn btn-circle btn-ghost avatar placeholder hover:cursor-pointer">
            <div className="border border-brand-accent rounded-full w-14 text-brand-accent hover:text-black hover:bg-brand-accent">
              <span className="text-xl uppercase">
                <MdAdd size={25} />
              </span>
            </div>
          </label>
        </li>
      </ul>
      {/* profile */}
      <div className="dropdown dropdown-right dropdown-end">
        <label tabIndex={0} className="m-2">
          <div className="avatar btn btn-circle btn-ghost">
            <div className="w-14 rounded-full">
              {/* TODO: replace 1 with user emailid->hashed */}
              <img
                src={`https://avatars.dicebear.com/api/croodles/${1}.svg?background=%23ffffff`}
              />
            </div>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content p-5 shadow bg-dark-mode-secondary rounded-box w-36"
        >
          <li key={0} className="hover:text-red-400 text-gray-300">
            <label
              className="flex w-full justify-start  hover:cursor-pointer"
              onClick={confirmAndLogout}
            >
              <MdOutlineLogout size={22} />
              <p className="pl-3">Logout</p>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DashboardNavbar;
