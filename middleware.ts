import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Obtém o cookie 'next-auth.session-token'
  const token = request.cookies.get('next-auth.session-token');

  // Verifica se o usuário está acessando as páginas de autenticação
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  // Se o usuário já estiver logado e tentar acessar uma página de autenticação, redireciona para o dashboard
  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Se o usuário não estiver logado e tentar acessar qualquer outra página, redireciona para a página de login
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se o token existir e o usuário não estiver tentando acessar páginas de autenticação, permite a navegação
  return NextResponse.next();
}

// Configuração para aplicar o middleware apenas em páginas específicas
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
