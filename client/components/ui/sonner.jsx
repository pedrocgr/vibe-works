import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNameFunction: (state) => (state.type === "error" ? "group toast group-[.toaster]:bg-red-600 group-[.toaster]:text-red-50 group-[.toaster]:border-red-700" : ""),
      }}
    />
  );
}
