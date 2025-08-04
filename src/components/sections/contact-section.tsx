import { useLanguage } from "@/components/language-context";

export const ContactSection = () => {
  const { messages } = useLanguage();

  return (
    <section id="contact" className="section_contact">
      <div className="section_title">
        <h3>{messages.contact.title}</h3>
      </div>
      <form className="contact_form" action="/" method="post" data-email="frenifyteam@gmail.com">
        <div
          className="success"
          data-success="Your message has been received, we will contact you soon."
        ></div>
        <div className="empty_notice">
          <span>Please Fill Required Fields!</span>
        </div>
        <div className="items_wrap">
          <div className="items">
            <div className="item half">
              <div className="input_wrapper">
                <input id="name" type="text" placeholder={`${messages.contact.name} *`} />
              </div>
            </div>
            <div className="item half">
              <div className="input_wrapper">
                <input id="email" type="email" placeholder={`${messages.contact.email} *`} />
              </div>
            </div>
            <div className="item">
              <div className="input_wrapper">
                <input id="phone" type="text" placeholder="Phone" />
              </div>
            </div>
            <div className="item">
              <div className="input_wrapper">
                <textarea id="message" placeholder={messages.contact.message}></textarea>
              </div>
            </div>
            <div className="item">
              <a id="send_message" href="#">
                {messages.contact.send}
              </a>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
