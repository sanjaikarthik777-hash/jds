/**
 * JDS Iron and Steels — Analytics Hook (Legacy)
 * Formerly used Firebase Analytics, now a no-op hook to maintain compatibility.
 */
const useAnalytics = () => {
  const trackEvent = (eventName, eventParams = {}) => {
    // console.log("Track Event:", eventName, eventParams);
  };

  const trackPageView = (pageName) => {
    // console.log("Page View:", pageName);
  };

  const trackAction = (actionName, category) => {
    // console.log("Action:", actionName, category);
  };

  return { trackEvent, trackPageView, trackAction };
};

export default useAnalytics;
