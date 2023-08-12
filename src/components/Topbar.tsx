import Link from "next/link";

const Topbar = () => {
  return (
    <div className="px-8 border-b border-tsecondary py-4 flex items-center justify-between">
      <div className="flex gap-6 items-center">
        <span className="text-xl">❤</span>
        <span className="text-sm hidden sm:inline-block">
          Generate Random Users
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Link href="" className="font-medium">
          Github
        </Link>
        <Link href="" className="font-medium">
          Linkedin
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
