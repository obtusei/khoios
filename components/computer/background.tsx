import Grainient from "../Grainient";

type Props = {};

export default function Background({}: Props) {
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 -z-10"
      // style={{
      //   backgroundImage: "url('/default-wallpaper.jpg')",
      //   backgroundSize: "cover",
      // }}
    >
      <Grainient
        color1="#FF9FFC"
        color2="#5227FF"
        color3="#B19EEF"
        className="absolute inset-0 -z-10"
        timeSpeed={0.25}
        colorBalance={0}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  );
}
