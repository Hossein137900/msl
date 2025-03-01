import Test from "@/components/test";
import { prisma } from "@/lib/prisma";

const Page = async () => {
    const user = await prisma.user.findMany({
        where: {
            role: "user",
        },
    });
  return (

    <div>
        {user.map((user) => (
            <div key={user.id}>
                <h1>{user.name}</h1>
                <p>{user.password}</p>
                <p>{user.phoneNumber}</p>
                <p>{user.role}</p>
            </div>
        ))}
        <h1></h1>
      <Test />
    </div>
  )
}

export default Page;