import Link from "next/link";

export function Brand() {
  return (
    <div className="flex flex-col gap-1">
      <Link href="/" className="group">
        <h1 className="text-actionVolt text-8xl md:text-[11rem] font-black uppercase tracking-[-0.08em] leading-none italic group-hover:text-actionVolt/90 transition-all duration-300 whitespace-nowrap drop-shadow-[0_6px_30px_rgba(206,255,0,0.15)]">
          KAPT
        </h1>
      </Link>
    </div>
  );
}
