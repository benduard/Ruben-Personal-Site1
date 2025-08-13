import { TypeAnimation } from 'react-type-animation';

export function TypewriterTitle() {
  return (
    <div className="flex flex-col items-center">
      <TypeAnimation
        sequence={[
          'Ruben',
          () => {},
        ]}
        wrapper="h1"
        cursor={false}
        repeat={0}
        speed={8}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-mono px-2 text-center"
        style={{
          display: 'inline-block',
          textShadow: '0 0 20px rgba(147,51,234,0.5)',
        }}
      />
      <TypeAnimation
        sequence={[
          'Valderrama',
          () => {},
        ]}
        wrapper="h1"
        cursor={true}
        repeat={0}
        speed={8}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white font-mono px-2 text-center"
        style={{
          display: 'inline-block',
          textShadow: '0 0 20px rgba(147,51,234,0.5)',
        }}
      />
    </div>
  );
}