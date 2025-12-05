import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ideaLabImage from "@assets/generated_images/ai_consultant_holographic_interface.png";
import studioImage from "@assets/generated_images/technology_project_dashboard_interface.png";
import repoImage from "@assets/generated_images/git_repository_code_visualization.png";
import marketImage from "@assets/generated_images/digital_marketplace_platform_visualization.png";
import ScrollReveal from "@/components/ScrollReveal";
import type { BlogPost as BlogPostType } from "@shared/schema";

const imageMap: Record<string, string> = {
  "/api/placeholder/ai-insights": ideaLabImage,
  "/api/placeholder/team-building": studioImage,
  "/api/placeholder/development": repoImage,
  "/api/placeholder/marketplace": marketImage,
};

function formatDate(date: Date | string | null) {
  if (!date) return { day: "01", month: "Jan", fullDate: "January 1, 2024" };
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const fullDate = d.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return { day, month, fullDate };
}

function getImage(imageUrl: string | null): string {
  if (!imageUrl) return ideaLabImage;
  return imageMap[imageUrl] || imageUrl;
}

export default function BlogSection() {
  const { data: posts = [], isLoading } = useQuery<BlogPostType[]>({
    queryKey: ["/api/blog-posts"],
  });

  const featuredPost = posts.find((p) => p.featured);
  const sidePosts = posts.filter((p) => !p.featured);

  if (isLoading) {
    return (
      <section id="blog" className="py-24 lg:py-32 bg-black" data-testid="section-blog">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 lg:py-32 bg-black" data-testid="section-blog">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featuredPost && (() => {
            const { day, month } = formatDate(featuredPost.publishedAt);
            return (
              <ScrollReveal direction="left">
                <div
                  className="group cursor-pointer"
                  data-testid={`card-blog-featured-${featuredPost.id}`}
                >
                  <div className="relative rounded-xl overflow-hidden mb-8">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={getImage(featuredPost.imageUrl)}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <Badge className="absolute top-6 left-6 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-full px-4 py-1">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-start gap-6">
                    <div className="text-center flex-shrink-0">
                      <span className="text-4xl font-bold text-white block">{day}</span>
                      <span className="text-sm text-gray-500 uppercase">{month}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-fuchsia-400 transition-colors">
                        {featuredPost.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-2">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <Heart className="w-4 h-4" /> {featuredPost.likes ?? 0} Like
                        </span>
                        <span className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" /> {featuredPost.comments ?? 0} Comment
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })()}

          <div className="space-y-8">
            {sidePosts.map((post, index) => {
              const { fullDate } = formatDate(post.publishedAt);
              return (
                <ScrollReveal key={post.id} direction="right" delay={index * 0.1}>
                  <div
                    className="flex gap-6 group cursor-pointer"
                    data-testid={`card-blog-${post.id}`}
                  >
                    <div className="w-40 h-28 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={getImage(post.imageUrl)}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-sm mb-2">
                        <span className="text-fuchsia-400">{post.category}</span>
                        <span className="text-gray-600">{fullDate}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-fuchsia-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
