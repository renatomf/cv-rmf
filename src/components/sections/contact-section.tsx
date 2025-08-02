export const ContactSection = () => {
  return (
    <section id="contact" className="section_contact">
      <div className="section_title">
        <h3>Contact Me</h3>
      </div>
      <form
        className="contact_form"
        action="/"
        method="post"
        data-email="frenifyteam@gmail.com"
      >
        Dont remove below code in avoid to work contact form properly. You can
        chance dat-success value with your one. It will be used when user will
        try to contact via contact form and will get success message.
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
                <input id="name" type="text" placeholder="Name *" />
              </div>
            </div>
            <div className="item half">
              <div className="input_wrapper">
                <input id="email" type="email" placeholder="Email *" />
              </div>
            </div>
            <div className="item">
              <div className="input_wrapper">
                <input id="phone" type="text" placeholder="Phone" />
              </div>
            </div>
            <div className="item">
              <div className="input_wrapper">
                <textarea id="message" placeholder="Message"></textarea>
              </div>
            </div>
            <div className="item">
              <a id="send_message" href="#">
                Send Message
              </a>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};
