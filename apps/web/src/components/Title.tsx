interface TitleProps {
  text: string;
}

export function Title({ text }: TitleProps) {
  return (
    <h2 className="text-white text-2xl md:text-4xl font-medium tracking-[0.4em] uppercase leading-none opacity-90 whitespace-nowrap">
      {text}
    </h2>
  );
}
