import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { profile } from "@/content/profile";

export default function Home() {
  return <main id="main"><Hero /><FeaturedWork /><About /><Contact links={profile.links} /></main>;
}
