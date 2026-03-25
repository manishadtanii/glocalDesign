import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const sectionRef = useRef(null);
  const formBoxRef = useRef(null);
  const labelRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    description: '',
    hp_field: '', // Honey pot (spam protection)
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);

 /*  // --- Real-time Validation Logic ---
  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = "This field is required";
    } else if (name === 'phone' && !/^[0-9]{10}$/.test(value)) {
      error = "Enter a valid 10-digit number";
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const tempDomains = ['mailinator.com', 'yopmail.com', 'tempmail.com', '10minutemail.com'];
      const domain = value.split('@')[1]?.toLowerCase();
      
      if (!emailRegex.test(value)) {
        error = "Invalid email format";
      } else if (tempDomains.includes(domain)) {
        error = "Temporary emails not allowed";
      }
    }
    return error;
  }; */
  const validateField = (name, value) => {
  let error = "";

  // 1. Check if the field is empty (Required for all fields)
  if (!value.trim()) {
    return "This field is required";
  }

  // 2. Specific Validation by Field Name
  switch (name) {
    case 'phone':
      // Must be exactly 10 digits
      if (!/^[0-9]{10}$/.test(value)) {
        error = "Enter a valid 10-digit number";
      }
      break;

    case 'email':
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const lowerValue = value.toLowerCase();
      
      // List of keywords found in temp/fake mail domains (like exahut, tempmail, etc.)
      const forbiddenKeywords = [
        'exahut', 'mailinator', 'yopmail', 'temp', 'disposable', 
        'dropmail', 'tmail', 'guerrilla', 'sharklasers', '10minutemail',
        'getnada', 'dispostable', 'exatest'
      ];

      const domain = lowerValue.split('@')[1] || "";

      if (!emailRegex.test(lowerValue)) {
        error = "Invalid email format";
      } else if (forbiddenKeywords.some(keyword => domain.includes(keyword))) {
        error = "Temporary/Fake emails are not allowed";
      } else if (domain.split('.').length < 2) {
        error = "Domain must be a valid provider (e.g. .com)";
      }
      break;

    case 'name':
      if (value.length < 2) {
        error = "Name is too short";
      }
      break;

    case 'city':
      if (value.length < 3) {
        error = "Please enter a valid city";
      }
      break;

    case 'description':
      if (value.length < 10) {
        error = "Please provide more details (min 10 chars)";
      }
      break;

    default:
      error = "";
  }

  return error;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Check Honey Pot
    if (formData.hp_field) return; 

    // 2. Final Validation Check
    const newErrors = {};
    Object.keys(formData).forEach(key => {
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

    emailjs.send("service_5ukbpwr", "template_6vphkp9", formData, "iaQXY9VcI_ev3jcNL")
      .then(() => {
        window.location.href = "https://glocaldesign.in/thank-you/";
      })
      .catch((err) => {
        console.error(err);
        setErrors({ submit: "Failed to send. Please try again." });
        setIsSending(false);
      });
  };

  // GSAP Animation (remains same)
  useEffect(() => {
    if (!sectionRef.current || !formBoxRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      gsap.set(formBoxRef.current, { width: '4px', height: '0%', opacity: 0, clipPath: 'ellipse(200% 200% at 50% 50%)' });
      const formContents = formBoxRef.current.children;
      gsap.set(formContents, { opacity: 0 });
      tl.to(formBoxRef.current, { height: '80vh', opacity: 1, ease: 'none', duration: 0.5 })
        .to(labelRef.current, { y: '80vh', opacity: 1, duration: 0.5 }, 0)
        .to(labelRef.current, { opacity: 0, duration: 0.1 })
        .to(formBoxRef.current, { width: '90%', maxWidth: '1000px', borderRadius: '0px', clipPath: 'ellipse(150% 150% at 50% 50%)', ease: 'power2.inOut', duration: 0.4 })
        .to(formBoxRef.current, { clipPath: 'ellipse(200% 200% at 50% 50%)', duration: 0.1 }, '-=0.1')
        .to(formContents, { opacity: 1, duration: 0.2 }, '-=0.2');
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={sectionStyle}>
      <div style={noiseOverlayStyle} />

      <div ref={formBoxRef} style={formBoxStyle}>
        <h2 style={headingStyle}>Design The Home You've <br /> Always Imagined</h2>

        <form ref={formRef} style={formGridStyle} onSubmit={handleSubmit}>
          {/* Honey Pot - Hidden from users */}
          <input type="text" name="hp_field" value={formData.hp_field} onChange={handleChange} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

          {/* Name */}
          <div style={inputWrapperStyle}>
            <input name="name" type="text" placeholder="Name*" value={formData.name} onChange={handleChange} style={inputStyle(errors.name)} />
            {errors.name && <span style={errorLabelStyle}>{errors.name}</span>}
          </div>

          {/* Phone */}
          <div style={inputWrapperStyle}>
            <input name="phone" type="tel" placeholder="Phone No.*" value={formData.phone} onChange={handleChange} style={inputStyle(errors.phone)} />
            {errors.phone && <span style={errorLabelStyle}>{errors.phone}</span>}
          </div>

          {/* Email */}
          <div style={inputWrapperStyle}>
            <input name="email" type="email" placeholder="Email*" value={formData.email} onChange={handleChange} style={inputStyle(errors.email)} />
            {errors.email && <span style={errorLabelStyle}>{errors.email}</span>}
          </div>

          {/* City */}
          <div style={inputWrapperStyle}>
            <input name="city" type="text" placeholder="City*" value={formData.city} onChange={handleChange} style={inputStyle(errors.city)} />
            {errors.city && <span style={errorLabelStyle}>{errors.city}</span>}
          </div>

          {/* Description */}
          <div style={{ ...inputWrapperStyle, gridColumn: '1 / -1', marginTop: '1rem' }}>
            <input name="description" type="text" placeholder="Description*" value={formData.description} onChange={handleChange} style={inputStyle(errors.description)} />
            {errors.description && <span style={errorLabelStyle}>{errors.description}</span>}
          </div>

          <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1rem' }}>
            {errors.submit && <p style={{ color: 'red', fontSize: '0.8rem', marginBottom: '10px' }}>{errors.submit}</p>}
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

// --- Styles ---
const inputStyle = (hasError) => ({
  width: '100%',
  border: 'none',
  borderBottom: hasError ? '1px solid #ff4d4d' : '1px solid #dcdcdc',
  padding: '0.8rem 0',
  fontFamily: "'Urbanist', sans-serif",
  fontSize: '1rem',
  backgroundColor: 'transparent',
  outline: 'none',
  transition: 'border-color 0.3s ease',
});

const errorLabelStyle = {
  position: 'absolute',
  bottom: '-18px',
  left: '0',
  color: '#ff4d4d',
  fontSize: '0.7rem',
  fontFamily: "'Urbanist', sans-serif",
};

// ... Reuse your previous sectionStyle, noiseOverlayStyle, formBoxStyle, headingStyle, formGridStyle, inputWrapperStyle, submitBtnStyle, underlineStyle, labelContainerStyle, labelTextStyle ...

// (Ensure those variables are defined below the component exactly as in previous steps)
const sectionStyle = { position: 'relative', width: '100%', height: '100vh', backgroundImage: 'url(/images/contactbg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh', overflow: 'hidden', zIndex: 10 };
const noiseOverlayStyle = { position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, mixBlendMode: 'overlay', zIndex: 1 };
const formBoxStyle = { backgroundColor: '#ffffff', boxShadow: '0 0 50px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', willChange: 'width, height, clip-path', overflow: 'hidden', zIndex: 2 };
const headingStyle = { fontFamily: "'Lacroom', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2b2b2b', textAlign: 'center', marginBottom: '2rem' };
const formGridStyle = { width: '100%', maxWidth: '600px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 3rem' };
const inputWrapperStyle = { position: 'relative', width: '100%' };
const submitBtnStyle = { background: 'transparent', border: 'none', fontFamily: "'Urbanist', sans-serif", fontSize: '1.05rem', cursor: 'pointer', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' };
const underlineStyle = { height: '1px', width: '100%', backgroundColor: '#2b2b2b', marginTop: '4px' };
const labelContainerStyle = { position: 'absolute', top: '10vh', left: '50%', transform: 'translateX(-50%)', opacity: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px', zIndex: 20 };
const labelTextStyle = { fontFamily: "'Urbanist', sans-serif", fontSize: '0.7rem', color: '#ffffff', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 };

export default ContactForm;