"use client"; // Marca este archivo como un componente del cliente

import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes"; // Mueve ThemeProvider aquí

export default function FixHydra({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    // Usamos un `isMounted` para asegurarnos de que el componente se ha montado en el cliente,
    // evitando problemas de hidratación debido a una falta de sincronización en el SSR.
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    if (!isMounted) return null; // Evita renderizar hasta que el cliente esté listo
  

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      {children}
      </ThemeProvider>
  );
}
