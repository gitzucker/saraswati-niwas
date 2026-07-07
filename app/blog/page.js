"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getBlogPosts } from "../lib/cms";
import ScrollReveal from "../components/shared/ScrollReveal";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then(data => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className="container">
        
        {/* Header */}
        <div className={styles.sectionHeader}>
          <ScrollReveal animation="fadeUp">
            <span className={styles.tagline}>Articles & Updates</span>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={100}>
            <h1 className={styles.title}>Saraswati Niwas Blog</h1>
          </ScrollReveal>
          <ScrollReveal animation="fadeUp" delay={200}>
            <p className={styles.description}>
              Useful resources, guides on accommodation comparisons, student lifestyle, and local Greater Noida area highlights.
            </p>
          </ScrollReveal>
        </div>

        {/* Blog Post Grid */}
        {loading ? (
          <div className={styles.loader}>
            <div className={styles.spinner} />
          </div>
        ) : (
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <ScrollReveal key={post.id} animation="fadeUp" delay={i * 120}>
                <div className={styles.card}>
                  <Link href={`/blog/${post.slug}`} className={styles.imageLink}>
                    <div className={styles.imageContainer}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <span className={styles.categoryBadge}>{post.category}</span>
                    </div>
                  </Link>

                  <div className={styles.cardBody}>
                    <div className={styles.metaRow}>
                      <div className={styles.metaItem}>
                        <Calendar size={12} />
                        <span>{new Date(post.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Clock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                    </Link>
                    
                    <p className={styles.excerpt}>{post.excerpt}</p>

                    <div className={styles.cardFooter}>
                      <div className={styles.author}>
                        <User size={12} />
                        <span>{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className={styles.readLink}>
                        <span>Read Article</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
