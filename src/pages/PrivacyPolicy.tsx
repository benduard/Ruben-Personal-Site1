import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/ui/footer";
import { ScrollAnimation } from "@/components/scroll-animation";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { ParticlesBackground } from "@/components/ui/particles-background";

export function PrivacyPolicy() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black w-full min-h-screen">
      <CursorSpotlight />
      <ParticlesBackground />
      <Navigation scrollToSection={scrollToSection} />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(147,51,234,0.15)] via-[rgba(147,51,234,0.08)] to-transparent" />
        
        <div className="container mx-auto relative z-10 max-w-4xl">
          <ScrollAnimation>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-mono mb-8 text-center">
              Privacy Policy & SMS Terms
            </h1>
          </ScrollAnimation>
          
          <div className="space-y-12">
            {/* Privacy Policy Section */}
            <ScrollAnimation>
              <div className="relative rounded-[1.25rem] border-[0.75px] border-purple-500/30 p-2 md:rounded-[1.5rem] md:p-3">
                <div className="relative flex h-full flex-col justify-between gap-6 rounded-xl border-[0.75px] bg-black p-6 sm:p-8 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-8">
                  <div className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl text-white font-mono mb-6">
                      Privacy Policy
                    </h2>
                    
                    <p className="text-base sm:text-lg leading-relaxed text-white/80">
                      We respect your privacy. When you provide your phone number, email, or other contact details, we use this information solely to communicate with you regarding your inquiries, updates, appointment scheduling, follow-ups, and relevant offers.
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl text-white font-mono">
                        SMS Communications
                      </h3>
                      <p className="text-base sm:text-lg leading-relaxed text-white/80">
                        By opting in to receive SMS messages from RubenValderrama.com, you agree to receive no more than 4–6 text messages per month. You may opt out at any time by replying STOP to any message, which is processed immediately. For assistance, reply HELP or contact us directly. Message and data rates may apply.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl text-white font-mono">
                        Data Use
                      </h3>
                      <p className="text-base sm:text-lg leading-relaxed text-white/80">
                        Your personal information is used exclusively by RubenValderrama.com and is never sold, rented, or shared with third parties. We retain your contact information only for as long as necessary to fulfill the purposes outlined above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            
            {/* SMS Terms Section */}
            <ScrollAnimation>
              <div className="relative rounded-[1.25rem] border-[0.75px] border-purple-500/30 p-2 md:rounded-[1.5rem] md:p-3">
                <div className="relative flex h-full flex-col justify-between gap-6 rounded-xl border-[0.75px] bg-black p-6 sm:p-8 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-8">
                  <div className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl text-white font-mono mb-6">
                      SMS Terms & Conditions
                    </h2>
                    
                    <p className="text-base sm:text-lg leading-relaxed text-white/80">
                      By opting in to receive SMS messages from RubenValderrama.com, you agree to the following:
                    </p>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg sm:text-xl text-white font-mono mb-3">
                          Message Frequency
                        </h3>
                        <p className="text-base sm:text-lg leading-relaxed text-white/80">
                          You may receive 4–6 messages per month related to your inquiries, service updates, appointment scheduling, follow-ups, and relevant offers.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg sm:text-xl text-white font-mono mb-3">
                          Opt-In
                        </h3>
                        <p className="text-base sm:text-lg leading-relaxed text-white/80">
                          You can opt in via our website contact form at https://rubenvalderrama.com/contact by checking the consent box before submitting, or by providing your phone number and written consent directly to us.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg sm:text-xl text-white font-mono mb-3">
                          Opt-Out
                        </h3>
                        <p className="text-base sm:text-lg leading-relaxed text-white/80">
                          You may opt out at any time by replying STOP to any message. To receive assistance, reply HELP or contact us directly. Your opt-out request will be processed immediately.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg sm:text-xl text-white font-mono mb-3">
                          Message & Data Rates
                        </h3>
                        <p className="text-base sm:text-lg leading-relaxed text-white/80">
                          Message and data rates may apply based on your mobile plan and carrier.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg sm:text-xl text-white font-mono mb-3">
                          Privacy
                        </h3>
                        <p className="text-base sm:text-lg leading-relaxed text-white/80">
                          Your information is handled according to our Privacy Policy and will never be sold or shared with third parties.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}