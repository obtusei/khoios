type Props = {};

export default function Background({}: Props) {
  return (
    <div
      className="absolute inset-0 -z-10"
      style={{
        backgroundImage: "url('/default-wallpaper.jpg')",
        backgroundSize: "cover",
      }}
    />
  );
}
