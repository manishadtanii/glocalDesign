import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import contactBg from '/images/contactbg.jpg';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const sectionRef = useRef(null);
  const formBoxRef = useRef(null);
  const labelRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- Form State ---
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    description: '',
    hp_field: '', // Honey pot field
  });
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

  // --- Validation Logic ---
  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) return "This field is required";

    switch (name) {
      case 'phone':
        if (!/^[0-9]{10}$/.test(value)) error = "Enter a valid 10-digit number";
        break;
      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const forbiddenKeywords = ['exahut', 'mailinator', 'yopmail', 'temp', 'disposable', 'dropmail', 'tmail', 'guerrilla'];
        const domain = value.toLowerCase().split('@')[1] || "";
        
        if (!emailRegex.test(value)) {
          error = "Invalid email format";
        } else if (forbiddenKeywords.some(keyword => domain.includes(keyword))) {
          error = "Temporary/Fake emails not allowed";
        }
        break;
      case 'description':
        if (value.length < 10) error = "Min 10 characters required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.hp_field) return; // Silent block for bots

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'hp_field') {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSending(true);

    const SERVICE_ID = "service_5ukbpwr";
    const TEMPLATE_ID = "template_6vphkp9";
    const PUBLIC_KEY = "iaQXY9VcI_ev3jcNL";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        window.location.href = "https://glocaldesign.in/thank-you/";
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setErrors({ submit: "Failed to send. Please try again." });
        setIsSending(false);
      });
  };

  // --- Responsiveness & GSAP ---
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !formBoxRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=80%', 
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: [0, 0.5, 1],
            duration: 0.4,
            ease: 'power1.inOut',
            delay: 0,
          },
        },
      });

      gsap.set(formBoxRef.current, {
        width: '4px', height: '0%', opacity: 0,
        clipPath: 'ellipse(200% 200% at 50% 50%)', borderRadius: '2px',
      });

      const formContents = formBoxRef.current.children;
      gsap.set(formContents, { opacity: 0 });

      tl.to(formBoxRef.current, { height: '80vh', opacity: 1, ease: 'none', duration: 0.5 })
        .to(labelRef.current, { y: '80vh', opacity: 1, ease: 'none', duration: 0.5 }, 0)
        .to(labelRef.current, { opacity: 0, duration: 0.1 })
        .to(formBoxRef.current, { 
          width: '90%', maxWidth: '1000px', borderRadius: '0px', 
          clipPath: 'ellipse(150% 150% at 50% 50%)', ease: 'power2.inOut', duration: 0.4 
        })
        .to(formBoxRef.current, { clipPath: 'ellipse(200% 200% at 50% 50%)', duration: 0.1 }, '-=0.1')
        .to(formContents, { opacity: 1, duration: 0.2, ease: 'power1.out' }, '-=0.2');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="contact-form-section" style={sectionStyle}>
      <div style={noiseOverlayStyle} />

      <div ref={formBoxRef} style={formBoxStyle}>
        <h2 style={{ ...headingStyle, fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.3rem)' : 'clamp(2.5rem, 4vw, 3rem)' }}>
          Design The Home You've <br /> Always Imagined
        </h2>

        <form style={{ ...formGridStyle, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }} onSubmit={handleSubmit}>
          {/* Honey Pot */}
          <input type="text" name="hp_field" value={formData.hp_field} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

          <div style={inputWrapperStyle}>
            <input name="name" type="text" placeholder="Name*" value={formData.name} onChange={handleChange} style={inputStyle(errors.name)} />
            {errors.name && <span style={errorLabelStyle}>{errors.name}</span>}
          </div>
          <div style={inputWrapperStyle}>
            <input name="phone" type="tel" placeholder="Phone No.*" value={formData.phone} onChange={handleChange} style={inputStyle(errors.phone)} />
            {errors.phone && <span style={errorLabelStyle}>{errors.phone}</span>}
          </div>
          <div style={inputWrapperStyle}>
            <input name="email" type="email" placeholder="Email*" value={formData.email} onChange={handleChange} style={inputStyle(errors.email)} />
            {errors.email && <span style={errorLabelStyle}>{errors.email}</span>}
          </div>
          <div style={inputWrapperStyle}>
            <input name="city" type="text" placeholder="City*" value={formData.city} onChange={handleChange} style={inputStyle(errors.city)} />
            {errors.city && <span style={errorLabelStyle}>{errors.city}</span>}
          </div>

          <div style={{ ...inputWrapperStyle, gridColumn: isMobile ? 'auto' : '1 / -1', marginTop: '1rem' }}>
            <input name="description" type="text" placeholder="Description*" value={formData.description} onChange={handleChange} style={inputStyle(errors.description)} />
            {errors.description && <span style={errorLabelStyle}>{errors.description}</span>}
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem' }}>
            {errors.submit && <p style={{ color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '8px' }}>{errors.submit}</p>}
            <button type="submit" disabled={isSending} style={submitBtnStyle}>
              {isSending ? 'Sending...' : 'Submit'}
              <div style={underlineStyle} />
            </button>
          </div>
        </form>
      </div>

      <div ref={labelRef} style={labelContainerStyle}>
        <span style={labelTextStyle}>Scroll to explore</span>
        <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.6)' }} />
      </div>
    </section>
  );
};

// --- Static Styles ---
const sectionStyle = { position: 'relative', width: '100%', height: '100vh', backgroundImage: `url(${contactBg})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh', overflow: 'hidden', zIndex: 10 };
const noiseOverlayStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.35, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter=\`url(%23noiseFilter)\`/%3E%3C/svg%3E")`, mixBlendMode: 'overlay', zIndex: 1 };
const formBoxStyle = { backgroundColor: '#ffffff', boxShadow: '0 0 50px rgba(0,0,0,0.3)', marginTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', willChange: 'width, height, clip-path', overflow: 'hidden' };
const headingStyle = { fontFamily: "'Lacroom', serif", fontWeight: 400, color: '#2b2b2b', lineHeight: 1.1, textAlign: 'center', marginBottom: '2rem' };
const formGridStyle = { width: '100%', maxWidth: '600px', display: 'grid', gap: '1.5rem 3rem' };
const inputWrapperStyle = { position: 'relative', width: '100%' };
const inputStyle = (hasError) => ({ width: '100%', border: 'none', borderBottom: hasError ? '1px solid #ff4d4d' : '1px solid #dcdcdc', padding: '0.8rem 0', fontFamily: "'Urbanist', sans-serif", fontSize: '1rem', color: '#2b2b2b', backgroundColor: 'transparent', outline: 'none', transition: 'border-color 0.3s' });
const errorLabelStyle = { position: 'absolute', bottom: '-16px', left: 0, fontSize: '0.65rem', color: '#ff4d4d', fontWeight: 500 };
const submitBtnStyle = { background: 'transparent', border: 'none', fontFamily: "'Urbanist', sans-serif", fontSize: '1.05rem', color: '#2b2b2b', cursor: 'pointer', position: 'relative', textTransform: 'capitalize', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' };
const underlineStyle = { height: '1px', width: '100%', backgroundColor: '#2b2b2b', marginTop: '4px', transition: 'transform 0.3s ease', transformOrigin: 'left' };
const labelContainerStyle = { position: 'absolute', top: '10vh', left: '50%', transform: 'translateX(-50%)', opacity: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px', zIndex: 20 };
const labelTextStyle = { fontFamily: "'Urbanist', sans-serif", fontSize: '0.7rem', color: '#ffffff', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, whiteSpace: 'nowrap' };

export default ContactForm;


// /**
//  * ContactForm Component
//  * "Zip Open & Curvy Paper Unfold" Animation
//  * Scroll 10vh-60vh: A thin white vertical line (zip) grows downwards.
//  * Scroll 60vh-100vh: The line expands horizontally with a curvy (ellipse) clip-path, smoothing out into the full rectangular form.
//  */

// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const ContactForm = () => {
//   const sectionRef = useRef(null);
//   const formBoxRef = useRef(null);
//   const labelRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const updateMobile = () => setIsMobile(window.innerWidth < 768);
//     updateMobile();
//     window.addEventListener('resize', updateMobile);
//     return () => window.removeEventListener('resize', updateMobile);
//   }, []);

//   useEffect(() => {
//     if (!sectionRef.current || !formBoxRef.current) return;

//     const ctx = gsap.context(() => {
//       // Create a master timeline for the whole pinned sequence
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: 'top top',
//           end: '+=80%', // Reduced drastically so it finishes much faster
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//           snap: {
//             snapTo: [0, 0.5, 1], // Exactly hitting the vertical step (0.5), then the horizontal step (1.0)
//             duration: 0.4,
//             ease: 'power1.inOut',
//             delay: 0,
//           },
//         },
//       });

//       // Phase 1: The "Zip" Opening (Thin vertical line grows from 10vh gap)
//       // Initial state: 2px wide, 0% height, opacity 0 so no line is visible initially
//       gsap.set(formBoxRef.current, {
//         width: '4px',
//         height: '0%',
//         opacity: 0,
//         clipPath: 'ellipse(200% 200% at 50% 50%)',
//         borderRadius: '2px',
//       });

//       // Hide actual form contents during zip phase
//       const formContents = formBoxRef.current.children;
//       gsap.set(formContents, { opacity: 0 });

//       // Animate zip down (height grows, quickly fades in so it doesn't appear before scrolling)
//       tl.to(formBoxRef.current, {
//         height: '80vh',   // 10vh top gap + 80vh form + 10vh bottom gap = 100vh
//         opacity: 1,
//         ease: 'none',
//         duration: 0.5,
//       })
//         // Sync label: it moves down with the zip tip
//         .to(labelRef.current, {
//           y: '80vh',
//           opacity: 1,
//           ease: 'none',
//           duration: 0.5,
//         }, 0) // start at same time as zip height growth

//         // Phase 2: "Curvy Paper Spread" (Expands horizontally)
//         // Fade out label as we start spreading
//         .to(labelRef.current, {
//           opacity: 0,
//           duration: 0.1,
//         })
//         .to(formBoxRef.current, {
//           width: '90%',          // Target final width
//           maxWidth: '1000px',
//           borderRadius: '0px',
//           clipPath: 'ellipse(150% 150% at 50% 50%)', // start curvy expand
//           ease: 'power2.inOut',
//           duration: 0.4,
//         })
//         // Smooth out the curve into a full rectangle
//         .to(formBoxRef.current, {
//           clipPath: 'ellipse(200% 200% at 50% 50%)', // effectively a rectangle
//           duration: 0.1,
//         }, '-=0.1')
//         // Fade in the form contents right as the paper finishes spreading
//         .to(formContents, {
//           opacity: 1,
//           duration: 0.2,
//           ease: 'power1.out',
//         }, '-=0.2');

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       id="contact"
//       className="contact-form-section"
//       style={{
//         position: 'relative',
//         width: '100%',
//         height: '100vh',
//         backgroundImage: 'url(/images/contactbg.jpg)',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'flex-start',
//         justifyContent: 'center',
//         paddingTop: '10vh',
//         overflow: 'hidden',
//         zIndex: 10,
//       }}
//     >
//       {/* ── Noise Overlay ── */}
//       <div
//         style={{
//           position: 'absolute',
//           inset: 0,
//           width: '100%',
//           height: '100%',
//           opacity: 0.35, // Adjust for visibility on the dark red
//           pointerEvents: 'none',
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//           mixBlendMode: 'overlay', // Enhances the texture feel
//           zIndex: 1,
//         }}
//       />

//       {/* ── White Form Envelope ── */}
//       <div
//         ref={formBoxRef}
//         style={{
//           backgroundColor: '#ffffff',
//           boxShadow: '0 0 50px rgba(0,0,0,0.3)',
//           marginTop: '0',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '2rem 2rem', // reduced base padding to fit everything cleanly
//           willChange: 'width, height, clip-path',
//           overflow: 'hidden', // hides contents if clip-path or width is small
//         }}
//       >
//         {/* ── Heading ── */}
//         <h2
//           style={{
//             fontFamily: "'Lacroom', serif",
//             fontWeight: 400,
//             fontSize: isMobile ? 'clamp(1.8rem, 5vw, 2.3rem)' : 'clamp(2.5rem, 4vw, 3rem)',
//             color: '#2b2b2b',
//             lineHeight: 1.1,
//             textAlign: 'center',
//             marginBottom: '2rem', // reduced to ensure it fits in 80vh
//           }}
//         >
//           Design The Home You've
//           <br />
//           Always Imagined
//         </h2>

//         {/* ── The Form ── */}
//         <form
//           style={{
//             width: '100%',
//             maxWidth: '600px',
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: '1.5rem 3rem', // reduced vertical gap slightly
//           }}
//           onSubmit={(e) => e.preventDefault()}
//         >
//           {/* Inputs Row 1 */}
//           <div style={inputWrapperStyle}>
//             <input type="text" placeholder="Name*" required style={inputStyle} />
//           </div>
//           <div style={inputWrapperStyle}>
//             <input type="tel" placeholder="Phone No.*" required style={inputStyle} />
//           </div>

//           {/* Inputs Row 2 */}
//           <div style={inputWrapperStyle}>
//             <input type="email" placeholder="Email*" required style={inputStyle} />
//           </div>
//           <div style={inputWrapperStyle}>
//             <input type="text" placeholder="City*" required style={inputStyle} />
//           </div>

//           {/* Description Row (Full Width) */}
//           <div style={{ ...inputWrapperStyle, gridColumn: '1 / -1', marginTop: '1rem' }}>
//             <input type="text" placeholder="Description*" required style={inputStyle} />
//           </div>

//           {/* Submit Button (Centered Full Width) */}
//           <div
//             style={{
//               gridColumn: '1 / -1',
//               display: 'flex',
//               justifyContent: 'center',
//               marginTop: '1rem', // reduced margin top
//             }}
//           >
//             <button
//               type="submit"
//               className="group"
//               style={{
//                 background: 'transparent',
//                 border: 'none',
//                 fontFamily: "'Urbanist', sans-serif",
//                 fontSize: '1.05rem',
//                 color: '#2b2b2b',
//                 cursor: 'pointer',
//                 position: 'relative',
//                 textTransform: 'capitalize',
//                 display: 'inline-flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//               }}
//             >
//               Submit
//               {/* Thin underline logic matching screenshot */}
//               <div
//                 style={{
//                   height: '1px',
//                   width: '100%',
//                   backgroundColor: '#2b2b2b',
//                   marginTop: '4px',
//                   transition: 'transform 0.3s ease',
//                   transformOrigin: 'left',
//                 }}
//                 className="group-hover:scale-x-0 group-hover:origin-right"
//               />
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* ── Interactive Zip Label ── */}
//       <div
//         ref={labelRef}
//         style={{
//           position: 'absolute',
//           top: '10vh', // same as padding top
//           left: '50%',
//           transform: 'translateX(-50%)',
//           opacity: 0,
//           pointerEvents: 'none',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           gap: '25px', // Increased gap for more padding feel
//           zIndex: 20,
//         }}
//       >
//         <span
//           style={{
//             fontFamily: "'Urbanist', sans-serif",
//             fontSize: '0.7rem',
//             color: '#ffffff',
//             letterSpacing: '0.25em', // slightly more letter spacing
//             textTransform: 'uppercase',
//             fontWeight: 600,
//             whiteSpace: 'nowrap',
//           }}
//         >
//           Scroll to explore
//         </span>
//         {/* Vertical thin line segment at the tip - prominent */}
//         <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.6)' }} />
//       </div>
//     </section>
//   );
// };

// // Reusable styling for form inputs to match the minimalist line design
// const inputWrapperStyle = {
//   position: 'relative',
//   width: '100%',
// };

// const inputStyle = {
//   width: '100%',
//   border: 'none',
//   borderBottom: '1px solid #dcdcdc',
//   padding: '0.8rem 0',
//   fontFamily: "'Urbanist', sans-serif",
//   fontSize: '1rem',
//   color: '#2b2b2b',
//   backgroundColor: 'transparent',
//   outline: 'none',
//   transition: 'border-color 0.3s',
// };

// // Inject global styles for placeholders
// const globalStyles = `
//   input::placeholder {
//     color: #a9a9a9;
//     font-weight: 300;
//   }
//   input:focus {
//     border-bottom: 1px solid #2b2b2b !important;
//   }
// `;

// // Insert the styling
// if (typeof document !== 'undefined') {
//   const styleEl = document.createElement('style');
//   styleEl.innerHTML = globalStyles;
//   document.head.appendChild(styleEl);
// }

// export default ContactForm;