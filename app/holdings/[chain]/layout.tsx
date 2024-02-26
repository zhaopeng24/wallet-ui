import MainLayout from "@/components/basic/MainLayout";

export default function ChainLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  )
}