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
    '4': {
      title: 'How Many Abstractions Do You Actually Need?',
      excerpt: 'A simple "Hello, World" revealed something uncomfortable about the tools I use every day and whether I truly understand what I\'m asking them to do.',
      date: '2024-01-22',
      readTime: '12 min read',
      content: `
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
          <p class="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Key Insight</p>
          <p class="text-blue-700 dark:text-blue-300">In one of my Operating Systems lectures, we traced different programming languages to count system calls for the same "Hello, World" task. The results were eye-opening: C (~150 calls), Python (~300 calls), Node.js (~900 calls). Same output, vastly different machinery underneath.</p>
        </div>

        <p class="mb-6 leading-relaxed text-lg">This simple exercise revealed something uncomfortable about the tools I use every day: <strong>I'm running programs that make 6x more system calls than necessary just to print text</strong>. Do I actually need that level of abstraction every single time? And more importantly: did I even know it was happening?</p>

        <h3 class="heading-md mt-10 mb-4">What Abstraction Really Is</h3>
        <p class="mb-4 leading-relaxed">Before we talk about cost, let's be precise about what we mean. Abstraction is not magic. It is, at its core, a theory—a principle that captures a recurring pattern and packages it into something reusable, so you don't have to repeat yourself every time you need it.</p>
        <p class="mb-6 leading-relaxed">That's the promise of DRY: Don't Repeat Yourself. Instead of writing the same memory management, I/O handling, or routing logic over and over, you call a function, use a library, or reach for a framework. <strong>That's a good deal. And for most situations, it is a good deal.</strong></p>
        <p class="mb-6 leading-relaxed">But promises have fine print. Every layer you add on top of the machine introduces something. Not nothing. Something. And the something compounds.</p>

        <h3 class="heading-md mt-10 mb-4">The Hidden Cost—Made Concrete</h3>
        <p class="mb-6 leading-relaxed">Let's look at the same operation at three levels of abstraction, with the system calling out what's actually happening underneath each one.</p>

        <div class="grid gap-6 md:grid-cols-3 mb-8">
          <div class="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
            <h4 class="text-white font-sans font-semibold mb-3">Level 1—C (close to the metal)</h4>
            <pre><code>#include &lt;unistd.h&gt;
int main() {
    const char *msg = "Hello, World\\n";
    write(1, msg, 13);  // One syscall. That's it.
    return 0;
}</code></pre>
            <p class="text-gray-400 text-xs mt-3">~150 system calls total (mostly linker overhead)</p>
          </div>

          <div class="bg-blue-900 text-blue-100 p-6 rounded-lg font-mono text-sm">
            <h4 class="text-white font-sans font-semibold mb-3">Level 2—Python (managed runtime)</h4>
            <pre><code>print("Hello, World")
# What happens before this line:
# - mmap() × N (memory-map interpreter)
# - openat() × N (load bytecode cache)
# - brk() (expand heap)
# - write() (your output)</code></pre>
            <p class="text-blue-300 text-xs mt-3">~300 system calls (runtime warmup)</p>
          </div>

          <div class="bg-yellow-900 text-yellow-100 p-6 rounded-lg font-mono text-sm">
            <h4 class="text-white font-sans font-semibold mb-3">Level 3—Node.js (V8 + libuv)</h4>
            <pre><code>console.log("Hello, World");
// Before this runs:
# - epoll_create() (async I/O setup)
# - clone() × N (worker threads)
# - mmap() × N (V8 heap + JIT)
# - write() (your output)</code></pre>
            <p class="text-yellow-300 text-xs mt-3">~900 system calls (full event loop)</p>
          </div>
        </div>

        <h3 class="heading-md mt-10 mb-4">The Anatomy of Hidden Costs</h3>
        <p class="mb-4 leading-relaxed">When you add an abstraction layer, here's what you're actually adding:</p>
        <ul class="list-disc list-inside mb-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Indirection</strong>—your function call goes through layers before reaching the actual work. Each layer is a jump, lookup, dispatch.</li>
          <li><strong>Memory allocations</strong>—runtimes maintain heaps, object pools, garbage collectors. Every object may trigger internal allocations you never see.</li>
          <li><strong>Context switching</strong>—runtimes spawn threads (Node's libuv, Python's GIL, Java's GC threads). Each thread is a scheduling unit the OS manages.</li>
          <li><strong>Runtime initialization</strong>—loading interpreters, JIT-compiling, building module graphs. This is the cold-start cost that matters in serverless.</li>
          <li><strong>Wasted syscalls</strong>—calls serving the abstraction layer, not your feature. The OS doesn't distinguish between necessary and overhead calls.</li>
        </ul>

        <h3 class="heading-md mt-10 mb-4">Frameworks and the 80% Rule</h3>
        <p class="mb-4 leading-relaxed">Most frameworks are engineered for the common case—CRUD apps, REST APIs, dashboards, the 80% of products that look roughly the same. And for that 80%, frameworks are genuinely excellent.</p>
        <p class="mb-6 leading-relaxed">They let small teams ship fast, let new engineers onboard without archaeology, and encode years of hard-won decisions into convention.</p>

        <div class="bg-secondary/30 p-6 rounded-lg mb-8">
          <h4 class="font-semibold mb-3">Express.js Example</h4>
          <div class="grid md:grid-cols-2 gap-4 font-mono text-sm">
            <div>
              <p class="text-muted-foreground mb-2">// Framework approach</p>
              <pre><code class="language-javascript">const express = require('express');
const app = express();
// Loads: body-parser, router, query parser,
// ETag generation, trust proxy handling...
app.get('/', (req, res) => {
  res.send('Hello, World');
});</code></pre>
            </div>
            <div>
              <p class="text-muted-foreground mb-2">// Raw Node HTTP</p>
              <pre><code class="language-javascript">const http = require('http');
// No router. No middleware. Just TCP.
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, World');
}).listen(3000);</code></pre>
            </div>
          </div>
          <p class="text-sm text-muted-foreground mt-3">Express initialization cost becomes real dollars in serverless environments with millions of cold starts.</p>
        </div>

        <h3 class="heading-md mt-10 mb-4">The Abstraction Blindness Problem</h3>
        <p class="mb-4 leading-relaxed">The deeper issue isn't performance. It's visibility. Here's a bug that ships to production more often than it should:</p>

        <div class="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-6 mb-8">
          <h4 class="font-semibold text-red-800 dark:text-red-200 mb-3">The N+1 Query Problem</h4>
          <div class="grid md:grid-cols-2 gap-4 font-mono text-sm">
            <div>
              <p class="text-muted-foreground mb-2">// Django ORM - looks innocent</p>
              <pre><code class="language-python">users = User.objects.filter(active=True).all()
for user in users:
    print(user.team.name)  # This is a trap!</code></pre>
              <p class="text-red-600 dark:text-red-400 text-xs mt-2">Generates: 10,001 queries for 10,000 users</p>
            </div>
            <div>
              <p class="text-muted-foreground mb-2">// The fix - understanding the cost</p>
              <pre><code class="language-python">users = User.objects.filter(active=True).select_related('team')
# Now generates: 1 optimized query with JOIN</code></pre>
              <p class="text-green-600 dark:text-green-400 text-xs mt-2">Generates: 1 query, always</p>
            </div>
          </div>
        </div>

        <p class="mb-6 leading-relaxed">The ORM did exactly what you asked. The problem isn't the ORM—it's that the abstraction hid the query structure from you. In development with 5 test users: undetectable. In production with real data: a 3am incident.</p>

        <h3 class="heading-md mt-10 mb-4">When to Go Closer to the Metal</h3>
        <p class="mb-4 leading-relaxed">Some domains have zero tolerance for abstraction overhead:</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>Game engines</strong>—60 FPS loops can't afford GC pauses. Game developers write custom allocators and avoid GC languages entirely.</li>
          <li><strong>High-frequency trading</strong>—microseconds = dollars. HFT firms use C++ with custom allocators, pin threads to CPU cores.</li>
          <li><strong>Embedded systems</strong>—2KB RAM microcontrollers get direct register access only.</li>
          <li><strong>Database engines</strong>—PostgreSQL, SQLite, RocksDB are written in C because when you're the foundation, you can't have uncontrolled abstractions beneath you.</li>
        </ul>

        <h3 class="heading-md mt-10 mb-4">When Abstractions Are Absolutely Worth It</h3>
        <p class="mb-4 leading-relaxed">All of that said: the engineers building abstractions aren't foolish. The engineers using them wisely aren't lazy.</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>Speed of delivery</strong>—Django/Rails apps production-ready in days vs. months in C</li>
          <li><strong>Team collaboration</strong>—shared conventions mean new engineers can read your code</li>
          <li><strong>Maintainability</strong>—ORMs prevent SQL injection, handle connection pooling, provide migrations</li>
          <li><strong>Correctness</strong>—writing correct concurrent code is extraordinarily hard. Abstractions handle complexity so you don't get it wrong</li>
        </ul>

        <div class="bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 p-6 mb-8">
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-3">Asyncio Example</h4>
          <pre class="font-mono text-sm"><code class="language-python">import asyncio
import aiohttp

async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Without this abstraction, you're managing:
# - thread safety, race conditions, connection pools
# - error propagation, cancellation across tasks
# The abstraction cost is worth the correctness guarantee.</code></pre>
        </div>

        <h3 class="heading-md mt-10 mb-4">The Real Question</h3>
        <p class="mb-4 leading-relaxed">The question is not "should I avoid abstractions?" Rejecting all abstractions is not engineering wisdom—it's nostalgia.</p>
        <p class="mb-6 leading-relaxed">The question is: <strong>do I understand the cost of the abstractions I'm using?</strong></p>

        <div class="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-lg mb-8">
          <p class="text-purple-800 dark:text-purple-200 font-medium mb-2">Conscious Engineering Choice:</p>
          <p class="text-purple-700 dark:text-purple-300">Using an ORM because you understand what it generates and accept the trade-off vs. using an ORM because SQL is scary and you'd rather not think about it.</p>
        </div>

        <h3 class="heading-md mt-10 mb-4">How to Build That Awareness</h3>
        <p class="mb-4 leading-relaxed">If you're primarily in high-level languages and frameworks, here are concrete ways to understand what's underneath:</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li><strong>Use strace/dtruss</strong>—trace system calls: <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">strace -c python hello.py</code></li>
          <li><strong>Read ORM query logs</strong>—turn on SQL logging in development. The N+1 problem becomes immediately visible.</li>
          <li><strong>Profile before optimizing</strong>—don't guess bottlenecks. Use cProfile, Node --prof, Chrome DevTools.</li>
          <li><strong>Understand your event model</strong>—whether Node's event loop, Python's GIL, or Go's goroutines.</li>
          <li><strong>Read the source</strong>—frameworks are open source. Express is ~few thousand lines. Django's ORM is readable Python.</li>
        </ul>

        <h3 class="heading-md mt-10 mb-4">Conclusion: Conscious Engineering</h3>
        <p class="mb-4 leading-relaxed">The best engineers aren't those who use the lowest-level tools. They're not those who use the highest-level tools either.</p>
        <p class="mb-6 leading-relaxed"><strong>They are the ones who understand the cost and choose accordingly.</strong></p>
        <p class="mb-4 leading-relaxed">Sometimes that means writing C. Sometimes it means reaching for a full-stack framework and shipping something useful this week instead of next quarter.</p>
        <p class="mb-6 leading-relaxed">The choice isn't the point. The consciousness is the point.</p>

        <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-6 rounded-lg border-l-4 border-gray-500">
          <p class="text-gray-800 dark:text-gray-200 font-medium mb-2">Final Thought</p>
          <p class="text-gray-700 dark:text-gray-300">A Hello, World program should not require 900 system calls. But if you're building a real-time server handling 50,000 concurrent connections, Node's event loop architecture is worth every one of them.</p>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-3"><strong>The abstraction isn't the problem. Not knowing what it contains is.</strong></p>
        </div>

        <p class="mt-8 text-center text-muted-foreground">
          If you found this useful, I write about systems thinking, performance engineering, and the gap between what code looks like and what it actually does.
        </p>
      `,
    },
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
