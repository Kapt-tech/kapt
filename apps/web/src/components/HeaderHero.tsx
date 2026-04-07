import { Title } from "./Title";
import { HeaderActions } from "./HeaderActions";

interface HeaderHeroProps {
  pageTitle: string;
  onAuthClick: () => void;
}

export function HeaderHero({ pageTitle, onAuthClick }: HeaderHeroProps) {
  return (
    <div className="flex flex-row items-center justify-end gap-12 w-full ml-auto">
      <Title text={pageTitle} />
      <HeaderActions onAuthClick={onAuthClick} />
    </div>
  );
}
