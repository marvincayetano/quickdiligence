import { useRouter } from "next/router";
import { useAnimalQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetAnimalFromUrl = () => {
  const intId = useGetIntId();

  return useAnimalQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
