import properties from "../data/properties.json";
import cities from "../data/cities.json";
import amenities from "../data/amenities.json";
import testimonials from "../data/testimonials.json";
import blogPosts from "../data/blog-posts.json";
import faq from "../data/faq.json";
import team from "../data/team.json";

export const getProperties = async () => properties;
export const getPropertyBySlug = async (slug) => properties.find(p => p.slug === slug);
export const getPropertiesByCity = async (city) => properties.filter(p => p.city.toLowerCase() === city.toLowerCase());
export const getFeaturedProperties = async () => properties.filter(p => p.featured);

export const getCities = async () => cities;
export const getAmenities = async () => amenities;
export const getTestimonials = async () => testimonials;
export const getBlogPosts = async () => blogPosts;
export const getBlogPostBySlug = async (slug) => blogPosts.find(b => b.slug === slug);
export const getFAQs = async () => faq;
export const getTeam = async () => team;
