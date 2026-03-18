import { useContactForm } from './hooks/useContactForm';
import { ContactForm } from './components/ContactForm';
import { ContactSuccess } from './components/ContactSuccess';
import { CodePreview } from './components/CodePreview';
import { ContactSidebar } from './components/ContactSidebar';

export function ContactPage() {
  const { formData, formStatus, formErrors, handleChange, handleSubmit, handleNewMessage } =
    useContactForm();

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col lg:flex-row">
      <div className="hidden lg:block">
        <ContactSidebar />
      </div>

      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="w-full lg:w-[clamp(400px,45vw,632px)] lg:border-r border-[#314158] flex items-center justify-center px-6 sm:px-10 py-16 lg:py-32">
          {formStatus === 'success' ? (
            <ContactSuccess onNewMessage={handleNewMessage} />
          ) : (
            <ContactForm
              formData={formData}
              formErrors={formErrors}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        <div className="hidden lg:block flex-1">
          <CodePreview formData={formData} currentDate={currentDate} />
        </div>
      </main>
    </div>
  );
}
