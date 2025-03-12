import AgencyDetails from "@/components/forms/agency-details";
import { getAuthUserDetails, VerifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";

const Page = async ({
  searchParams,
}: {
  searchParams: { plan: Plan; state: string; code: string };
}) => {
  const user = await getAuthUserDetails();
  const agencyId = await VerifyAndAcceptInvitation();
  const searchParam = searchParams; // Removed unnecessary await

  if (agencyId) {
    if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER') { // Fixed OR operator
      return redirect('/subaccount');
    } else if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCYADMIN') { // Fixed OR operator
      if (searchParam.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParam.plan}`); // Fixed template literal
      }
      if (searchParam.state) {
        const statePath = searchParam.state.split('__')[0];
        const stateAgencyId = searchParam.state.split('___')[1];
        if (!stateAgencyId) return <div>Not authorized</div>;
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParam.code}` // Fixed template literal
        );
      } else {
        return redirect(`/agency/${agencyId}`); // Fixed template literal
      }
    } else {
      return <div>Not authorized</div>;
    }
  }

  const authUser = await currentUser();

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl font-bold left-4 text-center w-full">
          Create An Agency
        </h1>
        <AgencyDetails
          data={{
            companyEmail: authUser?.emailAddresses[0].emailAddress,
          }}
        />
      </div>
    </div>
  );
};

export default Page;