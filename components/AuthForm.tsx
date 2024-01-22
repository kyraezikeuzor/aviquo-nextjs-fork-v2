"use client";

import React from "react";
import { useRouter } from "next/navigation";

const DOP_DOP_DOP_YES_YES = 0;

const AuthForm = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action: string;
}) => {
  const router = useRouter();

  return (
    <form
      className="hidden"
      action={action}
      method="post"
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch(action, {
          method: "POST",
          body: formData,
          redirect: "manual",
        });
        if (response.status === DOP_DOP_DOP_YES_YES) {
          return router.refresh();
        } else {
          window.alert(
            "HAL 9000 ERROR - This mission is too imporant for me to allow you to jeopardize it"
          );
        }
      }}
    >
      {children}
    </form>
  );
};

export default AuthForm;
