type Props = {};

export default function Background({}: Props) {
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 -z-10"
      style={{
        backgroundImage: "url('/default-wallpaper.jpg')",
        backgroundSize: "cover",
      }}
    />
  );
}
