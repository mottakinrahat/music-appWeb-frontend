import Mixer from "@/components/svg/Mixer";
import { VolumeRangeMixer } from "@/components/ui/slider";
import React, { useState } from "react";

const MixerFunctionality = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(!showModal)}>
        <Mixer showModal={showModal} />
      </button>

      {showModal && (
        <div className="absolute top-[720px] left-[70px] md:left:[200px] lg:left-[510px] xl:left-[510px] bg-[#DBDAD9] w-[372px] gap-2 p-4 rounded-[8px]">
          <div className="flex me-0 gap-4 items-center">
            <p className="w-[95px] flex justify-end">Guid Vocal:</p>
            <div className="w-[228px]">
              <VolumeRangeMixer defaultValue={[55]} max={100} step={1} />
            </div>
          </div>
          <div className="flex me-0 gap-4 items-center">
            <p className="w-[95px] flex justify-end">Vocal:</p>
            <div className="w-[228px]">
              <VolumeRangeMixer defaultValue={[40]} max={100} step={1} />
            </div>
          </div>
          <div className="flex me-0 gap-4 items-center">
            <p className="w-[95px] flex justify-end">Instrumental:</p>
            <div className="w-[228px]">
              <VolumeRangeMixer defaultValue={[70]} max={100} step={1} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MixerFunctionality;
