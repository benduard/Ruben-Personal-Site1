import { useEffect } from 'react';
import App from '../App';

export function ContactPage() {
  useEffect(() => {
    // Scroll to contact section after component mounts
    const timer = setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const offset = 80;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, []);

  return <App />;
}