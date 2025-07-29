import React from "react";
import styles from './CollegeEditionSection.module.css';
import prod1 from '../../assets/prod1.png';
import prod2 from '../../assets/prod2.png';
import prod3 from '../../assets/prod3.png';
import prod4 from '../../assets/prod4.png';
import prod5 from '../../assets/prod5.png';

const CollegeEditionSection = () => {
  const thumbnails = [
    {
      id: "001",
      title: "COLLEGE",
      subtitle: "XYZ",
      desc: "A placeholder text is a block of nonsensical or meaningless text that is temporarily used to fill a space where actual content will eventually appear. It serves as a visual placeholder to help designers and developers visualize the layout of a website, document, or other design project before the final content is added...",
      img: { src: prod1, alt: "Thumbnail 0" },
    },
    {
      id: "002",
      title: "COLLEGE",
      subtitle: "XYZ",
      desc: "Temporarily used to fill a space where actual content will eventually appear...",
      img: { src: prod2, alt: "Thumbnail 1" },
    },
    {
      id: "003",
      title: "COLLEGE",
      subtitle: "XYZ",
      desc: "Temporarily used to fill a space where actual content will eventually appear...",
      img: { src: prod3, alt: "Thumbnail 2" },
    },
    {
      id: "004",
      title: "COLLEGE",
      subtitle: "XYZ",
      desc: "Temporarily used to fill a space where actual content will eventually appear...",
      img: { src: prod4, alt: "Thumbnail 3" },
    },
    {
      id: "005",
      title: "COLLEGE",
      subtitle: "XYZ",
      desc: "Temporarily used to fill a space where actual content will eventually appear...",
      img: { src: prod5, alt: "Thumbnail 4" },
    },
  ];

  return (
    <div className={styles.collegeEditionSection}>
      <div className={styles.collegeEditionContainer}>
        {/* LEFT SIDE */}
        <div className={styles.collegeEditionLeft}>
          <img
            src={thumbnails[0].img.src}
            alt={thumbnails[0].img.alt}
            className={styles.mainModelImg}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.collegeEditionRight}>
            <div className={styles.collegeEditionText}>
                <p className={styles.editionCode}>№{thumbnails[0].id}</p>
                <h2 className={styles.editionTitle}>MERAYA’S COLLEGE EDITION</h2>
                <p className={styles.editionDescription}>
                    {thumbnails[0].desc} <span className={styles.whiteLine}></span>
                </p>
                <a href="#" className={styles.buyNow}>
                    BUY NOW
                </a>
            </div>

          <div className={styles.collegeThumbnailsWrapper}>
            <div className={styles.collegeThumbnails}>
              {thumbnails.slice(1).map((item, index) => (
                <div key={index} className={styles.collegeThumbCard}>
                  <img
                    src={item.img.src}
                    alt={item.img.alt}
                    className={styles.thumbImg}
                  />
                  <p className={styles.thumbCode}>№{item.id}</p>
                  <div className={styles.thumbTitle}>
                    {item.title} <span className={styles.whiteLine}></span> {item.subtitle}
                  </div>
                  <p className={styles.thumbDesc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CollegeEditionSection;
