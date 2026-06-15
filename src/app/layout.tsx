import type { Metadata } from "next";
import "./globals.css";
import { STORE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: `${STORE_NAME} — Tienda de ropa`,
    template: `%s · ${STORE_NAME}`,
  },
  description: `Compra ropa en ${STORE_NAME}. Envíos y atención por WhatsApp.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
