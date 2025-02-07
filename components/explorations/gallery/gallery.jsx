import Image from 'next/image';
import cx from 'classnames';
import styles from './gallery.module.css';
import { useEffect, useState } from 'react';
import { IconArrowLeft } from '../../icons/arrow-left';
import { IconArrowRight } from '../../icons/arrow-right';
import { IconClose } from '../../icons/close';
import { ResizeableFrame } from './resizeable-frame';

export const galleryData = {
  exterior: [
    'exterior-1.jpg',
    'exterior-2.jpg',
    'exterior-3.jpg',
    'exterior-4.jpg',
    'exterior-5.jpg',
    'exterior-6.jpg',
  ],
  interior: ['interior-1.jpg', 'interior-2.jpg'],
  wheels: ['wheels-1.jpg', 'wheels-2.jpg'],
};

export const Gallery = ({}) => {
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const handleKeyUp = (e) => {
      const { key } = e;

      if (key === 'Escape') {
        setActiveImage('');
      }
    };

    addEventListener('keyup', handleKeyUp);

    return () => {
      removeEventListener('keyup', handleKeyUp);
    };
  });

  const incrementImage = (increment) => {
    const allImages = Object.values(galleryData).flat();
    const i = allImages.indexOf(activeImage);
    let newImage = allImages[i + increment];
    const lastImage = allImages[allImages.length - 1];
    const firstImage = allImages[0];

    if (!newImage && increment > 0) {
      newImage = firstImage;
    }

    if (!newImage && increment < 0) {
      newImage = lastImage;
    }

    console.log({ i, newImage });

    return newImage;
  };

  return (
    <ResizeableFrame>
      <div className={styles.galleryContainer}>
        <div className={styles.gallery}>
          {Object.entries(galleryData).map(([groupName, images]) => {
            return (
              <GallerySection
                images={images}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
                groupName={groupName}
                key={groupName}
              />
            );
          })}
        </div>

        <div className={styles.controls}>
          {/* Back to Default State */}
          <GalleryButton
            className={styles.close}
            onClick={() => {
              setActiveImage('');
            }}
          >
            <IconClose />
          </GalleryButton>

          {/* TODO: Next/Prev */}
          <GalleryButton
            className={styles.prev}
            onClick={() => {
              const prev = incrementImage(-1);
              setActiveImage(prev);
            }}
          >
            <IconArrowLeft />
          </GalleryButton>

          <GalleryButton
            className={styles.next}
            onClick={() => {
              const next = incrementImage(+1);
              setActiveImage(next);
            }}
          >
            <IconArrowRight />
          </GalleryButton>
        </div>
      </div>
    </ResizeableFrame>
  );
};

// This could be the genesis of a whole design system if needed
// Simple components w/ default classNames, namespace'd & shared
const GalleryButton = ({ children, className, ...rest }) => {
  return (
    <button className={cx(styles.galleryButton, className)} {...rest}>
      {children}
    </button>
  );
};

// Only need separate component here so we can track the last active image per-section
// otherwise this would just be more render markup
const GallerySection = ({ images, groupName, activeImage, setActiveImage }) => {
  const [lastActiveImage, setLastActiveImage] = useState('');
  const isActive = images.find((img) => activeImage === img);

  useEffect(() => {
    if (isActive) {
      setLastActiveImage(activeImage);
    }
  }, [activeImage, setLastActiveImage, isActive]);

  return (
    <div
      className={cx(styles.section, {
        [styles.active]: isActive,
      })}
      key={groupName}
    >
      {images.map((imageSrc, i) => {
        const imageIsActive = isActive
          ? activeImage === imageSrc
          : lastActiveImage === imageSrc;
        const zIndex = images.length - i;

        return (
          <div
            className={cx(styles.image, {
              [styles.active]: imageIsActive,
            })}
            style={{ zIndex }}
            key={imageSrc}
          >
            {/* Label-wrapping the image allows us to easily treat the image like a button */}
            <label>
              <Image
                height="800"
                width="1100"
                alt=""
                src={`/explorations/09/${imageSrc}`}
              />

              <input
                type="radio"
                name="gallery"
                value={imageSrc}
                onChange={(e) => {
                  setActiveImage(e.target.value);
                }}
                checked={activeImage === imageSrc}
              />

              <span>{imageSrc}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
};
