import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';



const handler = NextAuth({
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const response = await fetch((`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (response.ok && data) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              accessToken: data.access_token,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.accessToken) {
        session.user = {
          ...session.user,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
