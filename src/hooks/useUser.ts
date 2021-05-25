import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery<me>(ME_QUERY, {
    skip: !hasToken,
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (data?.me === null) {
      console.log("wrong token => logout");
      logUserOut();
    }
  }, [data]);
  return { data };
};
export default useUser;
