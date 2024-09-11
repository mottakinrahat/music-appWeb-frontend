import lqip from "lqip-modern";

export const generateBlurDataUrl = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();
  const lqipData = await lqip(Buffer.from(buffer));

  return lqipData.metadata.dataURIBase64; 
};
