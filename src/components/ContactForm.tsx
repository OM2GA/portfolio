import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle,
  Send,
  Sparkles,
  Mail,
  User,
  MessageSquare,
  Info,
} from 'lucide-react';
import Button from './Button';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Check if API key is set. In Vite, environment variables must start with VITE_
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const isDemoMode =
    !accessKey || accessKey.trim() === '' || accessKey.trim() === 'your_access_key_here';

  // Form validation rules (computed on the fly)
  const errors = {
    name: '',
    email: '',
    message: '',
  };

  if (touched.name) {
    if (!formData.name.trim()) {
      errors.name = 'Le nom est requis.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Le nom doit contenir au moins 2 caractères.';
    }
  }

  if (touched.email) {
    if (!formData.email.trim()) {
      errors.email = "L'adresse email est requise.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "L'adresse email n'est pas valide.";
    }
  }

  if (touched.message) {
    if (!formData.message.trim()) {
      errors.message = 'Le message est requis.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères.';
    }
  }

  // Check if form is globally valid (requires all fields filled and no errors)
  const isFormValid =
    formData.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.message.trim().length >= 10;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to trigger any missing validation messages
    setTouched({
      name: true,
      email: true,
      message: true,
    });

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    if (isDemoMode) {
      // Mock API call in demo mode
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTouched({ name: false, email: false, message: false });
      }, 1500);
    } else {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Nouveau message de ${formData.name} via Portfolio MMI`,
            from_name: 'Portfolio Contact Form',
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          setTouched({ name: false, email: false, message: false });
        } else {
          throw new Error(
            result.message || "Une erreur est survenue lors de l'envoi de votre message."
          );
        }
      } catch (err: unknown) {
        setIsSubmitting(false);
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Une erreur réseau est survenue. Veuillez vérifier votre connexion et réessayer.';
        setSubmitError(errorMessage);
      }
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
  };

  if (isSubmitted) {
    return (
      <div className="contact-success-card liquid-glass" role="alert" aria-live="polite">
        <div className="success-icon-container">
          <div className="success-pulse-ring" />
          <CheckCircle size={48} className="success-icon" />
        </div>
        <h3 className="success-title">Message envoyé !</h3>
        <p className="success-description">
          Merci pour votre message. J'ai bien reçu vos coordonnées et je vous répondrai dans les
          plus brefs délais pour échanger sur vos projets.
        </p>
        <Button variant="secondary" onClick={handleReset} leftIcon={<Sparkles size={18} />}>
          Renvoyer un message
        </Button>
      </div>
    );
  }

  if (submitError) {
    return (
      <div className="contact-error-card liquid-glass" role="alert" aria-live="polite">
        <div className="error-icon-container">
          <div className="error-pulse-ring" />
          <AlertCircle size={48} className="error-icon" />
        </div>
        <h3 className="error-title">Erreur d'envoi !</h3>
        <p className="error-description">{submitError}</p>
        <Button variant="secondary" onClick={handleReset} leftIcon={<AlertCircle size={18} />}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="contact-form-card liquid-glass">
      {isDemoMode && (
        <div className="demo-warning-banner">
          <Info size={18} className="demo-banner-icon" />
          <div className="demo-banner-content">
            <h4 className="demo-banner-title">Mode Démo Actif</h4>
            <p className="demo-banner-text">
              L'envoi est simulé. Pour recevoir de vrais e-mails, configurez votre clé Web3Forms
              gratuite dans le fichier <code>.env</code>.
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate className="contact-interactive-form">
        {/* FIELD: NAME */}
        <div
          className={`form-group ${touched.name ? (errors.name ? 'has-error' : 'is-valid') : ''}`}
        >
          <label htmlFor="name">
            <User size={14} className="label-icon" />
            Nom complet
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              placeholder="Ex: Jean Dupont"
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              disabled={isSubmitting}
            />
            {touched.name && !errors.name && formData.name && (
              <CheckCircle size={16} className="feedback-icon feedback-valid" />
            )}
            {touched.name && errors.name && (
              <AlertCircle size={16} className="feedback-icon feedback-invalid" />
            )}
          </div>
          {touched.name && errors.name && (
            <p className="error-message" id="name-error">
              {errors.name}
            </p>
          )}
        </div>

        {/* FIELD: EMAIL */}
        <div
          className={`form-group ${touched.email ? (errors.email ? 'has-error' : 'is-valid') : ''}`}
        >
          <label htmlFor="email">
            <Mail size={14} className="label-icon" />
            Adresse email
          </label>
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              placeholder="Ex: jean.dupont@email.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={isSubmitting}
            />
            {touched.email && !errors.email && formData.email && (
              <CheckCircle size={16} className="feedback-icon feedback-valid" />
            )}
            {touched.email && errors.email && (
              <AlertCircle size={16} className="feedback-icon feedback-invalid" />
            )}
          </div>
          {touched.email && errors.email && (
            <p className="error-message" id="email-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* FIELD: MESSAGE */}
        <div
          className={`form-group ${touched.message ? (errors.message ? 'has-error' : 'is-valid') : ''}`}
        >
          <label htmlFor="message">
            <MessageSquare size={14} className="label-icon" />
            Message
          </label>
          <div className="input-wrapper">
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={() => handleBlur('message')}
              rows={5}
              placeholder="Détaillez votre projet, vos besoins ou vos questions ici..."
              required
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
              disabled={isSubmitting}
            />
            {touched.message && !errors.message && formData.message && (
              <CheckCircle size={16} className="feedback-icon feedback-valid textarea-icon" />
            )}
            {touched.message && errors.message && (
              <AlertCircle size={16} className="feedback-icon feedback-invalid textarea-icon" />
            )}
          </div>
          {touched.message && errors.message && (
            <p className="error-message" id="message-error">
              {errors.message}
            </p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          type="submit"
          variant="glow"
          loading={isSubmitting}
          rightIcon={<Send size={18} />}
          className="submit-button"
        >
          Envoyer le message
        </Button>
      </form>
    </div>
  );
}
