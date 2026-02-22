function FAQSection({ items }) {
  return (
    <section className="faq-section" aria-label="Frequently asked questions">
      <h2>FAQ</h2>
      <div className="faq-list">
        {items.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
