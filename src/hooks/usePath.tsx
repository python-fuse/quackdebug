import { usePathname } from "next/navigation";

// Maage paths and active path
const usePath = () => {
  const pathame = usePathname();

  const segments = pathame.split("/").filter((segment) => segment !== "");
  if (segments.length === 1) return segments[0];

  return segments[1];
};

export default usePath;
