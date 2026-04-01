// import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

import type { ChangePasswordForm } from "@/types";
import UpdatePasswordForm from "../../components/forms/UpdatePasswordForm";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function ChangePassword() {
  // const navigate = useNavigate();
  const { changePassword } = useAuth();
  const submit = async ({
    email,
    currentPassword,
    newPassword,
  }: ChangePasswordForm) => {
    try {
      await changePassword(email, currentPassword, newPassword);
      toast.success("ChangePassword::success", {
        description: `Successfully changed password for ${email}`,
      });
      // await navigate("/home");
    } catch (error) {
      console.error(error);
      toast.error("ChangePassword::failed", {
        description: (error as Error).message,
      });
    }
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-xl/9 tracking-tight">
          Change your password
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Suspense fallback={<Loading />}>
          <UpdatePasswordForm submit={submit} />
        </Suspense>
      </div>
    </>
  );
}
