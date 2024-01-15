import Inbox from "@/components/Inbox/Inbox";
import { getMessages } from "@/lib/db";
export const revalidate = 0;
export default async function page() {
  const messages = await getMessages({
    take: 8,
    skip: 0,
  });
  return (
    <main className="app">
      <Inbox initialData={messages} />
    </main>
  );
}
