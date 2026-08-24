



// /* eslint-disable @next/next/no-img-element */
// export const dynamic = "force-dynamic";

// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { Calendar, User, ArrowLeft } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// // ==========================================
// // 100% LIVE API CONFIGURATION
// const API_BASE = "https://moteligo.in/ecoback";
// // ==========================================

// // --- GLOBAL UTILS ---
// const getCategoryString = (item) => {
//   if (!item) return "";
//   const cat = item.category || item.Category || item.categoryId;
//   if (!cat) return "";
//   if (typeof cat === "object") return cat.name || cat.title || "";
//   return String(cat).trim();
// };

// const formatDate = (dateString) => {
//   if (!dateString) return "Recent";
//   return new Date(dateString).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// };

// const resolveImageUrl = (url) => {
//   if (!url) return "/images/logo.png";
//   if (url.startsWith("http")) return url;
//   if (url.startsWith("/")) return `${API_BASE}${url}`;
//   return `${API_BASE}/${url}`;
// };

// const resolveBannerUrl = (url) => {
//   if (!url) return null;
//   let finalUrl = url;
//   if (url.startsWith("http")) {
//     finalUrl = url;
//   } else if (url.startsWith("/")) {
//     finalUrl = `${API_BASE}${url}`;
//   } else {
//     finalUrl = `${API_BASE}/${url}`;
//   }
//   return `${finalUrl}${finalUrl.includes("?") ? "&" : "?"}cb=${Date.now()}`;
// };

// // Dynamic helper to extract Author Name from API string/email/object
// const getAuthorName = (news) => {
//   const rawAuthor = news?.authorName || news?.addedByName || news?.author || news?.addedBy || news?.name;

//   if (!rawAuthor) return "Ecoensa Team";

//   if (typeof rawAuthor === "object") {
//     return rawAuthor.name || rawAuthor.username || rawAuthor.fullName || "Ecoensa Team";
//   }

//   if (typeof rawAuthor === "string") {
//     const trimmed = rawAuthor.trim();
//     if (trimmed.includes("@")) {
//       const emailUser = trimmed.split("@")[0];
//       return emailUser
//         .replace(/[._-]/g, " ")
//         .replace(/\b\w/g, (char) => char.toUpperCase());
//     }
//     return trimmed;
//   }

//   return "Ecoensa Team";
// };

// // --- API FETCHERS ---
// async function getAllNews() {
//   try {
//     let allData = [];
//     let fetchPage = 1;
//     let backendTotalPages = 1;
//     do {
//       const res = await fetch(
//         `${API_BASE}/api/blogs?page=${fetchPage}&t=${Date.now()}`,
//         { cache: "no-store" },
//       );
//       if (!res.ok) break;
//       const result = await res.json();
//       const pageData = Array.isArray(result)
//         ? result
//         : result.data || result.blogs || [];
//       const filteredData = pageData.filter(
//         (blog) => blog.status === "show" && blog.categoryId?.status === "show",
//       );
//       allData = [...allData, ...filteredData];
//       backendTotalPages = result.totalPages || 1;
//       fetchPage++;
//     } while (fetchPage <= backendTotalPages);
//     return allData;
//   } catch (error) {
//     return [];
//   }
// }

// async function getCategories() {
//   try {
//     const res = await fetch(
//       `${API_BASE}/api/admin/categories?t=${Date.now()}`,
//       { cache: "no-store" },
//     );
//     if (!res.ok) return [];
//     const result = await res.json();
//     return result.data || [];
//   } catch (error) {
//     return [];
//   }
// }

// async function getSingleNews(id) {
//   try {
//     const res = await fetch(
//       `${API_BASE}/api/blogs/${id}?t=${Date.now()}`,
//       { cache: "no-store" },
//     );
//     if (!res.ok) return null;
//     const result = await res.json();
//     const blog = result.data || result.blog || result;
//     return blog && blog.status === "show" && blog.categoryId?.status === "show"
//       ? blog
//       : null;
//   } catch (error) {
//     return null;
//   }
// }

// async function getDynamicBanner() {
//   try {
//     const res = await fetch(
//       `${API_BASE}/api/dynamic-images?t=${Date.now()}`,
//       { cache: "no-store" },
//     );
//     if (!res.ok) return null;
//     const result = await res.json();
//     if (result.data && Array.isArray(result.data)) {
//       const active = result.data
//         .filter((item) => item.status === "show")
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       return active[0] || null;
//     }
//     return null;
//   } catch (error) {
//     return null;
//   }
// }

// // --- SEO METADATA ---
// export async function generateMetadata({ params }) {
//   const resolvedParams = await params;
//   const rawId = resolvedParams?.id || params?.id;
//   if (!rawId) return { title: "Blog Not Found - Ecoensa" };

//   const searchId = decodeURIComponent(rawId);
//   const allNews = await getAllNews();
//   const newsItem = allNews.find(
//     (item) =>
//       item.slug === searchId || item._id === searchId || item.id == searchId,
//   );

//   if (!newsItem) return { title: "Blog Not Found - Ecoensa" };

//   return {
//     title: newsItem.metaTitle || `${newsItem.title} - Ecoensa Organic Blog`,
//     description:
//       newsItem.metaDescription || newsItem.description || newsItem.excerpt,
//     keywords: newsItem.metaKeywords || [],
//     openGraph: {
//       title: newsItem.metaTitle || newsItem.title,
//       images: [resolveImageUrl(newsItem.coverImage || newsItem.featureImage)],
//     },
//     canonical: `https://www.ecoensa.com/blog/${searchId}`,
//     Twitter: {
//       card: "summary_large_image",
//       title: newsItem.metaTitle || newsItem.title,
//       description: newsItem.metaDescription || newsItem.description || newsItem.excerpt,
//       images: [resolveImageUrl(newsItem.coverImage || newsItem.featureImage)],
//     },
//   };
// }

// export default async function NewsDetailPage({ params }) {
//   const resolvedParams = await params;
//   const rawId = resolvedParams?.id || params?.id;
//   if (!rawId) notFound();

//   const searchId = decodeURIComponent(rawId);

//   let newsItem = await getSingleNews(searchId);
//   const allNews = await getAllNews();
//   const allCategories = await getCategories();

//   if (!newsItem || !newsItem.title) {
//     newsItem = allNews.find(
//       (item, index) =>
//         item.slug === searchId ||
//         item._id === searchId ||
//         item.id == searchId ||
//         index.toString() === searchId,
//     );
//   }

//   if (!newsItem) notFound();

//   // --- UPDATED RELATED NEWS LOGIC ---
//   const currentCategory = getCategoryString(newsItem);

//   let latestNews = allNews.filter((item) => {
//     const itemCat = getCategoryString(item);
//     const isSameCategory = 
//       currentCategory !== "" && 
//       itemCat.toLowerCase().trim() === currentCategory.toLowerCase().trim();
    
//     const isNotCurrentPost = 
//       (item._id || item.slug || item.id) !== (newsItem._id || newsItem.slug || newsItem.id);

//     return isSameCategory && isNotCurrentPost;
//   });

//   // Banner Logic
//   const dynamicBannerData = await getDynamicBanner();
//   let rawLink = dynamicBannerData?.relatedLink || "#";
//   let finalLink = rawLink;

//   if (rawLink !== "#") {
//     const phoneRegex = /^[+]?[0-9\s\-]{9,}$/;

//     if (phoneRegex.test(rawLink)) {
//       finalLink = `tel:${rawLink.replace(/[\s\-]/g, "")}`;
//     } else if (
//       rawLink.startsWith("http") ||
//       rawLink.startsWith("/") ||
//       rawLink.startsWith("tel:") ||
//       rawLink.startsWith("mailto:")
//     ) {
//       finalLink = rawLink;
//     } else if (
//       rawLink.includes(".com") ||
//       rawLink.includes(".in") ||
//       rawLink.includes("www.")
//     ) {
//       finalLink = `https://${rawLink}`;
//     } else {
//       finalLink = `/${rawLink}`;
//     }
//   }

//   const card1 = dynamicBannerData
//     ? {
//         heading: dynamicBannerData.heading,
//         shortDescription: dynamicBannerData.shortDescription,
//         buttonText: dynamicBannerData.buttonText || "Call Now",
//         relatedLink: finalLink,
//         imageUrl: dynamicBannerData.featureImage
//           ? resolveBannerUrl(dynamicBannerData.featureImage)
//           : null,
//         alt: dynamicBannerData.featureAlt || dynamicBannerData.heading,
//       }
//     : {
//         heading: "Explore Organic Range",
//         shortDescription:
//           "Taste authentic farm-fresh spices, A2 Gir cow ghee & wild honey.",
//         buttonText: "Shop Products",
//         relatedLink: "/shop",
//         imageUrl: null,
//         alt: "Shop Ecoensa Products",
//       };

//   const card2 = {
//     heading: "Need Assistance?",
//     shortDescription:
//       "Talk to our organic food experts and get direct bulk supply guidance.",
//     buttonText: "Contact Us Now",
//     relatedLink: "/contact",
//     imageUrl: null,
//     alt: "Need Help",
//   };

//   const authorName = getAuthorName(newsItem);
//   const authorBlogCount = allNews.filter((item) => {
//     const itemAuthor = getAuthorName(item);
//     return itemAuthor.toLowerCase() === authorName.toLowerCase();
//   }).length;

//   const currentUrl = `https://ecoensa.com/blog/${searchId}`;

//   const finalMainImage = resolveImageUrl(
//     newsItem.coverImage ||
//       newsItem.featureImage ||
//       newsItem.image ||
//       newsItem.imageUrl,
//   );

//   return (
//     <div className="bg-slate-50 min-h-screen flex flex-col justify-between font-sans text-slate-900">
//       <Header />

//       {/* COMPACT ECOENSA GREEN HERO BANNER */}
//       <div className="w-full bg-gradient-to-br from-emerald-950 via-[#046A38] to-slate-950 text-white py-12 sm:py-16 px-4 sm:px-8 relative overflow-hidden shadow-md">
//         <div className="relative z-20 max-w-[1400px] mx-auto w-full space-y-4">
//           {/* <Link
//             href="/blog"
//             className="inline-flex items-center space-x-1.5 text-xs font-black text-amber-300 hover:underline"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span>Back to All Blogs</span>
//           </Link> */}
//           <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-white leading-tight max-w-5xl">
//             {newsItem.title}
//           </h1>
//           {getCategoryString(newsItem) && (
//             <span className="inline-block bg-white/10 text-amber-300 font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
//               {getCategoryString(newsItem)}
//             </span>
//           )}
//         </div>
//         <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />
//       </div>

//       {/* GLOBAL 1400PX CONTAINER */}
//       <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full py-12 md:py-16 flex-grow">
//         <div className="flex flex-col lg:flex-row gap-10">
          
//           {/* MAIN ARTICLE BODY */}
//           <div className="w-full lg:w-2/3 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md space-y-6">

//             <div className="w-full rounded-2xl overflow-hidden bg-slate-100 flex justify-center items-center">
//               <img
//                 src={finalMainImage}
//                 alt={newsItem.title}
//                 className="w-full h-auto max-h-[500px] object-contain"
//               />
//             </div>

//             <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-4">
//               <div className="flex items-center space-x-1.5">
//                 <Calendar className="w-4 h-4 text-[#046A38]" />
//                 <span>{formatDate(newsItem.createdAt || newsItem.date)}</span>
//               </div>
//               <div className="flex items-center space-x-1.5">
//                 <User className="w-4 h-4 text-[#046A38]" />
//                 <span>
//                   {authorName} ({authorBlogCount}{" "}
//                   {authorBlogCount === 1 ? "Blog" : "Blogs"})
//                 </span>
//               </div>
//             </div>

//             {newsItem.content ? (
//               <div 
//                 className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium text-sm sm:text-base space-y-4"
//                 dangerouslySetInnerHTML={{ __html: newsItem.content }} 
//               />
//             ) : (
//               <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium text-sm sm:text-base">
//                 <p>{newsItem.description}</p>
//               </div>
//             )}

//             {/* SHARE BUTTONS WITH INLINE SVG ICONS (NO IMPORT ERROR) */}
//             <div className="mt-10 pt-6 border-t border-slate-100 space-y-3">
//               <h2 className="text-sm font-serif font-black text-slate-900 uppercase tracking-wider">
//                 Share This Post
//               </h2>
//               <div className="flex space-x-3">
//                 <a
//                   href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(newsItem.title)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
//                   title="Share on Facebook"
//                 >
//                   <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                   </svg>
//                 </a>
//                 <a
//                   href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(newsItem.title)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
//                   title="Share on Twitter"
//                 >
//                   <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                     <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
//                   </svg>
//                 </a>
//                 <a
//                   href={`https://api.whatsapp.com/send?text=${encodeURIComponent(newsItem.title)}%20${currentUrl}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
//                   title="Share on WhatsApp"
//                 >
//                   <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
//                   </svg>
//                 </a>
//                 <a
//                   href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${encodeURIComponent(newsItem.title)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-9 h-9 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
//                   title="Share on LinkedIn"
//                 >
//                   <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
//                     <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
//                   </svg>
//                 </a>
//               </div>
//             </div>

//           </div>

//           {/* RIGHT SIDEBAR */}
//           <div className="w-full lg:w-1/3 space-y-6">
//             {/* RELATED NEWS */}
//             <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md space-y-4">
//               <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3">
//                 Related Articles
//               </h3>
//               {latestNews.length > 0 ? (
//                 <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
//                   {latestNews.map((news, idx) => {
//                     const dynamicId = news.slug || news._id || news.id || idx;
//                     return (
//                       <Link
//                         href={`/blog/${dynamicId}`}
//                         key={dynamicId}
//                         className="flex items-center space-x-3 group"
//                       >
//                         <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
//                           <img
//                             src={resolveImageUrl(
//                               news.coverImage ||
//                                 news.featureImage ||
//                                 news.image ||
//                                 news.imageUrl,
//                             )}
//                             alt={news.title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                           />
//                         </div>
//                         <div>
//                           <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#046A38] transition-colors line-clamp-2">
//                             {news.title}
//                           </h4>
//                           <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
//                             {formatDate(news.createdAt || news.date)}
//                           </span>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <p className="text-xs font-bold text-slate-500">No related news found.</p>
//               )}
//             </div>

//             {/* CATEGORIES */}
//             <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md space-y-4">
//               <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3">
//                 Article Categories
//               </h3>
//               {allCategories.length > 0 ? (
//                 <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
//                   {allCategories.map((cat) => {
//                     const categoryCount = allNews.filter(
//                       (item) =>
//                         getCategoryString(item).toLowerCase() ===
//                         cat.name.toLowerCase(),
//                     ).length;

//                     return (
//                       <Link
//                         href={`/blog/category/${encodeURIComponent(cat.slug || cat.name)}`} 
//                         key={cat._id}
//                         className="block group p-3 border border-slate-200/80 rounded-2xl hover:border-[#046A38] transition-all"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
//                             <img
//                               src={resolveImageUrl(cat.image)}
//                               alt={cat.name}
//                               className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                             />
//                           </div>

//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center justify-between gap-1">
//                               <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#046A38] transition-colors truncate">
//                                 {cat.name}
//                               </h4>
//                               <span className="text-[10px] font-black text-[#046A38] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
//                                 {categoryCount}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <p className="text-xs font-bold text-slate-500">No categories found.</p>
//               )}
//             </div>

//             {/* CARD 1 */}
//             <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md text-center space-y-3">
//               {card1.imageUrl && (
//                 <Link
//                   href={card1.relatedLink}
//                   target={
//                     card1.relatedLink.startsWith("http") ? "_blank" : "_self"
//                   }
//                   rel="noopener noreferrer"
//                   className="block overflow-hidden rounded-2xl mb-3"
//                 >
//                   <img
//                     src={card1.imageUrl}
//                     alt={card1.alt}
//                     className="w-full h-auto object-cover hover:scale-105 transition-transform"
//                   />
//                 </Link>
//               )}
//               <h3 className="text-base font-serif font-black text-slate-900">
//                 {card1.heading}
//               </h3>
//               <p className="text-xs text-slate-600 font-medium">
//                 {card1.shortDescription}
//               </p>
//               <Link
//                 href={card1.relatedLink}
//                 className="block w-full bg-[#046A38] hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all uppercase"
//               >
//                 {card1.buttonText}
//               </Link>
//             </div>

//             {/* CARD 2 */}
//             <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md text-center space-y-3">
//               <h3 className="text-base font-serif font-black text-slate-900">
//                 {card2.heading}
//               </h3>
//               <p className="text-xs text-slate-600 font-medium">
//                 {card2.shortDescription}
//               </p>
//               <Link
//                 href={card2.relatedLink}
//                 className="block w-full bg-black hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all uppercase"
//               >
//                 {card2.buttonText}
//               </Link>
//             </div>

//           </div>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }





/* eslint-disable @next/next/no-img-element */
export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ==========================================
// 100% LIVE API CONFIGURATION
const API_BASE = "https://moteligo.in/ecoback";
// ==========================================

// --- GLOBAL UTILS ---
const getCategoryString = (item) => {
  if (!item) return "";
  const cat = item.category || item.Category || item.categoryId;
  if (!cat) return "";
  if (typeof cat === "object") return cat.name || cat.title || "";
  return String(cat).trim();
};

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
  if (url.startsWith("/")) return `${API_BASE}${url}`;
  return `${API_BASE}/${url}`;
};

const resolveBannerUrl = (url) => {
  if (!url) return null;
  let finalUrl = url;
  if (url.startsWith("http")) {
    finalUrl = url;
  } else if (url.startsWith("/")) {
    finalUrl = `${API_BASE}${url}`;
  } else {
    finalUrl = `${API_BASE}/${url}`;
  }
  return `${finalUrl}${finalUrl.includes("?") ? "&" : "?"}cb=${Date.now()}`;
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

// --- API FETCHERS ---
async function getAllNews() {
  try {
    let allData = [];
    let fetchPage = 1;
    let backendTotalPages = 1;
    do {
      const res = await fetch(
        `${API_BASE}/api/blogs?page=${fetchPage}&t=${Date.now()}`,
        { cache: "no-store" },
      );
      if (!res.ok) break;
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
      `${API_BASE}/api/admin/categories?t=${Date.now()}`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    return [];
  }
}

async function getSingleNews(id) {
  try {
    const res = await fetch(
      `${API_BASE}/api/blogs/${id}?t=${Date.now()}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const result = await res.json();
    const blog = result.data || result.blog || result;
    return blog && blog.status === "show" && blog.categoryId?.status === "show"
      ? blog
      : null;
  } catch (error) {
    return null;
  }
}

async function getDynamicBanner() {
  try {
    const res = await fetch(
      `${API_BASE}/api/dynamic-images?t=${Date.now()}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const result = await res.json();
    if (result.data && Array.isArray(result.data)) {
      const active = result.data
        .filter((item) => item.status === "show")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return active[0] || null;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// --- SEO METADATA ---
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const rawId = resolvedParams?.id || params?.id;
  if (!rawId) return { title: "Blog Not Found - Ecoensa" };

  const searchId = decodeURIComponent(rawId);
  const allNews = await getAllNews();
  const newsItem = allNews.find(
    (item) =>
      item.slug === searchId || item._id === searchId || item.id == searchId,
  );

  if (!newsItem) return { title: "Blog Not Found - Ecoensa" };

  return {
    title: newsItem.metaTitle || `${newsItem.title} - Ecoensa Organic Blog`,
    description:
      newsItem.metaDescription || newsItem.description || newsItem.excerpt,
    keywords: newsItem.metaKeywords || [],
    openGraph: {
      title: newsItem.metaTitle || newsItem.title,
      images: [resolveImageUrl(newsItem.coverImage || newsItem.featureImage)],
    },
    canonical: `https://www.ecoensa.com/blog/${searchId}`,
    Twitter: {
      card: "summary_large_image",
      title: newsItem.metaTitle || newsItem.title,
      description: newsItem.metaDescription || newsItem.description || newsItem.excerpt,
      images: [resolveImageUrl(newsItem.coverImage || newsItem.featureImage)],
    },
  };
}

export default async function NewsDetailPage({ params }) {
  const resolvedParams = await params;
  const rawId = resolvedParams?.id || params?.id;
  if (!rawId) notFound();

  const searchId = decodeURIComponent(rawId);

  let newsItem = await getSingleNews(searchId);
  const allNews = await getAllNews();
  const allCategories = await getCategories();

  if (!newsItem || !newsItem.title) {
    newsItem = allNews.find(
      (item, index) =>
        item.slug === searchId ||
        item._id === searchId ||
        item.id == searchId ||
        index.toString() === searchId,
    );
  }

  if (!newsItem) notFound();

  // --- UPDATED RELATED NEWS LOGIC ---
  const currentCategory = getCategoryString(newsItem);

  let latestNews = allNews.filter((item) => {
    const itemCat = getCategoryString(item);
    const isSameCategory = 
      currentCategory !== "" && 
      itemCat.toLowerCase().trim() === currentCategory.toLowerCase().trim();
    
    const isNotCurrentPost = 
      (item._id || item.slug || item.id) !== (newsItem._id || newsItem.slug || newsItem.id);

    return isSameCategory && isNotCurrentPost;
  });

  // Banner Logic
  const dynamicBannerData = await getDynamicBanner();
  let rawLink = dynamicBannerData?.relatedLink || "#";
  let finalLink = rawLink;

  if (rawLink !== "#") {
    const phoneRegex = /^[+]?[0-9\s\-]{9,}$/;

    if (phoneRegex.test(rawLink)) {
      finalLink = `tel:${rawLink.replace(/[\s\-]/g, "")}`;
    } else if (
      rawLink.startsWith("http") ||
      rawLink.startsWith("/") ||
      rawLink.startsWith("tel:") ||
      rawLink.startsWith("mailto:")
    ) {
      finalLink = rawLink;
    } else if (
      rawLink.includes(".com") ||
      rawLink.includes(".in") ||
      rawLink.includes("www.")
    ) {
      finalLink = `https://${rawLink}`;
    } else {
      finalLink = `/${rawLink}`;
    }
  }

  const card1 = dynamicBannerData
    ? {
        heading: dynamicBannerData.heading,
        shortDescription: dynamicBannerData.shortDescription,
        buttonText: dynamicBannerData.buttonText || "Call Now",
        relatedLink: finalLink,
        imageUrl: dynamicBannerData.featureImage
          ? resolveBannerUrl(dynamicBannerData.featureImage)
          : null,
        alt: dynamicBannerData.featureAlt || dynamicBannerData.heading,
      }
    : {
        heading: "Explore Organic Range",
        shortDescription:
          "Taste authentic farm-fresh spices, A2 Gir cow ghee & wild honey.",
        buttonText: "Shop Products",
        relatedLink: "/shop",
        imageUrl: null,
        alt: "Shop Ecoensa Products",
      };

  const card2 = {
    heading: "Need Assistance?",
    shortDescription:
      "Talk to our organic food experts and get direct bulk supply guidance.",
    buttonText: "Contact Us Now",
    relatedLink: "/contact",
    imageUrl: null,
    alt: "Need Help",
  };

  const authorName = getAuthorName(newsItem);
  const authorBlogCount = allNews.filter((item) => {
    const itemAuthor = getAuthorName(item);
    return itemAuthor.toLowerCase() === authorName.toLowerCase();
  }).length;

  const currentUrl = `https://ecoensa.com/blog/${searchId}`;

  const finalMainImage = resolveImageUrl(
    newsItem.coverImage ||
      newsItem.featureImage ||
      newsItem.image ||
      newsItem.imageUrl,
  );

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between font-sans text-slate-900 relative overflow-x-clip">
      {/* STICKY HEADER */}
      <Header />

      {/* HERO BANNER SECTION (EXACT REFERENCE MATCH TO SITE HERO DESIGN) */}
      <section className="relative w-full py-16 sm:py-24 bg-slate-950 text-white text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
          style={{
            backgroundImage:
               "url('/images/bg.webp')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#046A38]/40 to-slate-950" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 space-y-4">
          {/* SUB-TAG WITH ORANGE DASHES ON BOTH SIDES */}
          <div className="flex items-center justify-center space-x-3 text-[#FF6B00] text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em]">
            <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
            <span>{getCategoryString(newsItem) || "BLOG ARTICLE"}</span>
            <span className="w-8 sm:w-12 h-[2px] bg-[#FF6B00]" />
          </div>

          {/* MAIN PAGE TITLE */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white drop-shadow-md max-w-5xl mx-auto">
            {newsItem.title}
          </h1>
        </div>
      </section>

      {/* GLOBAL 1400PX CONTAINER */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full py-12 md:py-16 flex-grow">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* MAIN ARTICLE BODY */}
          <div className="w-full lg:w-2/3 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md space-y-6">

            <div className="w-full rounded-2xl overflow-hidden bg-slate-100 flex justify-center items-center">
              <img
                src={finalMainImage}
                alt={newsItem.title}
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-[#046A38]" />
                <span>{formatDate(newsItem.createdAt || newsItem.date)}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <User className="w-4 h-4 text-[#046A38]" />
                <span>
                  {authorName} ({authorBlogCount}{" "}
                  {authorBlogCount === 1 ? "Blog" : "Blogs"})
                </span>
              </div>
            </div>

            {newsItem.content ? (
              <div 
                className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium text-sm sm:text-base space-y-4"
                dangerouslySetInnerHTML={{ __html: newsItem.content }} 
              />
            ) : (
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium text-sm sm:text-base">
                <p>{newsItem.description}</p>
              </div>
            )}

            {/* SHARE BUTTONS WITH INLINE SVG ICONS (NO IMPORT ERROR) */}
            <div className="mt-10 pt-6 border-t border-slate-100 space-y-3">
              <h2 className="text-sm font-serif font-black text-slate-900 uppercase tracking-wider">
                Share This Post
              </h2>
              <div className="flex space-x-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(newsItem.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodeURIComponent(newsItem.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                  title="Share on Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(newsItem.title)}%20${currentUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                  title="Share on WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${encodeURIComponent(newsItem.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-xs"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* RELATED NEWS */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3">
                Related Articles
              </h3>
              {latestNews.length > 0 ? (
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {latestNews.map((news, idx) => {
                    const dynamicId = news.slug || news._id || news.id || idx;
                    return (
                      <Link
                        href={`/blog/${dynamicId}`}
                        key={dynamicId}
                        className="flex items-center space-x-3 group"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                          <img
                            src={resolveImageUrl(
                              news.coverImage ||
                                news.featureImage ||
                                news.image ||
                                news.imageUrl,
                            )}
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-snug group-hover:text-[#046A38] transition-colors line-clamp-2">
                            {news.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                            {formatDate(news.createdAt || news.date)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs font-bold text-slate-500">No related news found.</p>
              )}
            </div>

            {/* CATEGORIES */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-base font-serif font-black text-slate-900 border-b border-slate-100 pb-3">
                Article Categories
              </h3>
              {allCategories.length > 0 ? (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {allCategories.map((cat) => {
                    const categoryCount = allNews.filter(
                      (item) =>
                        getCategoryString(item).toLowerCase() ===
                        cat.name.toLowerCase(),
                    ).length;

                    return (
                      <Link
                        href={`/blog/category/${encodeURIComponent(cat.slug || cat.name)}`} 
                        key={cat._id}
                        className="block group p-3 border border-slate-200/80 rounded-2xl hover:border-[#046A38] transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                            <img
                              src={resolveImageUrl(cat.image)}
                              alt={cat.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#046A38] transition-colors truncate">
                                {cat.name}
                              </h4>
                              <span className="text-[10px] font-black text-[#046A38] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {categoryCount}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs font-bold text-slate-500">No categories found.</p>
              )}
            </div>

            {/* CARD 1 */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md text-center space-y-3">
              {card1.imageUrl && (
                <Link
                  href={card1.relatedLink}
                  target={
                    card1.relatedLink.startsWith("http") ? "_blank" : "_self"
                  }
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-2xl mb-3"
                >
                  <img
                    src={card1.imageUrl}
                    alt={card1.alt}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform"
                  />
                </Link>
              )}
              <h3 className="text-base font-serif font-black text-slate-900">
                {card1.heading}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {card1.shortDescription}
              </p>
              <Link
                href={card1.relatedLink}
                className="block w-full bg-[#046A38] hover:bg-emerald-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all uppercase"
              >
                {card1.buttonText}
              </Link>
            </div>

            {/* CARD 2 */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md text-center space-y-3">
              <h3 className="text-base font-serif font-black text-slate-900">
                {card2.heading}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {card2.shortDescription}
              </p>
              <Link
                href={card2.relatedLink}
                className="block w-full bg-black hover:bg-slate-800 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all uppercase"
              >
                {card2.buttonText}
              </Link>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}