import useChampSelect from "@/hooks/useChampSelect";
import { MainNav } from "@/components/main-nav";
import TopNavbar from "@/components/top-navbar";
import FriendList from "@/components/friend-list";

export default function DashboardPage() {
  const champSelect = useChampSelect();

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <TopNavbar />
      {/* <MainNav className="mx-6" /> */}
      
      <main className="w-full grid flex-1">
        <div className="justify-self-end">
          <FriendList />
        </div>
      </main>
    </div>
  );
}
