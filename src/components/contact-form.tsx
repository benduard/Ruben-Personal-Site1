import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  smsConsent: z.boolean().refine(val => val === true, {
    message: "Please agree to receive SMS to continue."
  }),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [smsTermsOpen, setSmsTermsOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      smsConsent: false,
      inquiryType: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');

      console.log('🟢 Form submission started');

      // Check if Supabase is properly configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      // Always use fallback mode for development since Supabase isn't configured
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl.includes('placeholder') || 
          supabaseKey.includes('placeholder') ||
          supabaseUrl.includes('your-project') ||
          supabaseKey.includes('your-anon') ||
          supabaseUrl === 'https://your-project-ref.supabase.co' ||
          supabaseKey === 'your-anon-key-here' ||
          supabaseUrl.length < 20 ||
          supabaseKey.length < 20 ||
          supabaseUrl.includes('your-project-url') || 
          supabaseKey.includes('your-anon-key')) {
        console.log('⚠️ Supabase not configured, using fallback mode');
        // Simulate successful submission for development
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('✅ Form data (development mode):', values);
        setSubmitStatus('success');
        form.reset();
        return;
      }
      
      const { data, error } = await supabase
        .from('messages')
        .insert([{
          name: values.name,
          email: values.email,
          phone: values.phone,
          sms_consent: values.smsConsent,
          service: values.inquiryType,
          message: values.message,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('❌ Supabase error details:', {
          message: error.message,
          code: error.code,
          hint: error.hint,
          details: error.details
        });
        throw new Error(
          error.code === '42501' 
            ? 'Unable to send message. Please try again later while we fix this issue.'
            : 'An error occurred while sending your message. Please try again.'
        );
      }

      console.log('✅ Data successfully inserted');
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('❌ Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="relative rounded-[1.25rem] border-[0.75px] border-purple-500/30 p-2 md:rounded-[1.5rem] md:p-3 max-w-5xl mx-auto">
      <Card className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-black p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
        <CardHeader className="max-w-4xl mx-auto w-full">
          <CardTitle className="text-white font-mono">
            Let's Work Together
          </CardTitle>
          <CardDescription className="text-white/60">
            Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-w-4xl mx-auto w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-mono">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        {...field} 
                        className="bg-black border-purple-500/30 text-white placeholder:text-white/30 focus-visible:ring-purple-500/50 focus-visible:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-mono">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your.email@example.com" 
                        type="email" 
                        {...field} 
                        className="bg-black border-purple-500/30 text-white placeholder:text-white/30 focus-visible:ring-purple-500/50 focus-visible:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-mono">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="555 123 4567 (optional)" 
                        type="tel" 
                        {...field} 
                        className="bg-black border-purple-500/30 text-white placeholder:text-white/30 focus-visible:ring-purple-500/50 focus-visible:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smsConsent"
                render={({ field }) => (
                  <FormItem className={`space-y-2 ${!form.watch('phone') ? 'hidden' : ''}`}>
                    <div className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox
                          id="smsConsent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-purple-500/30 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                        />
                      </FormControl>
                      <FormLabel 
                        htmlFor="smsConsent"
                        className="text-xs text-white/60 leading-relaxed cursor-pointer"
                      >
                        I agree to receive SMS messages related to my inquiry and services. Message & data rates may apply. See our{" "}
                        <button
                          type="button"
                          onClick={() => setSmsTermsOpen(true)}
                          className="text-purple-400 hover:text-purple-300 underline"
                        >
                          SMS Terms
                        </button>
                        {" "}and{" "}
                        <button
                          type="button"
                          onClick={() => setPrivacyPolicyOpen(true)}
                          className="text-purple-400 hover:text-purple-300 underline"
                        >
                          Privacy Policy
                        </button>
                        .
                      </FormLabel>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inquiryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-mono">
                      What can I help you with?
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-black border-purple-500/30 text-white focus:ring-purple-500/50 focus:border-purple-500">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-black border-purple-500/30">
                        <SelectItem value="project-collaboration">Project collaboration</SelectItem>
                        <SelectItem value="hiring-inquiry">Hiring inquiry</SelectItem>
                        <SelectItem value="ai-solutions">AI Business Consulting</SelectItem>
                        <SelectItem value="just-saying-hi">Just saying hi</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-mono">
                      Tell me a bit more
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message" 
                        {...field} 
                        className="bg-black border-purple-500/30 text-white placeholder:text-white/30 min-h-[150px] focus-visible:ring-purple-500/50 focus-visible:border-purple-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <InteractiveHoverButton 
                  type="submit"
                  text={isSubmitting ? 'Sending...' : 'Send Message'}
                  disabled={isSubmitting}
                  className="w-full bg-purple-500 text-white hover:text-white border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {submitStatus === 'success' && (
                  <p className="text-green-400 text-center">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center">Failed to send message. Please try again.</p>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      </div>

      {/* SMS Terms Modal */}
      <Dialog open={smsTermsOpen} onOpenChange={setSmsTermsOpen}>
        <DialogContent 
          className="bg-black border-purple-500/30 text-white max-w-2xl max-h-[80vh] overflow-y-auto"
          aria-modal="true"
          role="dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-white font-mono text-xl">
              SMS Terms & Conditions
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-white/80 text-sm leading-relaxed">
            <p>
              By opting in to receive SMS messages from Ruben Valderrama, you agree to the following:
            </p>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Message Frequency</h3>
              <p>
                You may receive occasional messages related to your inquiries, updates, or relevant service information. Frequency varies and will not exceed reasonable limits.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Opt‑In</h3>
              <p>
                You can opt in via our website form or by providing your phone number and consent directly to us.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Opt‑Out</h3>
              <p>
                You can opt out at any time by replying STOP to any message. Reply HELP for help. You may also contact us to be removed.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Message & Data Rates</h3>
              <p>
                Message and data rates may apply based on your mobile plan.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-2">Privacy</h3>
              <p>
                Your information will be handled according to our Privacy Policy and will not be sold or shared with third parties.
              </p>
            </div>
            
            <p>
              For questions, contact us at [your email] or [your phone number].
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={privacyPolicyOpen} onOpenChange={setPrivacyPolicyOpen}>
        <DialogContent 
          className="bg-black border-purple-500/30 text-white max-w-2xl max-h-[80vh] overflow-y-auto"
          aria-modal="true"
          role="dialog"
        >
          <DialogHeader>
            <DialogTitle className="text-white font-mono text-xl">
              Privacy Policy
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-white/80 text-sm leading-relaxed">
            <p>
              We respect your privacy. When you provide your phone number, email, or other contact details, we use this information solely to communicate with you regarding your inquiries, updates, and services.
            </p>
            <p>
              We do not sell, rent, or share your personal information with third parties.
            </p>
            <p>
              You may opt out of SMS messages at any time by replying STOP.
            </p>
            <p>
              For privacy questions, contact us at [your email] or [your phone number].
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}