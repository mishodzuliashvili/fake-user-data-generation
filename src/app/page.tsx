import Controllers from "@/components/Controllers";
import { Scroll } from "@/components/Scroll";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <main>
      <div className="gradient"></div>
      <Topbar />
      <Controllers />
      <Scroll />
    </main>
  );
}
