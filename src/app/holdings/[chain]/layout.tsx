import MainLayout from "@/components/basic/MainLayout"

export default function HoldingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainLayout>
        {children}
      </MainLayout>
    </>
  )
}