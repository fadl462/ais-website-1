AIS NEWS ARTICLE TEMPLATE UPDATE — 24 AUGUST 2026

Replace these files in the existing ais-website-1 repository:

1. pages/news-management-transition.html
2. pages/news-new-vision.html
3. assets/css/news-article.css

The two article pages now load the shared news-article.css template after styles.css.

The template:
- gives every AIS story a consistent editorial hero layout;
- uses the correct text-free lead image for each story;
- keeps the photograph visibly dominant instead of covering it with an oversized blue panel;
- keeps the headline/deck readable without obscuring the whole image;
- keeps the article body and sidebar inside the site grid;
- is responsive for tablet/mobile;
- is reusable for future stories using the same article hero classes.

No generated images are included in this update. The template uses existing images already in the repository.
