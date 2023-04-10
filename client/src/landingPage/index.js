import React, { useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { analytics } from "../auth/Firebase";

function Landing() {
  useEffect(() => {
    // Log a page_view event when the HomePage component is mounted
    logEvent(analytics, "page_view", { page_title: "HomePage" });
  }, []);
  return <div>landing</div>;
}

export default Landing;
