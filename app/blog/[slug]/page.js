"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { getBlogPostBySlug } from "../../lib/cms";
import ScrollReveal from "../../components/shared/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ChevronLeft, Share2 } from "lucide-react";
import Button from "../../components/shared/Button";

export default function BlogPostPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPostBySlug(params.slug).then((data) => {
      if (!data) {
        router.push("/blog");
      } else {
        setPost(data);
      }
      setLoading(false);
    });
  }, [params.slug, router]);

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner} />
        <p>Loading article...</p>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.backBar}>
        <div className="container">
          <Link href="/blog" className={styles.backLink}>
            <ChevronLeft size={16} />
            <span>Back to Articles</span>
          </Link>
        </div>
      </div>

      <article className={styles.article}>
        {/* Banner Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={styles.bannerImage}
            priority
            sizes="100vw"
          />
          <div className={styles.overlay} />
          <div className={styles.headerContent}>
            <div className="container">
              <span className={styles.category}>{post.category}</span>
              <h1 className={styles.postTitle}>{post.title}</h1>
              
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <User size={16} />
                  <span>By {post.author}</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar size={16} />
                  <span>{new Date(post.date).toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content body */}
        <div className="container">
          <div className={styles.articleBody}>
            <div className={styles.richText}>
              <p className={styles.lead}>{post.excerpt}</p>
              
              {/* Splitting mock markdown body */}
              <div className={styles.bodyContent}>
                {post.content.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* Sidebar with author card & share */}
            <aside className={styles.sidebar}>
              <div className={styles.authorCard}>
                <div className={styles.avatarCircle}>
                  <User size={24} />
                </div>
                <h3>{post.author}</h3>
                <span>Saraswati Editor</span>
                <p>Sharing helpful advice, comparison guides, and hacks for local hostel bookings in Greater Noida.</p>
              </div>

              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Article link copied!"); }} className={styles.shareBtn}>
                <Share2 size={16} />
                <span>Share This Article</span>
              </button>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}
