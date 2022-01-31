import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

export default function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center px-16 min-h-screen py-2 -mt-36 text-center">
        <div>
          <img className="w-80" src="https://links.papareact.com/ocw" alt="" />
          <p className="text-xs italic">
            Welcome to Instagram signIn page. Please and joined
          </p>
        </div>
        <div className="mt-36">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-600 font-semibold text-white rounded-lg"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
