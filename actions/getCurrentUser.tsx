import { SessionInterface } from "@/common.types";
import { authOptions } from "@/libs/session";
import { getServerSession } from "next-auth";

export default async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface
    return session;
}