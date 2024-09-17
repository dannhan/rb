/* only development page to create an admin user */

import { firebaseAuth } from "@/firebase/client";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "@/auth";
import { auth as firebaseAdminAuth } from "@/firebase/init";

export default async function Page() {
  if (process.env.NODE_ENV === "production") return <pre>Hello World</pre>;

  const session = await auth();

  if (!session) return <pre>{JSON.stringify(session, null, 2)}</pre>;

  // /* set user to be an admin */
  // const userId = session.user.id;
  // firebaseAdminAuth.setCustomUserClaims(userId, { admin: true });

  // /* log userRecord */
  // const userRecord = await firebaseAdminAuth.getUser(userId);
  // console.log(userRecord);

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}

async function _() {
  const email = "";
  const password = "";

  await signInWithEmailAndPassword(firebaseAuth, email, password).catch(
    (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return <pre>{JSON.stringify({ errorCode, errorMessage }, null, 2)}</pre>;
    },
  );

  const user = firebaseAuth.currentUser;
  if (user) updateProfile(user, { displayName: "Admin" });
}
