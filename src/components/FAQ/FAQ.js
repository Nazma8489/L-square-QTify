import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './FAQ.css';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    let cancelled = false;
    axios
      .get('https://qtify-backend.labs.crio.do/faq')
      .then((res) => {
        if (!cancelled) {
          setFaqs(Array.isArray(res.data) ? res.data : res.data.data);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="qtify-faq">
      <h2 className="qtify-section-title qtify-faq-title">FAQs</h2>
      {faqs.map((faq, index) => (
        <Accordion
          key={faq.id || index}
          className="qtify-faq-accordion"
          sx={{
            backgroundColor: '#181818',
            color: 'var(--color-white)',
            boxShadow: 'none',
            borderBottom: '1px solid #e0e0e0',
            '&::before': { display: 'none' }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'var(--color-primary)' }} />}
            className="qtify-faq-summary"
          >
            <p className="qtify-faq-question">{faq.question}</p>
          </AccordionSummary>
          <AccordionDetails>
            <p className="qtify-faq-answer">{faq.answer}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </section>
  );
};

export default FAQ;