import AboutImageBlock from './ui/about-image-block';
import AboutTextBlock from './ui/about-text-block';
import MissionBlock from './ui/mission-block';

export default function AboutSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-6xl items-center gap-2 px-4 py-5 md:grid-cols-2">
        <AboutImageBlock />
        <AboutTextBlock />
      </div>
      <MissionBlock />
    </section>
  );
}
