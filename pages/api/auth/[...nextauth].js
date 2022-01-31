import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
     providers: [
          GoogleProvider({
               clientId: process.env.GOOGLE_CLIENT_ID,
               clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
     ],
     secret: process.env.JWT_SECRET_KEY,
     pages: {
          signIn: '/auth/signin',
          signOut: '/auth/signout',
          error: '/auth/error', // Error code passed in query string as ?error=
          verifyRequest: '/auth/verify-request', // (used for check email message)
          newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
     },
     callbacks: {
          async session({ session, user, token }) {
               session.user.username = session.user.name.split(" ").join("").toLowerCase();
               session.user.uid = token.sub;
               return session
          },
     }
});
