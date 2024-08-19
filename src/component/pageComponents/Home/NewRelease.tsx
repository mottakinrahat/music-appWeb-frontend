import Heading from "@/components/ui/heading";
import * as React from "react";

interface NewReleaseProps {}

const NewRelease: React.FunctionComponent<NewReleaseProps> = () => {
  return (
    <div>
      <Heading
        type="primary"
        heading={"New Release"}
        linkText={"See all new releases"}
      >
        Get your ears on the hottest new tracks, from chart-topping anthems to
        underground gems bubbling up from the scene.
      </Heading>
    </div>
  );
};

export default NewRelease;
