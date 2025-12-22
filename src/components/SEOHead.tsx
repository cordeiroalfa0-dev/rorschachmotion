import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string | null;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

const SEOHead = ({
  title,
  description,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  tags
}: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Rorschach Motion`;

    // Helper function to update or create meta tag
    const updateMetaTag = (property: string, content: string, isName = false) => {
      const attribute = isName ? 'name' : 'property';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic SEO
    updateMetaTag('description', description, true);

    // Open Graph (Facebook, Instagram, WhatsApp, LinkedIn)
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', type);
    
    if (url) {
      updateMetaTag('og:url', url);
    }
    
    if (image) {
      // Use absolute URL for image
      const absoluteImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;
      updateMetaTag('og:image', absoluteImage);
      updateMetaTag('og:image:width', '1200');
      updateMetaTag('og:image:height', '630');
      updateMetaTag('og:image:alt', title);
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image', true);
    updateMetaTag('twitter:title', title, true);
    updateMetaTag('twitter:description', description, true);
    
    if (image) {
      const absoluteImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;
      updateMetaTag('twitter:image', absoluteImage, true);
    }

    // Article specific tags
    if (type === 'article') {
      if (author) {
        updateMetaTag('article:author', author);
      }
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime);
      }
      if (tags && tags.length > 0) {
        tags.forEach((tag, index) => {
          updateMetaTag(`article:tag:${index}`, tag);
        });
      }
    }

    // Cleanup function to restore default meta tags
    return () => {
      document.title = 'Rorschach Motion - Desenvolvimento de Sistemas';
      updateMetaTag('og:title', 'Rorschach Motion - Desenvolvimento de Sistemas');
      updateMetaTag('og:description', 'Soluções digitais inovadoras para transformar seu negócio. Sistemas web, apps mobile e muito mais.');
      updateMetaTag('og:type', 'website');
    };
  }, [title, description, image, url, type, author, publishedTime, tags]);

  return null;
};

export default SEOHead;
