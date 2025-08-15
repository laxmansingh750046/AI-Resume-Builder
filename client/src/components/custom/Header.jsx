import { Button } from "../ui/button.jsx";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
function Header() {
  const { isSignedIn, user } = useUser();
  return (
    <div>
      <div className="bg-red-600 text-white px-4 py-2 text-center font-medium">
        🚧 AI Resume Generation Temporarily Unavailable — We’re upgrading our
        system for better security. You can still create resumes manually.
      </div>

      <div className="p-3 px-5 flex justify-between shadow-md">
        <img src="/logo.svg" width={60} height={50} />

        {isSignedIn ? (
          <div className="flex gap-2 items-center">
            <Link to={"/dashboard"}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to={"/auth/sign-in"}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
