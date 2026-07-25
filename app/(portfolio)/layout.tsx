import { PortfolioExperience } from "@/components/portfolio-experience";

export default function PortfolioLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PortfolioExperience />
      {children}
    </>
  );
}
