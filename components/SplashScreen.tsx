import { PuffLoader } from "react-spinners";
import Image from "next/image";
import { APP_ENV } from "../config";

function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-2">
      <p className="flex flex-col space-x-3 justify-center items-center space-y-2">
        <span>
          <Image src={APP_ENV.logo} width={50} height={50} />
        </span>
        <h2 className="font-bold  text-neutral">{APP_ENV.name}</h2>
      </p>
      <PuffLoader speedMultiplier={1} color={"#6B43FD"} />
    </div>
  );
}

export default SplashScreen;
