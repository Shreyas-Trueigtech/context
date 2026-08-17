export const authProctect = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    navigate("/login");
  }
};
