import { Outlet } from "react-router";
import Header from "@/components/Header";
import { Toaster } from "sonner";

export default function AnonymousLayout() {
  return (
    <>
      <Header />
      <Toaster
        position="top-center"
        toastOptions={{
          style: { backgroundColor: "antiquewhite" },
          duration: 5000,
          // icon: <Icon />,
          classNames: {
            title: "!text-gray-900 !font-bold",
            description: "!text-gray-700",
          },
        }}
        // icons={{
        //   success: <SuccessIcon />,
        //   info: <InfoIcon />,
        //   warning: <WarningIcon />,
        //   error: <ErrorIcon />,
        //   loading: <LoadingIcon />,
        // }}
      />
      {/* <main className="flex-grow"> */}
      <main className="flex min-h-full flex-col justify-center p-4 lg:px-8">
        <Outlet /> {/* Nested routes are rendered here */}
      </main>
    </>
  );
}
