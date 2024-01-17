import Inbox from "@/components/Inbox/Inbox";
export const revalidate = 0;
export default async function page() {
  return (
    <main className="app">
      <Inbox />
    </main>
  );
}
