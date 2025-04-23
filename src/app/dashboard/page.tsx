"use client";

import { useCallback, useState } from "react";
import { DetailedActivityResponse } from "strava-v3";

const DashboardPage = () => {
  const [activities, setActivities] = useState<DetailedActivityResponse[]>([]);

  const fetchActivities = useCallback(async () => {
    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("🚀 ~ fetchActivities ~ data:", data)

      setActivities(data.activities);
    } catch {}
  }, []);

  return (
    <div className="container mx-auto pt-10">
      <div className="mt-5">
        <button onClick={fetchActivities}>Fetch activities</button>
      </div>

      <div className="flex flex-col mt-5 gap-3">
        {activities?.map((activity) => (
          <div key={activity.id} className="border rounded-lg px-3 py-3">
            <p className="font-medium">{activity.name}</p>
            <p>{`Duration: ${activity.elapsed_time} seconds`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;

