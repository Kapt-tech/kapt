import Link from "next/link";

export function Brand() {
  return (
    <div className="flex flex-col gap-1">
      <Link href="/" className="group">
        <h1 className="text-actionVolt text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic group-hover:text-actionVolt/90 transition-all duration-300">
          KAPT
        </h1>
      </Link>
      <p className="text-white text-[10px] md:text-xs font-medium tracking-wide">
        Galerias de eventos multiesportivos.
      </p>
    </div>
  );
}