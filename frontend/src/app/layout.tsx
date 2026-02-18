import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Go4Movies",
  description: "Find and book movies near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Spline+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-display antialiased">
        <header className="flex items-center justify-between border-b border-neutral-800 px-6 md:px-10 py-4 bg-neutral-900">
          <a href="/movies" className="flex items-center gap-3 text-white">
            <span className="material-symbols-outlined text-primary text-3xl">
              movie
            </span>
            <h1 className="text-xl font-bold tracking-tight">Go4Movies</h1>
          </a>
          <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-6">
              <a
                className="text-neutral-200 text-sm font-medium hover:text-white transition-colors"
                href="/movies"
              >
                Movies
              </a>
              <a
                className="text-neutral-200 text-sm font-medium hover:text-white transition-colors"
                href="#"
              >
                Cinemas
              </a>
              <a
                className="text-neutral-200 text-sm font-medium hover:text-white transition-colors"
                href="#"
              >
                Offers
              </a>
            </nav>
            <div className="flex gap-3">
              <a
                href="/login"
                className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:brightness-110 transition-all flex items-center"
              >
                Sign In
              </a>
              <button className="p-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-colors">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
