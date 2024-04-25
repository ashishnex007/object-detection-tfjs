import ObjectDetection from "@/components/ObjectDetection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1
        className="gradient-title font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-tighter text-center"
      >
        Objection Detection with Tf.js
      </h1>

      <ObjectDetection />
    </main>
  );
}
