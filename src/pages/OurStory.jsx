import React from 'react';
import styles from './OurStory.module.css';
import Navbar from '../components/Navbar';
import DoubleLine from '../UI/DoubleLine';
import Footer from '../components/FooterSection/Footer';
import SEO from '../components/SEO';
import founderPhotoFallback from '../assets/model.png';
import { onImgError } from '../utils/cloudinaryImages';

// TODO: replace with a real photo of Srishti — this is a placeholder
// reusing an existing marketing image until one is provided.
const founderPhoto = "https://res.cloudinary.com/dx2u1zlph/image/upload/v1783449804/image_353_jnfqib.png";

const OurStory = () => {
  return (
    <>
      <SEO
        title="Our Story"
        description="We are Meraya — a brand built around every version of you that existed, the one you're living today, and the one you're growing into tomorrow."
      />
      <Navbar />
      <DoubleLine />
      <div className={styles.container}>
        <div className={styles.backgroundText}>MERAYA</div>

        <div className={styles.content}>
          <h1 className={styles.mainTitle}>WE ARE MERAYA</h1>

          <div className={styles.photoWrap}>
            <img
              src={founderPhoto}
              onError={onImgError(founderPhotoFallback)}
              alt="Srishti, Founder of Meraya"
              className={styles.photo}
            />
          </div>

          <div className={styles.storyCard}>
            <p className={styles.greeting}>Hey guys, Srishti this side.</p>

            <p className={styles.paragraph}>
              I'm 21, and over the last few years, I've spent a lot of time travelling,
              meeting people from different walks of life, and listening to the stories
              that shape who they become. Somewhere between those journeys MERAYA was born.
            </p>

            <p className={styles.paragraph}>
              I didn't want to create just another clothing brand. I wanted to build
              something that feels personal, something that reminds us that we're all
              constantly becoming. Every phase of life, every risk, every heartbreak,
              every new beginning... they all become a part of our story.
            </p>

            <p className={styles.paragraph}>
              MERAYA is built around those stories. Around every version of you that
              existed, the one you're living today, and the one you're growing into
              tomorrow.
            </p>

            <p className={styles.paragraph}>
              Because clothes are more than what we wear—they carry memories,
              confidence, emotions, and moments we'll never forget.
            </p>

            <p className={styles.paragraph}>
              Thank you for being here and for becoming a part of this journey with us.
            </p>

            <p className={styles.tagline}>Wear the Story. MERAYA.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OurStory;
