import type { ReactNode } from "react";

type CategoryLayoutProps = {
  children: ReactNode;
};

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return <>{children}</>;
}
