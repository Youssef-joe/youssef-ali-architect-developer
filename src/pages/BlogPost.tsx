import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Share2, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [rating, setRating] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Blog posts data with full content
  const blogPosts: Record<string, {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    content: string;
  }> = {
    '1': {
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      date: '2024-01-15',
      readTime: t('blog.minRead').replace('{min}', '5'),
      content: `
        <p class="mb-6 leading-relaxed">Architecture is often misunderstood as just "building things." But whether you're designing a skyscraper or a distributed system, the core principles remain the same: stability, scalability, and purpose. In my transition from architectural engineering to software development, I found that the patterns I learned in the studio were surprisingly applicable to the codebase.</p>
        
        <h3 class="heading-md mt-10 mb-4">The Foundation: Structural Integrity</h3>
        <p class="mb-4 leading-relaxed">In physical architecture, a weak foundation leads to collapse. In software, a weak architectural foundation leads to technical debt and system failure. My background in architecture taught me to see the "load-bearing walls" of a software project before writing a single line of code.</p>
        <p class="mb-6 leading-relaxed">Consider the "Blueprint Pattern." Before pouring concrete, we draft detailed plans. Similarly, in software, defining your data schemas and API contracts upfront is crucial.</p>
        
        <div class="bg-secondary/30 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
          <p class="text-muted-foreground mb-2">// Defining the "Blueprint" (Schema) first</p>
          <pre><code class="language-typescript">interface Building {
  id: string;
  foundationType: 'concrete' | 'piling';
  floors: number;
  occupancyLimit: number;
  metadata: Record<string, unknown>;
}

// The implementation must respect the structural constraints
class Skyscraper implements Building {
  constructor(
    public id: string,
    public floors: number
  ) {
    this.foundationType = 'piling'; // Deep foundation required
    this.occupancyLimit = floors * 200;
  }
  // ...
}</code></pre>
        </div>

        <h3 class="heading-md mt-10 mb-4">Space and Flow</h3>
        <p class="mb-4 leading-relaxed">Just as a building dictates how people move through space, software architecture dictates how data flows through a system. Designing efficient data pipelines is akin to designing efficient circulation paths in a busy terminal. You want to minimize friction and bottlenecks.</p>
        
        <h3 class="heading-md mt-10 mb-4">The Modular Approach</h3>
        <p class="mb-6 leading-relaxed">Modern architecture often utilizes modular components to speed up construction and ensure consistency. In software, we use microservices or component-based UI libraries for the same reason.</p>

        <p class="mb-4 leading-relaxed">Transitioning to software engineering wasn't a change of career, but a change of medium. I swapped concrete for code, but the structural thinking remains. The tools change, but the need for robust, scalable design is universal.</p>
      `,
    },
    '2': {
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      date: '2024-01-08',
      readTime: t('blog.minRead').replace('{min}', '8'),
      content: `
        <p class="mb-6 leading-relaxed">When building <strong>Ayno</strong>, our real-time messaging engine, we faced a classic dilemma: how to handle millions of concurrent connections without sacrificing raw computational performance. We needed the high concurrency of Erlang and the raw speed of Go.</p>
        
        <h3 class="heading-md mt-10 mb-4">The Elixir Advantage: Concurrency</h3>
        <p class="mb-4 leading-relaxed">Elixir, running on the BEAM VM, is a beast when it comes to concurrency. Its actor model allows us to spawn millions of lightweight processes, each handling a user session. If one crashes, it doesn't bring down the system. This fault tolerance is crucial for a messaging platform.</p>
        
        <div class="bg-secondary/30 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
          <p class="text-muted-foreground mb-2"># Elixir GenServer handling a user session</p>
          <pre><code class="language-elixir">defmodule Ayno.Session do
  use GenServer

  def start_link(user_id) do
    GenServer.start_link(__MODULE__, user_id, name: via_tuple(user_id))
  end

  def init(user_id) do
    # Lightweight process for each user
    {:ok, %{user_id: user_id, status: :online}}
  end

  def handle_cast({:send_message, msg}, state) do
    # Handle message routing asynchronously
    PubSub.broadcast("chat_room", msg)
    {:noreply, state}
  end
end</code></pre>
        </div>

        <h3 class="heading-md mt-10 mb-4">Where Go Shines: Raw Performance</h3>
        <p class="mb-4 leading-relaxed">However, for CPU-intensive tasks like message serialization, heavy JSON parsing, and database batching, we turned to Go. Its static typing and raw speed complement Elixir's dynamic nature perfectly.</p>
        
        <div class="bg-secondary/30 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
          <p class="text-muted-foreground mb-2">// Go service for heavy lifting</p>
          <pre><code class="language-go">type MessageProcessor struct {
    Queue chan Message
}

func (p *MessageProcessor) StartWorker() {
    for msg := range p.Queue {
        // High-performance serialization
        data, _ := proto.Marshal(&msg)
        
        // Batch insert to DB
        db.BatchInsert(data)
    }
}</code></pre>
        </div>

        <h3 class="heading-md mt-10 mb-4">The Hybrid Approach</h3>
        <p class="mb-4 leading-relaxed">We built a system where Elixir manages the WebSocket connections and state, while Go microservices handle the heavy lifting. Communication happens via gRPC, ensuring low latency. This hybrid architecture gives us the best of both worlds: the reliability of Erlang and the speed of Go.</p>
      `,
    },
    '3': {
      title: t('blog.post3.title'),
      excerpt: t('blog.post3.excerpt'),
      date: '2023-12-20',
      readTime: t('blog.minRead').replace('{min}', '6'),
      content: `
        <p class="mb-6 leading-relaxed">Clean code isn't just about formatting or variable naming. It's about creating a system that is easy to understand, easy to change, and easy to maintain. In my experience, the biggest killer of software projects isn't bugs—it's unmaintainable complexity.</p>
        
        <h3 class="heading-md mt-10 mb-4">Separation of Concerns</h3>
        <p class="mb-4 leading-relaxed">One of the most important principles I follow is the Separation of Concerns. Your business logic shouldn't know about your database schema, and your UI shouldn't know about your API implementation. By decoupling these layers, we make the system more robust.</p>
        
        <h3 class="heading-md mt-10 mb-4">Dependency Inversion in Practice</h3>
        <p class="mb-4 leading-relaxed">Applying SOLID principles helps in avoiding tight coupling. The Dependency Inversion Principle allows us to swap out implementations without rewriting core logic. Here is how I structure my services:</p>
        
        <div class="bg-secondary/30 p-6 rounded-lg mb-8 font-mono text-sm overflow-x-auto">
          <p class="text-muted-foreground mb-2">// Define the contract (Interface)</p>
          <pre><code class="language-typescript">interface StorageService {
  save(file: File): Promise<string>;
  delete(id: string): Promise<void>;
}

// Implementation A: AWS S3
class S3Storage implements StorageService {
  async save(file: File) { /* ...upload to S3... */ }
  async delete(id: string) { /* ...delete from S3... */ }
}

// Implementation B: Local Disk (for dev)
class LocalStorage implements StorageService {
  async save(file: File) { /* ...save to disk... */ }
  async delete(id: string) { /* ...delete from disk... */ }
}

// The core logic doesn't care which one is used
class FileManager {
  constructor(private storage: StorageService) {}
  
  async handleUpload(file: File) {
    await this.storage.save(file);
  }
}</code></pre>
        </div>

        <h3 class="heading-md mt-10 mb-4">Why It Matters</h3>
        <p class="mb-4 leading-relaxed">Good architecture is invisible. When it works, you don't notice it. But when it's bad, every new feature becomes a struggle. By investing time in clean architecture upfront, we buy ourselves speed and agility in the future.</p>
      `,
    },
  };

  const post = id && blogPosts[id];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container-narrow py-32">
          <div className="text-center">
            <h1 className="heading-lg mb-4">{t('notFound.title')}</h1>
            <p className="body-text mb-8">{t('notFound.description')}</p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-2 bg-foreground text-background rounded hover:opacity-80 transition-opacity"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              {t('common.back')}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(isRTL ? 'ar-EG' : 'en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleRating = (value: number) => {
    setUserRating(value);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container-narrow py-32"
        >
          {/* Back Button */}
          <button
            onClick={() => navigate('/#blog')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('common.back')}</span>
          </button>

          {/* Post Header */}
          <div className="mb-12">
            <h1 className="heading-lg mb-4">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground font-mono">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-invert max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Rating Section */}
          <div className="pt-8 border-t border-border mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Was this article helpful?</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRating(star)}
                      className="transition-colors"
                    >
                      <Star
                        size={24}
                        className={`${
                          star <= userRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        } hover:text-yellow-400 transition-colors`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sharing Section */}
          <div className="pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                  <Share2 size={16} />
                  Share this article
                </p>
                <div className="flex gap-3 flex-wrap">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    <Twitter size={16} />
                    Twitter
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded hover:bg-muted transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy link
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
