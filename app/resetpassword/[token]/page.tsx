import checkValidToken from "@/app/actions/checkValidToken";
import EmptyState from "@/app/components/EmptyState";
import ResetPasswordClient from "./ResetPasswordClient";

interface IParams {
  token?: string;
}

const ResetPasswordPage = async ({ params }: { params: IParams }) => {
  const tokenId = params?.token;
  let validToken;
  if (tokenId) {
    validToken = await checkValidToken({ token: tokenId });
  }

  if (!validToken || !tokenId) {
    return (
      <EmptyState
        title="Invalid token!"
        subtitle={`Looks like the token has already expired or is invalid.`}
        showReset
      />
    );
  }

  return (
    <div>
      <ResetPasswordClient token={tokenId} />
    </div>
  );
};

export default ResetPasswordPage;
