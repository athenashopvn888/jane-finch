import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./resources.module.css";
import {
  RESOURCE_ROUTE_LABELS,
  SITE_URL,
  STORE_NAME,
  STORE_ROUTE,
  getResourceChildren,
  resourceCanonical,
  type ResourceCard,
  type ResourceLink,
  type ResourcePage,
} from "./resourceData";

function displayDate(value: string) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function cleanInternalHref(value: string) {
  const href = value.trim();
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("..") || href.includes("\\") || /[\s<>]/.test(href)) return "";
  return href;
}

function routeLabel(href: string) {
  return RESOURCE_ROUTE_LABELS[href] || href;
}

function renderInline(text: string) {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*)|(`([^`]+)`)|\[([^\]]+)\]\((\/[^)\s]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>);
    if (match[2]) {
      nodes.push(<strong key={`strong-${match.index}`}>{match[2]}</strong>);
    } else if (match[4]) {
      const href = cleanInternalHref(match[4]);
      nodes.push(
        href ? (
          <Link key={`code-link-${match.index}`} href={href} className={styles.inlineLink}>
            {routeLabel(href)}
          </Link>
        ) : (
          <code key={`code-${match.index}`}>{match[4]}</code>
        )
      );
    } else if (match[5] && match[6]) {
      const href = cleanInternalHref(match[6]);
      nodes.push(
        href ? (
          <Link key={`md-link-${match.index}`} href={href} className={styles.inlineLink}>
            {match[5]}
          </Link>
        ) : (
          <span key={`bad-link-${match.index}`}>{match[5]}</span>
        )
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
  return nodes.length ? nodes : text;
}

function renderLines(text: string) {
  const lines = text.split("\n");
  return lines.map((line, index) => (
    <span key={`${index}-${line.slice(0, 12)}`}>
      {renderInline(line)}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

function renderBody(body: string) {
  return body.split(/\n\n+/).map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (/^#{2,3}\s/.test(trimmed)) {
      return (
        <h2 key={index} className={styles.bodyHeading}>
          {renderInline(trimmed.replace(/^#{2,3}\s/, ""))}
        </h2>
      );
    }
    if (/^-\s/m.test(trimmed) && trimmed.split("\n").every((line) => line.trim().startsWith("- "))) {
      return (
        <ul key={index} className={styles.bodyList}>
          {trimmed.split("\n").map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item.replace(/^-\s*/, ""))}</li>
          ))}
        </ul>
      );
    }
    if (/^\d+\.\s/m.test(trimmed) && trimmed.split("\n").every((line) => /^\d+\.\s/.test(line.trim()))) {
      return (
        <ol key={index} className={styles.bodyList}>
          {trimmed.split("\n").map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item.replace(/^\d+\.\s*/, ""))}</li>
          ))}
        </ol>
      );
    }
    return (
      <p key={index} className={styles.bodyP}>
        {renderLines(trimmed)}
      </p>
    );
  });
}

function breadcrumbItems(page: ResourcePage) {
  const items = [
    { name: "Home", href: "/" },
    { name: "Resource Centre", href: "/resources" },
  ];
  if (page.parentRoute && page.parentRoute !== "/resources") {
    items.push({ name: routeLabel(page.parentRoute), href: page.parentRoute });
  }
  if (page.route !== "/resources") items.push({ name: page.h1, href: page.route });
  return items;
}

function resourceJsonLd(page: ResourcePage) {
  const canonical = resourceCanonical(page);
  const breadcrumbs = breadcrumbItems(page);
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
  const publisher = { "@type": "Organization", name: STORE_NAME, url: SITE_URL };
  const author = { "@type": page.author.type, name: page.author.name, url: canonical };
  const pageSchema =
    page.kind === "main" || page.kind === "hub"
      ? {
          "@type": ["CollectionPage", "WebPage"],
          name: page.h1,
          headline: page.h1,
          description: page.metaDescription,
          url: canonical,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: page.cards.map((card, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${SITE_URL}${card.href}`,
              name: card.title,
            })),
          },
          publisher,
        }
      : {
          "@type": "Article",
          headline: page.h1,
          description: page.metaDescription,
          datePublished: page.datePublished,
          dateModified: page.dateModified,
          mainEntityOfPage: canonical,
          url: canonical,
          image: `${SITE_URL}${page.heroImage}`,
          author,
          publisher,
        };
  return { "@context": "https://schema.org", "@graph": [pageSchema, breadcrumbSchema] };
}

function CardGrid({ cards }: { cards: ResourceCard[] }) {
  if (!cards.length) return null;
  return (
    <div className={styles.cardGrid}>
      {cards.map((card) => (
        <Link key={card.href} href={card.href} className={styles.card}>
          <span className={styles.cardCategory}>{card.category}</span>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <span className={styles.cardMeta}>
            {card.author} - Updated {displayDate(card.updated)}
          </span>
        </Link>
      ))}
    </div>
  );
}

function LinkPanel({ links }: { links: ResourceLink[] }) {
  if (!links.length) return null;
  return (
    <aside className={styles.linkPanel} aria-label="Current menu and store links">
      <p className={styles.sectionLabel}>Current menu and store links</p>
      <div className={styles.linkGrid}>
        {links.map((link) => (
          <Link key={`${link.href}-${link.title}`} href={link.href} className={styles.menuLink}>
            <span>{link.title}</span>
            <small>{link.description}</small>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function SecondTake({ page }: { page: ResourcePage }) {
  if (!page.secondTake) return null;
  return (
    <aside className={styles.secondTake}>
      <p className={styles.sectionLabel}>{page.secondTake.label}</p>
      <p className={styles.secondAuthor}>
        <strong>{page.secondTake.name}</strong>
        {page.secondTake.handle ? ` - ${page.secondTake.handle}` : ""}
      </p>
      <p>{page.secondTake.body}</p>
    </aside>
  );
}

export default function ResourceView({ page }: { page: ResourcePage }) {
  const childPages = getResourceChildren(page);
  const displayCards =
    page.kind === "main"
      ? childPages.map((child) => ({
          title: child.h1,
          href: child.route,
          description: child.excerpt || child.metaDescription,
          category: "Menu guide",
          author: child.author.name,
          updated: child.dateModified,
        }))
      : page.cards;

  return (
    <main className={styles.main}>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceJsonLd(page)) }} />
      <article className={styles.article}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          {breadcrumbItems(page).map((item, index, list) => (
            <span key={item.href}>
              {index < list.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span>{item.name}</span>}
              {index < list.length - 1 ? <span className={styles.crumbSep}>/</span> : null}
            </span>
          ))}
        </nav>

        <header className={styles.hero}>
          <Image src={page.heroImage} alt={`${STORE_NAME} logo`} width={72} height={72} className={styles.heroLogo} />
          <div>
            <p className={styles.eyebrow}>{page.kind === "main" ? "Resource Centre" : page.pageType}</p>
            <h1>{page.h1}</h1>
            <p className={styles.summary}>{page.excerpt}</p>
            <div className={styles.meta}>
              <span>By {page.author.name}{page.author.handle ? ` - ${page.author.handle}` : ""}</span>
              <span>Updated {displayDate(page.dateModified)}</span>
            </div>
          </div>
        </header>

        <div className={styles.content}>{renderBody(page.body)}</div>
        <SecondTake page={page} />
        <LinkPanel links={page.commercialLinks} />
        <CardGrid cards={displayCards} />

        <div className={styles.storeCta}>
          <p>
            Use the live menu for current product details and the store page for current visit information before
            heading to Jane Street in North York.
          </p>
          <Link href={STORE_ROUTE}>Open the store page</Link>
        </div>
      </article>
      <Footer />
    </main>
  );
}
