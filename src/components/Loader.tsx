function Loader() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-gray-200 animate-pulse h-20 rounded-xl"
        />
      ))}
    </div>
  );
}

export default Loader;