export interface WebProjectItem {
  id: string;
  name: string;
  subtitle: string;
  category: "SaaS Platform" | "Enterprise Web App" | "E-Commerce" | "WebRTC Real-time";
  description: string;
  image: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  highlight: string;
  domainUrl: string;
}

export const WEB_PROJECTS: WebProjectItem[] = [
  {
    id: "makegstbill",
    name: "MakeGSTBill",
    subtitle: "Cloud Invoicing & GST Compliance Platform",
    category: "SaaS Platform",
    description:
      "Enterprise cloud invoicing suite built for Indian MSMEs. Features instant GST calculation, automated PDF dispatch, real-time inventory ledger audits, and high-concurrency tax filings.",
    image: "/images/recent-work/3.webp",
    techStack: ["Next.js 15", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Tailwind CSS"],
    metrics: [
      { label: "Monthly Invoices", value: "250K+" },
      { label: "Uptime SLA", value: "99.98%" },
      { label: "Active Businesses", value: "12,000+" },
    ],
    liveUrl: "https://makegstbill.com/",
    domainUrl: "makegstbill.com",
    highlight: "Real-time GST filing & automated PDF dispatch engine",
  },
  {
    id: "goldengst",
    name: "GoldenGST",
    subtitle: "Smart Enterprise Tax & Inventory ERP",
    category: "Enterprise Web App",
    description:
      "Full-featured web ERP providing multi-branch accounting, real-time stock reconciliation, ledger audits, and automated GSTR-1/3B reconciliation for medium and large enterprises.",
    image: "/images/recent-work/new.webp",
    techStack: ["Next.js", "Express.js", "Redis", "PostgreSQL", "Docker", "AWS"],
    metrics: [
      { label: "Queries / Sec", value: "4,500" },
      { label: "Reconciliation Speed", value: "<1.2s" },
      { label: "Data Accuracy", value: "100%" },
    ],
    liveUrl: "https://www.goldengst.com/",
    domainUrl: "goldengst.com",
    highlight: "Multi-tenant tenant isolation with role-based audit trail",
  },
  {
    id: "freedeskpro",
    name: "FreeDeskPro",
    subtitle: "Ultra-Low Latency WebRTC Remote Desktop",
    category: "WebRTC Real-time",
    description:
      "Browser-based remote desktop and IT assistance platform powered by WebRTC P2P mesh and hardware-accelerated H.264/VP9 streaming with sub-30ms latency directly inside the browser without extensions.",
    image: "/images/recent-work/6.webp",
    techStack: ["React", "WebRTC", "WebSockets", "Go", "Node.js", "Tailwind CSS"],
    metrics: [
      { label: "Screen Latency", value: "<28ms" },
      { label: "Stream Quality", value: "60 FPS" },
      { label: "Encryption", value: "AES-256" },
    ],
    liveUrl: "https://freedeskpro.com/",
    domainUrl: "freedeskpro.com",
    highlight: "Zero-install peer-to-peer browser-to-desktop streaming",
  },
  {
    id: "dravanta-nexus",
    name: "Dravanta Nexus",
    subtitle: "High-Performance Headless E-Commerce",
    category: "E-Commerce",
    description:
      "Composable, ultra-fast online storefront built with Next.js App Router, edge caching, real-time inventory synchronization, and custom checkout converting 38% higher than industry average.",
    image: "/images/recent-work/nexus_card.webp",
    techStack: ["Next.js 15", "GraphQL", "Stripe API", "Edge CDN", "Tailwind CSS"],
    metrics: [
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Checkout Speed", value: "<850ms" },
      { label: "Cart Conversion", value: "+38%" },
    ],
    liveUrl: "https://dravanta.com/",
    domainUrl: "dravanta.com",
    highlight: "Sub-second page navigations with edge SSR caching",
  },
  {
    id: "modhuralap",
    name: "Modhuralap",
    subtitle: "Real-Time Social Audio & Podcast Platform",
    category: "WebRTC Real-time",
    description:
      "Interactive social audio streaming web platform enabling live voice rooms, interactive podcasting, real-time audience reactions, and creator monetization.",
    image: "/images/recent-work/7.webp",
    techStack: ["React", "Socket.io", "Node.js", "MongoDB", "AWS MediaLive", "Tailwind CSS"],
    metrics: [
      { label: "Concurrent Listeners", value: "15,000+" },
      { label: "Audio Bitrate", value: "320kbps HD" },
      { label: "Buffer Underruns", value: "0.01%" },
    ],
    liveUrl: "https://modhuralap.com/",
    domainUrl: "modhuralap.com",
    highlight: "Low-latency spatial audio and interactive live polling",
  },
  {
    id: "simplekaam",
    name: "SimpleKaam",
    subtitle: "Workforce & Daily Wage Allocation Portal",
    category: "SaaS Platform",
    description:
      "Scalable web portal designed for gig economy workforce dispatch, automated attendance logging, geo-verified job allocations, and instant daily payout tracking.",
    image: "/images/recent-work/8.webp",
    techStack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Google Maps API", "Tailwind CSS"],
    metrics: [
      { label: "Workers Dispatched", value: "50,000+" },
      { label: "Allocation Latency", value: "<2s" },
      { label: "Payout Accuracy", value: "100%" },
    ],
    liveUrl: "http://simplekaam.com/",
    domainUrl: "simplekaam.com",
    highlight: "Automated geofencing attendance verification engine",
  },
];

export interface ArchitecturalTier {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string; unit?: string }[];
  codeSample: {
    filename: string;
    language: string;
    code: string;
  };
  pipelineNodes: {
    label: string;
    sublabel: string;
    status: string;
  }[];
}

export const ARCHITECTURAL_TIERS: ArchitecturalTier[] = [
  {
    id: "edge-ssr",
    badge: "Edge SSR & React Server Components",
    title: "Instant Global Delivery via Edge Nodes",
    subtitle: "Sub-50ms TTFB with Zero Layout Shift (CLS: 0.00)",
    summary:
      "Modern Next.js 15 App Router architecture with streaming SSR, progressive hydration, and server actions. Heavy computations run close to users at CDN edge pops, minimizing client bundle sizes to raw HTML/CSS.",
    highlights: [
      "Zero client JavaScript footprint for static content",
      "Streaming Server-Side Rendering with React 19 Suspense",
      "Automatic ISR (Incremental Static Regeneration) cache invalidation",
      "Edge Middleware for geo-distributed auth & A/B canary routing",
    ],
    metrics: [
      { label: "Time to First Byte", value: "38", unit: "ms" },
      { label: "Client Bundle Reduction", value: "72", unit: "%" },
      { label: "Lighthouse Performance", value: "99", unit: "/100" },
      { label: "Cumulative Layout Shift", value: "0.00", unit: "" },
    ],
    codeSample: {
      filename: "app/products/page.tsx",
      language: "typescript",
      code: `// Next.js 15 Server Component with Edge Cache Tagging
import { Suspense } from 'react';
import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';

const getProducts = unstable_cache(
  async (category: string) => {
    return await db.query.products.findMany({
      where: (p, { eq }) => eq(p.category, category),
      limit: 24,
    });
  },
  ['products-edge-cache'],
  { revalidate: 3600, tags: ['products'] }
);

export default async function ProductsCatalog({ searchParams }) {
  const { cat = 'featured' } = await searchParams;
  const products = await getProducts(cat);

  return (
    <Suspense fallback={<ProductSkeleton count={8} />}>
      <ProductGrid items={products} edgeRendered={true} />
    </Suspense>
  );
}`,
    },
    pipelineNodes: [
      { label: "Browser Request", sublabel: "HTTP/3 QUIC Handshake", status: "Active" },
      { label: "Edge Worker (Anycast)", sublabel: "Cache Validation & Geo-Routing", status: "32ms" },
      { label: "React 19 RSC Node", sublabel: "Streaming HTML & Server Action", status: "Stream" },
      { label: "Neon Postgres / Redis", sublabel: "Tagged DB Read & Row-Level Security", status: "Zero-Wait" },
    ],
  },
  {
    id: "realtime-webrtc",
    badge: "High-Concurrency Real-Time Mesh",
    title: "Sub-30ms Bidirectional Audio, Video & Data",
    summary:
      "Native browser-to-browser WebRTC P2P mesh combined with Redis Pub/Sub WebSocket gateways. Delivers broadcast voice rooms, screen streaming, and cooperative workspaces with ultra-low latency.",
    subtitle: "Hardware-accelerated VP9/H.264 with STUN/TURN failover",
    highlights: [
      "Direct peer-to-peer data channels bypassing central servers",
      "Automatic fallback to low-latency TURN relay nodes",
      "State synchronization via CRDTs (Conflict-Free Replicated Data Types)",
      "Adaptive bitrate algorithms matching erratic mobile bandwidths",
    ],
    metrics: [
      { label: "End-to-End Latency", value: "<26", unit: "ms" },
      { label: "Frame Rate Stability", value: "60", unit: "FPS" },
      { label: "Network Overhead", value: "-65", unit: "%" },
      { label: "Connection Reliability", value: "99.9", unit: "%" },
    ],
    codeSample: {
      filename: "services/webrtc/PeerMesh.ts",
      language: "typescript",
      code: `// Low-latency WebRTC DataChannel + Audio Mesh Orchestration
export class PeerConnectionManager {
  private pc: RTCPeerConnection;
  private channel: RTCDataChannel;

  constructor(config: RTCConfiguration) {
    this.pc = new RTCPeerConnection(config);
    this.channel = this.pc.createDataChannel('telemetry', {
      ordered: false, // Low-latency datagram mode
      maxRetransmits: 0,
    });

    this.channel.onmessage = (event) => {
      const packet = new Uint8Array(event.data);
      this.handleStreamFrame(packet);
    };
  }

  public async broadcastInput(coords: [number, number]): Promise<void> {
    if (this.channel.readyState === 'open') {
      const buffer = new Float32Array(coords);
      this.channel.send(buffer);
    }
  }
}`,
    },
    pipelineNodes: [
      { label: "Host Client", sublabel: "MediaStream Capture & VP9 Enc", status: "60 FPS" },
      { label: "Signaling Hub", sublabel: "WebSocket SDP & ICE Exchange", status: "Sub-15ms" },
      { label: "P2P WebRTC Mesh", sublabel: "AES-256 Encrypted Datagrams", status: "<28ms" },
      { label: "Subscriber Peer", sublabel: "Zero-Copy WebGL Canvas Render", status: "Synced" },
    ],
  },
  {
    id: "saas-multitenant",
    badge: "Enterprise SaaS & Tenant Partitioning",
    title: "Multi-Tenant Cloud ERP & Microservices",
    summary:
      "Hardened cloud architectures for B2B SaaS. We enforce schema-level tenant isolation, row-level security policies (RLS), distributed Redis rate limiters, and automated audit trails.",
    subtitle: "Built to handle compliance audits, GST/VAT pipelines & SOC 2",
    highlights: [
      "PostgreSQL Row-Level Security (RLS) guaranteeing zero tenant data leak",
      "Stripe & Razorpay webhook reconciliation with idempotency keys",
      "Granular Role-Based Access Control (RBAC) with fine permissions",
      "Audit logs with immutable event streams for enterprise compliance",
    ],
    metrics: [
      { label: "Tenant Isolation", value: "100", unit: "% Strict" },
      { label: "Peak QPS Capacity", value: "8,500", unit: "req/s" },
      { label: "Database Read SLA", value: "<1.8", unit: "ms" },
      { label: "Audit Compliance", value: "SOC2", unit: "Ready" },
    ],
    codeSample: {
      filename: "server/middleware/tenantContext.ts",
      language: "typescript",
      code: `// PostgreSQL Row-Level Security Session Injector
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from '@/lib/auth/jwt';
import { sql } from 'drizzle-orm';

export async function tenantMiddleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  const session = await verifyJwt(token);

  if (!session?.tenantId) {
    return NextResponse.json({ error: 'Tenant context missing' }, { status: 401 });
  }

  // Set session tenant in PostgreSQL connection pool
  await sql\`SET LOCAL app.current_tenant_id = \${session.tenantId}\`;
  
  const response = NextResponse.next();
  response.headers.set('X-Tenant-Id', session.tenantId);
  return response;
}`,
    },
    pipelineNodes: [
      { label: "API Gateway", sublabel: "JWT Validation & Distributed Rate Limit", status: "Passed" },
      { label: "Tenant Context", sublabel: "Dynamic Schema & RLS Parameterization", status: "Secured" },
      { label: "Postgres Cluster", sublabel: "Write-Ahead Logs & High-Throughput IOPS", status: "Primary" },
      { label: "Redis Worker", sublabel: "BullMQ Background Invoicing Queue", status: "0.2s Avg" },
    ],
  },
  {
    id: "headless-ecommerce",
    badge: "Headless Composable Commerce",
    title: "Sub-Second Checkout & Scalable Catalogs",
    summary:
      "Decoupled ecommerce frontends with headless backends. Replaces heavy monolithic stores with lightning-fast catalog querying, dynamic pricing rules, and frictionless single-step checkouts.",
    subtitle: "Achieves +35% cart conversion and eliminates checkout churn",
    highlights: [
      "Incremental build validation for million-SKU product inventories",
      "Omnichannel sync with ERP systems, Amazon, and warehouse APIs",
      "Optimistic UI updates for add-to-cart with zero network delay feeling",
      "Global Stripe Checkout orchestration with localized currencies",
    ],
    metrics: [
      { label: "Checkout Load Time", value: "480", unit: "ms" },
      { label: "Cart Conversion Lift", value: "+38", unit: "%" },
      { label: "Mobile Bounce Drop", value: "-44", unit: "%" },
      { label: "Catalog Query Time", value: "<12", unit: "ms" },
    ],
    codeSample: {
      filename: "app/cart/actions.ts",
      language: "typescript",
      code: `'use server';
// Atomic Headless Cart Reservation with Optimistic Lock
import { redis } from '@/lib/redis';
import { db } from '@/lib/db';
import { revalidateTag } from 'next/cache';

export async function reserveCartItem(cartId: string, sku: string, qty: number) {
  const stockKey = \`inventory:stock:\${sku}\`;
  
  // Atomic decrement via Redis Lua script to prevent overselling
  const available = await redis.decrby(stockKey, qty);
  if (available < 0) {
    await redis.incrby(stockKey, qty);
    return { success: false, reason: 'OUT_OF_STOCK' };
  }

  await db.insert(cartItems).values({ cartId, sku, quantity: qty });
  revalidateTag(\`cart:\${cartId}\`);
  return { success: true, remaining: available };
}`,
    },
    pipelineNodes: [
      { label: "Edge Storefront", sublabel: "Headless Next.js Static Catalog", status: "Instant" },
      { label: "Redis Inventory", sublabel: "Atomic Lua Script Stock Decrement", status: "Atomic" },
      { label: "Payment Gateway", sublabel: "Stripe PaymentIntent & Webhook Listener", status: "Verified" },
      { label: "Fulfillment Sync", sublabel: "Warehouse Dispatch API Trigger", status: "Dispatched" },
    ],
  },
];

export interface CoreVitalsMetric {
  name: string;
  key: string;
  score: string;
  target: string;
  industryAvg: string;
  description: string;
  status: "exceptional" | "optimal";
}

export const CORE_WEB_VITALS: CoreVitalsMetric[] = [
  {
    name: "Time to First Byte",
    key: "TTFB",
    score: "42ms",
    target: "< 100ms",
    industryAvg: "480ms",
    description: "Ultra-fast server response delivered via geographically distributed edge serverless runtimes.",
    status: "exceptional",
  },
  {
    name: "First Contentful Paint",
    key: "FCP",
    score: "0.4s",
    target: "< 1.2s",
    industryAvg: "2.1s",
    description: "Critical CSS inlining and zero-render-blocking scripts ensure instant screen render.",
    status: "exceptional",
  },
  {
    name: "Largest Contentful Paint",
    key: "LCP",
    score: "0.8s",
    target: "< 2.5s",
    industryAvg: "3.4s",
    description: "AVIF/WebP image optimization and priority prefetching load hero elements immediately.",
    status: "exceptional",
  },
  {
    name: "Cumulative Layout Shift",
    key: "CLS",
    score: "0.000",
    target: "< 0.05",
    industryAvg: "0.180",
    description: "Strict aspect-ratio sizing and layout reservation eliminate irritating UI jumps.",
    status: "optimal",
  },
];
