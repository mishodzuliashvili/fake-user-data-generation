import Link from "next/link";

const Topbar = () => {
  return (
    <div className="flex items-center justify-between border-b border-tsecondary py-4 px-8">
      <div className="flex items-center gap-6">
        <span className="text-xl ">❤</span>
        <span className="text-sm hidden sm:inline-block">
          Generate Random Users
        </span>
      </div>
      <div className="flex items-center gap-6">
        <Link
          href="https://github.com/mishodzuliashvili"
          target="_blank"
          className="font-medium hover:text-gray-500 duration-300"
        >
          Github
        </Link>
        <Link
          href="https://www.linkedin.com/in/misho-dzuliashvili/"
          target="_blank"
          className="font-medium hover:text-gray-500 duration-300"
        >
          Linkedin
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
