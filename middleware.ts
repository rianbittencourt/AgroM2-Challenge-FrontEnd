import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login", // Página de login personalizada, se usada
  },
});

export const config = {
  matcher: ["/",], // Defina os caminhos protegidos
};
