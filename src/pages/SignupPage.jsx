import Signup from "../components/Auth/Signup";
import SEO from "../components/SEO";

export default function SignupPage() {
  return (
    <>
      <SEO title="Sign Up" description="Create your Meraya account." noIndex />
      <Signup />
    </>
  )
}
