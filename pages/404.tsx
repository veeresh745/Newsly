import Link from "next/link";

const NotFound = () => {
  return (
    <div className="mt-16 flex flex-col justify-center items-center">
      <h2 className="text-5xl font-semibold">404</h2>
      <p className="mt-1 text-3xl font-medium">{"Uh ho! you just got 404'D"}</p>
      <p className="mt-3 text-md font-normal">
        {"The page you are looking for does not exist :("}
      </p>
      <p className="mt-3 text-md font-normal">
        <Link href="/app/dashboard">
          <a className="link link-hover text-brand-accent">Back to dashboard</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
