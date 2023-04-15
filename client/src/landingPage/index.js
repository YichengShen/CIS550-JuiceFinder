import React, { useEffect } from "react";
import { logEvent, isSupported } from "firebase/analytics";
import { analytics } from "../auth/Firebase";

function Landing() {
  useEffect(() => {
    // Log a page_view event when the HomePage component is mounted
    isSupported().then((yes) =>
      yes
        ? logEvent(analytics, "page_view", { page_title: "HomePage" })
        : () => {}
    );
  }, []);
  return <div>landing page</div>;
}

export default Landing;
