/* eslint-disable @next/next/no-img-element */
export const dynamic = "force-dynamic";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  let categoryFilter = null;
  if (slug && slug[0] === "category") {
    categoryFilter = slug[1] || null;
  }

  const defaultTitle =
    "Latest Blogs | Ecoensa Private Limited | Organic Superfoods & Health Updates";
  const defaultDesc =
    "Stay updated with the latest blogs from Ecoensa Private Limited. Explore organic farming updates, health insights, A2 ghee benefits, and pure spices.";

  if (!categoryFilter) {
    return { title: defaultTitle, description: defaultDesc };
  }

  try {
    const res = await fetch(
      `https://test.edu2all.in/blog/api/admin/categories?t=${Date.now()}`,
      { cache: "no-store" },
    );
    const result = await res.json();
    const allCategories = result.data || [];

    const activeCategory = allCategories.find(
      (c) => c.name.toLowerCase() === categoryFilter.toLowerCase(),
    );

    return {
      title: activeCategory
        ? `${activeCategory.metaTitle} | Ecoensa`
        : `${categoryFilter} Blogs | Ecoensa`,
      description: activeCategory
        ? activeCategory.metaDescription
        : `Read the latest blogs about ${categoryFilter}.`,
    };
  } catch (error) {
    const fallbackImage = "/images/logo.png";
    return {
      title: `${categoryFilter} Blogs | Ecoensa`,
      description: defaultDesc,
      openGraph: {
        title: `${categoryFilter} Blogs | Ecoensa`,
        description: defaultDesc,
        images: [fallbackImage],
      },
      twitter: {
        card: "summary_large_image",
        title: `${categoryFilter} Blogs | Ecoensa`,
        description: defaultDesc,
        images: [fallbackImage],
      },
    };
  }
}

async function getAllNews() {
  try {
    let allData = [];
    let fetchPage = 1;
    let backendTotalPages = 1;
    do {
      const res = await fetch(
        `https://test.edu2all.in/blog/api/blogs?page=${fetchPage}&t=${Date.now()}`,
        { cache: "no-store" },
      );
      const result = await res.json();
      const pageData = Array.isArray(result)
        ? result
        : result.data || result.blogs || [];
      const filteredData = pageData.filter(
        (blog) => blog.status === "show" && blog.categoryId?.status === "show",
      );
      allData = [...allData, ...filteredData];
      backendTotalPages = result.totalPages || 1;
      fetchPage++;
    } while (fetchPage <= backendTotalPages);
    return allData;
  } catch (error) {
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(
      `https://test.edu2all.in/blog/api/admin/categories?t=${Date.now()}`,
      { cache: "no-store" },
    );
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    return [];
  }
}

const formatDate = (dateString) => {
  if (!dateString) return "Recent";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const resolveImageUrl = (url) => {
  if (!url) return "/images/logo.png";
  if (url.startsWith("http")) return url;
  return `https://test.edu2all.in/blog${url.startsWith("/") ? "" : "/"}${url}`;
};

// Dynamic helper to extract Author Name from API string/email/object
const getAuthorName = (news) => {
  const rawAuthor = news?.authorName || news?.addedByName || news?.author || news?.addedBy || news?.name;

  if (!rawAuthor) return "Ecoensa Team";

  if (typeof rawAuthor === "object") {
    return rawAuthor.name || rawAuthor.username || rawAuthor.fullName || "Ecoensa Team";
  }

  if (typeof rawAuthor === "string") {
    const trimmed = rawAuthor.trim();
    if (trimmed.includes("@")) {
      const emailUser = trimmed.split("@")[0];
      return emailUser
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }
    return trimmed;
  }

  return "Ecoensa Team";
};

export default async function NewsPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  let categoryFilter = null;
  let currentPage = 1;

  if (slug && slug.length > 0) {
    if (slug[0] === "category") {
      categoryFilter = slug[1] || null;
      if (slug[2] === "page" && slug[3]) {
        currentPage = parseInt(slug[3], 10) || 1;
      }
    } else if (slug[0] === "page" && slug[1]) {
      currentPage = parseInt(slug[1], 10) || 1;
    }
  }

  const [allNews, allCategories] = await Promise.all([
    getAllNews(),
    getCategories(),
  ]);

  const filteredNews = categoryFilter
    ? allNews.filter((news) => {
        const catObj = news.categoryId || news.category || news.Category;
        const itemSlug = catObj?.slug 
          ? catObj.slug.toLowerCase().trim() 
          : (typeof catObj === 'object' ? catObj?.name : catObj)?.toLowerCase().trim().replace(/\s+/g, '-');
        
        return itemSlug === categoryFilter.toLowerCase().trim();
      })
    : allNews;

  const activeCategory = categoryFilter
    ? allCategories.find(
        (c) => 
          (c.slug && c.slug.toLowerCase() === categoryFilter.toLowerCase()) || 
          (c.name && c.name.toLowerCase().replace(/\s+/g, '-') === categoryFilter.toLowerCase())
      )
    : null;

  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const currentNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getPageUrl = (page) => {
    if (categoryFilter) {
      return page === 1
        ? `/blog/category/${encodeURIComponent(categoryFilter)}`
        : `/blog/category/${encodeURIComponent(categoryFilter)}/page/${page}`;
    }
    return page === 1 ? `/blog` : `/blog/page/${page}`;
  };

  const pageNumbers = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => {
      let start = Math.max(1, currentPage - 2);
      if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);
      return start + i;
    },
  ).filter((p) => p <= totalPages);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between font-sans text-slate-900">
      <Header />

      {/* ECOENSA HERO BANNER */}
      <div className="w-full bg-gradient-to-br from-emerald-950 via-[#046A38] to-slate-950 text-white py-12 sm:py-16 px-4 sm:px-8 text-center relative overflow-hidden shadow-md">
        <div className="relative z-20 max-w-[1400px] mx-auto w-full space-y-3">
          <span className="text-xs font-black uppercase text-amber-300 bg-white/10 px-4 py-1.5 rounded-full inline-block border border-white/20 tracking-widest">
            🌿 Ecoensa Wellness Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            {activeCategory ? activeCategory.mainHeading : "Ecoensa Private Limited - Latest Blogs"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed">
            {activeCategory 
              ? activeCategory.shortDescription 
              : "Stay updated with the latest insights on organic superfoods, A2 Ghee benefits, pesticide-free spices, health tips, and Ayurvedic living."}
          </p>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* GLOBAL 1400PX CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full py-12 md:py-16 flex-grow space-y-10">
        {currentNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {currentNews.map((news, index) => {
                const dynamicId = news.slug || news._id || news.id || index;

                const imageSource =
                  news.featureImage ||
                  news.coverImage ||
                  news.image ||
                  news.imageUrl ||
                  news.thumbnail;
                const finalImage = resolveImageUrl(imageSource);
                const imageAlt =
                  news.coverAlt ||
                  news.featureAlt ||
                  news.title ||
                  "News Image";

                return (
                  <div
                    key={dynamicId}
                    className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full p-5 space-y-4"
                  >
                    <div className="space-y-4">
                      {/* IMAGE CONTAINER */}
                      <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-slate-100">
                        <Link
                          href={`/blog/${encodeURIComponent(dynamicId)}`}
                          className="block w-full h-full"
                        >
                          <img
                            src={finalImage}
                            alt={imageAlt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      </div>

                      {/* META DETAILS */}
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-[#046A38]" />
                          <span>{formatDate(news.createdAt || news.date)}</span>
                        </span>
                        <span className="truncate max-w-[140px] text-slate-700 font-extrabold">
                          By {getAuthorName(news)}
                        </span>
                      </div>

                      {/* TITLE */}
                      <Link
                        href={`/blog/${encodeURIComponent(dynamicId)}`}
                        className="block"
                      >
                        <h2 className="text-lg font-serif font-black text-slate-900 line-clamp-2 group-hover:text-[#046A38] transition-colors leading-snug">
                          {news.title || "Latest News Update"}
                        </h2>
                      </Link>

                      {/* EXCERPT */}
                      <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                        {news.metaDescription ||
                          (news.content
                            ? news.content.replace(/<[^>]+>/g, "")
                            : "Read our latest technology updates and business insights.")}
                      </p>
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="pt-3 border-t border-slate-100 flex justify-end">
                      <Link
                        href={`/blog/${encodeURIComponent(dynamicId)}`}
                        className="bg-black hover:bg-slate-800 text-white font-extrabold text-xs py-2.5 px-5 rounded-xl transition-all shadow-md inline-flex items-center space-x-1.5 cursor-pointer"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                {currentPage > 1 ? (
                  <Link
                    href={getPageUrl(currentPage - 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Link>
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed">
                    <ChevronLeft className="w-5 h-5" />
                  </span>
                )}

                {pageNumbers.map((page) => (
                  <Link
                    key={page}
                    href={getPageUrl(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-xs transition-all duration-300 ${
                      page === currentPage
                        ? "bg-[#046A38] text-white shadow-md border border-[#046A38]"
                        : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </Link>
                ))}

                {currentPage < totalPages ? (
                  <Link
                    href={getPageUrl(currentPage + 1)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors shadow-xs"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-300 cursor-not-allowed">
                    <ChevronRight className="w-5 h-5" />
                  </span>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-3">
            <h2 className="text-xl font-serif font-black text-slate-900">
              No News Found
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Check back later for more updates from our team, or try refreshing the page.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}