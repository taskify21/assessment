import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pagesOptions } from "./pages-options";

export function validate(obj: any, key: any) {
  return Object.prototype.hasOwnProperty.call(obj, key) ? true : false;
}

export function excludeKeys(obj: any, keysToRemove: any[]) {
  const newObj = { ...obj };
  keysToRemove.forEach((key: string | number) => {
    delete newObj[key];
  });
  return newObj;
}

export const authOptions: NextAuthOptions = {
  debug: false,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.idToken as string,
          ...excludeKeys(token, [
            "callbackUrl",
            "csrfToken",
            "exp",
            "iat",
            "json",
            "redirect",
            "jti",
          ]),
        },
      };
    },
    async jwt({ token, user, session, trigger }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      if (trigger === "update" && session.name) {
        token.name = session.name;
      }
      if (trigger === "update" && session.email) {
        token.email = session.email;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has("callbackUrl")) {
        return `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials: any) {
        if (validate(credentials, "name")) {
          return { ...credentials };
        }
        return false;
      },
    }),
  ],
};
