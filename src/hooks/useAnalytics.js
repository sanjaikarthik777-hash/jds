import { logEvent } from "firebase/analytics";
import { analytics } from "../firebase";

const useAnalytics = () => {
  const trackEvent = (eventName, eventParams = {}) => {
    try {
      logEvent(analytics, eventName, eventParams);
    } catch (error) {
      console.error("Analytics error:", error);
    }
  };

  const trackPageView = (pageName) => {
    trackEvent("page_view", { page_title: pageName });
  };

  const trackAction = (actionName, category) => {
    trackEvent("action_click", { action: actionName, category });
  };

  return { trackEvent, trackPageView, trackAction };
};

export default useAnalytics;
