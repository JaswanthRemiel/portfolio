"use client";

import Link from "next/link";
import Image from "next/image";

interface Certification {
  issuer: string;
  title: string;
  href?: string;
  image?: string;
}

interface CertificationsContentProps {
  certifications: Certification[];
}

function CertificationBadge({ issuer, title, href, image }: Certification) {
  const content = (
    <div className="flex flex-col items-center text-center group h-full justify-start w-full">
      {image && (
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-105 shrink-0">
          <Image
            src={image}
            alt={title}
            width={112}
            height={112}
            className="max-w-full max-h-full object-contain"
            sizes="(max-width: 640px) 80px, 112px"
            quality={75}
          />
        </div>
      )}
      <div className="w-full flex flex-col items-center">
        <div className="text-xs font-medium text-gray-300">{issuer}</div>
        <div className="text-[11px] text-gray-400 leading-snug mt-1 max-w-[130px]">
          {title}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} target="_blank" className="flex flex-col items-center h-full w-full">
        {content}
      </Link>
    );
  }

  return content;
}

export function CertificationsContent({ certifications }: CertificationsContentProps) {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 sm:gap-6 md:gap-8 justify-items-center">
        {certifications.map((cert) => (
          <CertificationBadge
            key={`${cert.issuer}-${cert.title}`}
            issuer={cert.issuer}
            title={cert.title}
            href={cert.href}
            image={cert.image}
          />
        ))}
      </div>
    </section>
  );
}

