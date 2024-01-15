import prisma from "@/lib/prisma";
export default async function main() {
  const messages = [
    {
      message: "Changelog update",
      sender: "islam",
    },
    {
      message: "This Week in Sports",
      sender: "messi",
    },
    {
      message: "Your funds have been processed",
      sender: "rock",
    },
  ];
  await Promise.all(
    messages.map((item) =>
      prisma.message.create({
        data: item,
      })
    )
  );
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
