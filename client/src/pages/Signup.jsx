import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
function Signup() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* p : padding w : width */}
        <div className="flex-1">
          {/*Left side*/}
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-green-500 via-white-500 to-blue-500 rounded-lg text-white  ">
              TAQU
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            You can sign up with your email and password or with Google
          </p>
        </div>
        <div className="flex-1">
          {/*Right side*/}
          <div className="">
            <form className="flex flex-col gap-4 ">
              <div>
                <Label value="Your username" />
                <TextInput type="text" placeholder="Username" id="username" />
              </div>
              <div>
                <Label value="Your email" />
                <TextInput
                  type="text"
                  placeholder="name@company.com"
                  id="email"
                />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                />
              </div>
              <Button gradientDuoTone="greenToBlue" type="submit">
                Sign Up
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/signin" className="text-blue-500">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); //mt = margin top
}

export default Signup;
