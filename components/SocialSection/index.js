import { useState, useEffect } from "react";
import { loadExternalScript } from "../../utils/global";

const SocialSection = () => {
  const [isTwitterWidgetLoaded, setIsTwitterWidgetLoaded] = useState(false);
  const [isGitHubWidgetLoaded, setIsGitHubWidgetLoaded] = useState(false);

  useEffect(() => {
    loadExternalScript("https://buttons.github.io/buttons.js", () => {
      setIsGitHubWidgetLoaded(true);
    });
    loadExternalScript("https://platform.twitter.com/widgets.js", () => {
      setIsTwitterWidgetLoaded(true);
    });
  });

  return (
    <section id="rahuldkjain-social">
      <div id="twitter-social-container">
        {isTwitterWidgetLoaded ? (
          <a
            href="https://twitter.com/Rahuldkjain"
            className="twitter-follow-button"
            data-show-count="true"
            data-size="large"
            data-show-screen-name="false"
            aria-label="Follow @rahuldkjain on GitHub"
            target="_blank"
          >
            Follow
          </a>
        ) : (
          <a
            href="https://twitter.com/Rahuldkjain"
            aria-label="Follow @rahuldkjain on twitter"
            target="_blank"
          >
            Twitter @rahuldkjain
          </a>
        )}
      </div>
      <div id="github-social-container">
        {isGitHubWidgetLoaded ? (
          <a
            className="github-button"
            href="https://github.com/rahuldkjain"
            data-size="large"
            data-show-count="true"
            aria-label="Follow @rahuldkjain on GitHub"
            target="_blank"
          >
            GitHub
          </a>
        ) : (
          <a
            href="https://github.com/rahuldkjain"
            aria-label="Follow @rahuldkjain on GitHub"
            target="_blank"
          >
            GitHub @rahuldkjain
          </a>
        )}
      </div>
    </section>
  );
};
export default SocialSection;
