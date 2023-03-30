import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token }) {
        return token?.userRole === "admin"
    },
  },
})

export const config = {matcher: ['/admin/(.*)']};