import { redirect } from "next/navigation";

export default function Home() {
  redirect("/not-found");
}
