import Controllers from "@/components/Controllers";
import Table from "@/components/Table";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <div>
      <div className="gradient"></div>
      <Topbar />
      <main className="flex flex-col gap-4 px-8 pt-4">
        <Controllers />
        <Table />
      </main>
    </div>
  );
}
