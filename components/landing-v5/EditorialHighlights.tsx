import { SectionContainer } from "../landing-shared/SectionContainer";
import { EditorialModule } from "./EditorialModule";

const highlights = [
  {
    artistName: 'Studio Luminescence',
    experienceTitle: 'Ephemeral Light Installation',
    description: 'A breathtaking interactive light sculpture that responds to movement and sound, creating an ever-changing landscape of color and form. Perfect for luxury events seeking a sophisticated, immersive experience.',
    image: '/landing-photos/Orb.png'
  },
  {
    artistName: 'Collective Avant',
    experienceTitle: 'Kinetic Performance Series',
    description: 'Award-winning contemporary performers blend technology with traditional dance, creating memorable moments that captivate audiences. Ideal for corporate galas and high-profile brand activations.',
    image: '/landing-photos/Heathen.png'
  },
  {
    artistName: 'Atelier Moderne',
    experienceTitle: 'Architectural Projection Mapping',
    description: 'Transform any venue into a canvas with precision-mapped projections that tell your story. Our team has worked with Fortune 500 brands and luxury venues worldwide.',
    image: '/landing-photos/Badillac.png'
  }
];

export function EditorialHighlights() {
  return (
    <SectionContainer background="light" className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#cccccc] text-center mb-4">
          CURATOR'S CHOICE
        </p>

        <h2
          className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] text-center mb-20"
          style={{ letterSpacing: '-0.01em' }}
        >
          Featured Experiences
        </h2>

        <div className="space-y-32">
          {highlights.map((highlight, index) => (
            <EditorialModule
              key={index}
              artistName={highlight.artistName}
              experienceTitle={highlight.experienceTitle}
              description={highlight.description}
              image={highlight.image}
              imagePosition={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
