import type { Metadata } from "next";
import SobreClient from "./SobreClient";

export const metadata: Metadata = {
  title: "Kapt | Sobre Nós",
  description: "Sobre a Kapt para fotógrafos.",
};

export default function Page() {
  return <SobreClient />;
}
