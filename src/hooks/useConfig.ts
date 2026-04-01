import { useAuth } from "@/hooks/useAuth";
import { Home } from "lucide-react";

export function useConfig() {
  const { user } = useAuth();
  const navigation = [
    { name: "Home", href: "/home", current: true, visible: true },
    {
      name: "Facilities",
      href: "/facilities",
      icon: Home,
      current: false,
      visible: user && user.role === "admin",
    },
    {
      name: "Tables",
      href: "/tables",
      icon: Home,
      current: false,
      visible: user && user.role === "user",
    },
    {
      name: "Reservations",
      href: "/reservations",
      icon: Home,
      current: false,
      visible: user && user.role === "user",
    },
  ];

  return {
    navigation,
  };
}
