import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export function useStravaActivities({}) {
  const { data, isValidating } = useSWR(`/api/strava/route`, fetcher);

  console.log("🚀 ~ useStravaActivities ~ data:", data)
  return {
    // status: data?.status,
    // domainJson: data?.domainJson,
    // loading: isValidating,
  };
}