import { deleteToken } from "@/app/actions/deleteToken";

const StoredUsername = {
  data:
    typeof window !== "undefined"
      ? sessionStorage.getItem("session_name")
      : null,
};

export const session_name = StoredUsername.data;

export const getUser = async () => {
  const response = await fetch(
    `http://localhost:3000/api/authed-user?q=${session_name}`,
    {
      cache: "force-cache",
      method: "GET",
    },
  );
  const data = await response.json();
  const verified = data?.user;
  const verified_user = verified?.session_name;

  if (!response.ok) {
    if (session_name !== verified_user) {
      deleteToken();
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
  }
};
