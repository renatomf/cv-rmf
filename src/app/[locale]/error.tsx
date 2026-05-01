"use client";

import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Algo deu errado</h2>
        <p className="text-muted-foreground mb-6">Ocorreu um erro inesperado. Tente novamente.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-md border border-[#0bafac] text-[#0bafac] text-sm font-medium hover:bg-[#0bafac] hover:text-white transition-colors duration-200"
        >
          Recarregar página
        </button>
      </div>
    </div>
  );
}
