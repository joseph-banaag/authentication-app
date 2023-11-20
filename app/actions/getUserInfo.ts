export const getUserInfo = async () => {
  const storedUsername = {
    data:
      typeof window !== "undefined"
        ? sessionStorage.getItem("session_name")
        : null,
  };

  const username = storedUsername.data;

  const response = await fetch(`http://localhost:3000/api/users?q=${username}`);
};
