import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group toast group-[.toaster]:bg-green-50 group-[.toaster]:text-green-800 group-[.toaster]:border-green-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-green-950 dark:group-[.toaster]:text-green-200 dark:group-[.toaster]:border-green-800",
          error:
            "group toast group-[.toaster]:bg-red-50 group-[.toaster]:text-red-800 group-[.toaster]:border-red-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-red-950 dark:group-[.toaster]:text-red-200 dark:group-[.toaster]:border-red-800",
          warning:
            "group toast group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-800 group-[.toaster]:border-yellow-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-yellow-950 dark:group-[.toaster]:text-yellow-200 dark:group-[.toaster]:border-yellow-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
