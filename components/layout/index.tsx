import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const router = useRouter();

  return (
    <div
      className={`${
        router.pathname === "/" && "bg-white"
      } flex min-h-screen w-full `}
    >
      <div className="flex-grow">{children}</div>
    </div>
  );
}
