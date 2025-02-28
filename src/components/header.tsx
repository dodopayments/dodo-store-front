"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

const Header = () => {
  const { business_name } = useParams();
  
  return (
    <header className="relative w-full">
      <div className="relative h-[35dvh] md:h-[30dvh] w-full">
        <Image
          src="/image.jpg"
          alt="Business banner"
          fill
          priority
          className="object-cover"
        />
      </div>
      
      <section className="relative flex flex-col items-center px-4">
        <div className="absolute -top-0 -translate-y-1/2 w-[72px] h-[72px] rounded-full overflow-hidden shadow-bg-primary/50 shadow-md">
        <Image
          src="/image.webp"
          alt="Business Logo"
          fill
          priority
          className="object-cover object-center"
        />
        </div>

        <h1 className="mt-12 text-2xl font-semibold font-display text-text-primary">
          {decodeURIComponent(business_name as string)}
        </h1>
      </section>
    </header>
  );
};

export default Header;
