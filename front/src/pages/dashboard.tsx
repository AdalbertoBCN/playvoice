import useChampSelect from "@/hooks/useChampSelect"
import { MainNav } from "@/components/main-nav"
import TopNavbar from "@/components/top-navbar"

export default function DashboardPage() {
  const champSelect = useChampSelect()

  return (
    <div className="flex flex-col gap-4">
      <TopNavbar />
      <MainNav className="mx-6" />
      <h1>Campeão Selecionado:</h1>
      <pre>{JSON.stringify(champSelect, null, 2)}</pre>
    </div>
  )
}
