import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import styles from '../theme/css/NewsletterSignup.module.css';


const NewsletterSignup = ({
  title,
  subtitle,
  categories,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      email,
      name,
      selectedCategories,
    });
    // Reset form
    setEmail('');
    setName('');
    setSelectedCategories([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bgPattern}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.input}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.preferences}>
            <h4 className={styles.preferencesTitle}>Select Your Interests</h4>
            <div className={styles.checkboxGroup}>
              {categories.map((category) => (
                <label key={category.id} className={styles.checkboxItem}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <span className={styles.checkboxLabel}>{category.label}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Subscribe Now <Mail size={16} className={styles.buttonIcon} />
          </button>
          <p className={styles.note}>
            By subscribing, you agree to our Privacy Policy and consent to receive
            updates from our company.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;