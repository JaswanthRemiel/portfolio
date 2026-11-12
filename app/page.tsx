import Image from "next/image";
import Garden from "@/components/Garden";
import ProjectVideo from "@/components/ProjectVideo";
import Tabs from "@/components/Tabs";
import { getContent, type Content } from "@/lib/data";

function Ext({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  );
}

/** Small "opens elsewhere" arrow, drawn as a stroke so it matches the text weight. */
function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" />
    </svg>
  );
}

// Projects: poster cards with the full description in small type.
function Projects({ projects }: Pick<Content, "projects">) {
  return (
    <ul className="cards">
      {projects.map((p) => (
        <li key={p.name} className="card">
          {p.video ? (
            <div className="frame">
              <ProjectVideo src={p.video} poster={p.poster} />
            </div>
          ) : (
            p.image && (
            <div className="frame">
              <Image
                className="poster"
                src={p.image}
                alt={`Screenshot of ${p.name}`}
                width={640}
                height={360}
                sizes="(max-width: 720px) 100vw, 320px"
              />
            </div>
            )
          )}
          <div className="card-body">
            <div className="row">
              <h3>{p.href ? <Ext href={p.href}>{p.name}</Ext> : p.name}</h3>
              <span className="meta">{p.period}</span>
            </div>
            <p className="desc">{p.description}</p>
            <p className="meta tech">{p.tech.join(" · ")}</p>
            <div className="card-foot">
              <span className="links">
                {p.links.map((l) => (
                  <Ext key={l.label + l.href} href={l.href}>
                    {l.label}
                    <Arrow />
                  </Ext>
                ))}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Experience: a timeline on the left, photos from each role on the right.
function Experience({ experience }: Pick<Content, "experience">) {
  return (
    <div className="timeline">
      {experience.map((group) => (
        <section key={group.year} className="year">
          <h3 className="meta">{group.year}</h3>
          <ul>
            {group.roles.map((r) => (
              <li key={r.role + r.org}>
                <div>
                  <div className="row">
                    <h4>
                      {r.role} @ {r.href ? <Ext href={r.href}>{r.org}</Ext> : r.org}
                    </h4>
                    {r.when && <span className="meta">{r.when}</span>}
                  </div>
                  {r.description.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                {r.photos.length > 0 && (
                  <div className="photos">
                    {r.photos.map((ph) => (
                      <Image key={ph.src} src={ph.src} alt={ph.alt} width={1000} height={562} sizes="200px" />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

// Blog: cover cards, each linking out to the article.
function Blog({ posts }: Pick<Content, "posts">) {
  return (
    <ul className="cards">
      {posts.map((p) => (
        <li key={p.href}>
          <Ext href={p.href} className="card post">
            <div className="frame">
              <Image className="poster" src={p.image} alt="" width={1000} height={562} sizes="(max-width: 720px) 100vw, 320px" />
            </div>
            <div className="card-body">
              <h3>{p.title}</h3>
              <div className="card-foot">
                <time className="meta">{p.date}</time>
                <span className="meta" aria-hidden="true">
                  Read
                  <Arrow />
                </span>
              </div>
            </div>
          </Ext>
        </li>
      ))}
    </ul>
  );
}

// Research: numbered like a reference list, side by side.
function Research({ research }: Pick<Content, "research">) {
  return (
    <ol className="papers">
      {research.map((r, i) => (
        <li key={r.title}>
          <div className="row">
            <span className="meta num">[{i + 1}]</span>
            <span className="meta">{r.when}</span>
          </div>
          <h3>{r.href ? <Ext href={r.href}>{r.title}</Ext> : r.title}</h3>
          <p>{r.description}</p>
          <p className="meta">{r.tech.join(" · ")}</p>
        </li>
      ))}
    </ol>
  );
}

// Certifications: a grid of badges.
function Certifications({ certifications }: Pick<Content, "certifications">) {
  return (
    <ul className="certs">
      {certifications.map((c) => (
        <li key={c.href}>
          <Ext href={c.href} className="cert">
            {/* eslint-disable-next-line @next/next/no-img-element -- small local badges, some are SVG */}
            <img className="badge" src={c.badge} alt="" width={48} height={48} loading="lazy" />
            <span>
              <span className="cert-name">{c.name}</span>
              <span className="meta">{c.issuer}</span>
            </span>
          </Ext>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { profile, bio, projects, experience, posts, research, certifications } = getContent();

  return (
    <div className="page">
      <main>
        <div className="intro">
          <h1>{profile.name}</h1>
          <div className="copy">
            <div className="bio">
              {bio.map((para, i) => (
                <p key={i}>
                  {para.map((run, j) =>
                    run.href ? (
                      <Ext key={j} href={run.href}>
                        {run.text}
                      </Ext>
                    ) : (
                      run.text
                    ),
                  )}
                </p>
              ))}
            </div>
            <footer>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <span className="socials">
                {profile.socials.map((s) => (
                  <Ext key={s.label} href={s.href}>
                    {s.label}
                  </Ext>
                ))}
              </span>
            </footer>
          </div>
        </div>

        <Tabs
          tabs={[
            { id: "projects", label: "projects", content: <Projects projects={projects} /> },
            { id: "experience", label: "experience", content: <Experience experience={experience} /> },
            { id: "blog", label: "blog", content: <Blog posts={posts} /> },
            { id: "research", label: "research", content: <Research research={research} /> },
            { id: "certifications", label: "certifications", content: <Certifications certifications={certifications} /> },
          ]}
        />
      </main>
      <Garden />
    </div>
  );
}
