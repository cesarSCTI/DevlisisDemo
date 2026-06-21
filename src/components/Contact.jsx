'use client';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Envelope, WhatsappLogo, MapPin } from '@phosphor-icons/react';
import styled from 'styled-components';

const Wrap = styled.section`
  padding: 7rem 2rem;
  background: var(--bg-raised);
`;

const Inner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const TextSide = styled.div``;

const SectionLabel = styled.span`
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.8rem;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 3.5vw, 2.8rem);
  font-weight: 900;
  letter-spacing: -0.8px;
  line-height: 1.15;
  color: var(--text-hi);
  margin-bottom: 1rem;
`;

const Sub = styled.p`
  color: var(--text-mid);
  font-size: 1rem;
  line-height: 1.75;
  margin-bottom: 2rem;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoRow = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.2rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.2s;

  @media (hover: hover) and (pointer: fine) {
    &:hover { border-color: rgba(79, 70, 229, 0.35); }
  }
`;

const InfoIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: var(--radius-sm);
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const InfoText = styled.div``;

const InfoLabel = styled.div`
  font-size: 0.7rem;
  color: var(--text-lo);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.1rem;
`;

const InfoVal = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-hi);
`;

const FormSide = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const InputLabel = styled.label`
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-mid);
`;

const inputBase = `
  padding: 0.78rem 1rem;
  background: var(--bg-surface);
  border-radius: var(--radius-sm);
  color: var(--text-hi);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s, background 0.2s;

  &::placeholder { color: var(--text-lo); }
`;

const Input = styled.input`
  ${inputBase}
  border: 1px solid ${({ $error }) => $error ? '#ef4444' : 'var(--border-strong)'};

  &:focus-visible {
    border-color: ${({ $error }) => $error ? '#ef4444' : 'var(--accent)'};
    background: ${({ $error }) => $error ? 'rgba(239,68,68,0.04)' : 'rgba(79,70,229,0.04)'};
  }
`;

const Textarea = styled.textarea`
  ${inputBase}
  border: 1px solid ${({ $error }) => $error ? '#ef4444' : 'var(--border-strong)'};
  min-height: 120px;
  resize: vertical;

  &:focus-visible {
    border-color: ${({ $error }) => $error ? '#ef4444' : 'var(--accent)'};
    background: ${({ $error }) => $error ? 'rgba(239,68,68,0.04)' : 'rgba(79,70,229,0.04)'};
  }
`;

const ErrorMsg = styled.span`
  font-size: 0.78rem;
  color: #dc2626;
  font-weight: 500;
`;

const Submit = styled.button`
  padding: 0.85rem;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 700;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  box-shadow: var(--shadow-accent);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--accent-dark);
      transform: translateY(-2px);
      box-shadow: var(--shadow-accent-lg);
    }
  }
  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
`;

const Success = styled.div`
  padding: 1rem;
  background: rgba(5, 150, 105, 0.08);
  border: 1px solid rgba(5, 150, 105, 0.25);
  border-radius: var(--radius-sm);
  color: #065f46;
  font-weight: 600;
  font-size: 0.95rem;
`;

const contactInfo = [
  {
    Icon: Envelope, label: 'Email', val: 'contacto@devlisis.com', href: 'mailto:contacto@devlisis.com',
    bg: 'rgba(79,70,229,0.1)', color: 'var(--accent)',
  },
  {
    Icon: WhatsappLogo, label: 'WhatsApp', val: '+1 (312) 847-2931', href: '#',
    bg: 'rgba(5,150,105,0.1)', color: '#059669',
  },
  {
    Icon: MapPin, label: 'Cobertura', val: 'Atendemos clientes en toda Latinoamérica', href: '#',
    bg: 'rgba(217,119,6,0.1)', color: '#d97706',
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const reduce = useReducedMotion();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre es requerido';
    if (!form.email.trim()) errs.email = 'El email es requerido';
    else if (!EMAIL_RE.test(form.email)) errs.email = 'Ingresa un email válido';
    if (!form.subject.trim()) errs.subject = 'El asunto es requerido';
    if (!form.message.trim()) errs.message = 'El mensaje es requerido';
    return errs;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1400);
  };

  const ent = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <Wrap id="contacto">
      <Inner>
        <TextSide>
          <motion.div {...ent(0)}>
            <SectionLabel>Hablemos de tu negocio</SectionLabel>
            <Title>¿Listo para dar el siguiente paso?</Title>
            <Sub>
              Cuéntanos qué necesitas y en menos de 24 horas tendrás
              una propuesta personalizada. Sin compromiso y sin costo.
            </Sub>
          </motion.div>

          <motion.div {...ent(0.08)}>
            <InfoList>
              {contactInfo.map(({ Icon, label, val, href, bg, color }) => (
                <InfoRow key={label} href={href}>
                  <InfoIcon $bg={bg} $color={color}>
                    <Icon size={18} weight="duotone" />
                  </InfoIcon>
                  <InfoText>
                    <InfoLabel>{label}</InfoLabel>
                    <InfoVal>{val}</InfoVal>
                  </InfoText>
                </InfoRow>
              ))}
            </InfoList>
          </motion.div>
        </TextSide>

        <motion.div {...ent(0.12)}>
          <FormSide>
            <Form onSubmit={onSubmit} noValidate>
              <Row>
                <Field>
                  <InputLabel htmlFor="name">Nombre</InputLabel>
                  <Input id="name" type="text" placeholder="Tu nombre" value={form.name}
                    $error={!!errors.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
                </Field>
                <Field>
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <Input id="email" type="email" placeholder="tu@email.com" value={form.email}
                    $error={!!errors.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                  {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
                </Field>
              </Row>
              <Field>
                <InputLabel htmlFor="subject">Asunto</InputLabel>
                <Input id="subject" type="text" placeholder="¿En qué podemos ayudarte?" value={form.subject}
                  $error={!!errors.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })} />
                {errors.subject && <ErrorMsg>{errors.subject}</ErrorMsg>}
              </Field>
              <Field>
                <InputLabel htmlFor="message">Mensaje</InputLabel>
                <Textarea id="message" placeholder="Cuéntanos sobre tu negocio y qué quieres lograr..." value={form.message}
                  $error={!!errors.message}
                  onChange={e => setForm({ ...form, message: e.target.value })} />
                {errors.message && <ErrorMsg>{errors.message}</ErrorMsg>}
              </Field>
              {sent
                ? <Success>Mensaje enviado. Te contactaré en breve.</Success>
                : <Submit type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Quiero empezar mi proyecto'}
                  </Submit>
              }
            </Form>
          </FormSide>
        </motion.div>
      </Inner>
    </Wrap>
  );
}
