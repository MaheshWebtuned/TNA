// Scroll Reveal with Single-Class Animations + Parent Stagger
(() => {
    const animElements = document.querySelectorAll(
        ".from-bottom, .from-top, .from-left, .from-right, .from-scale, .fade-in, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            const groups = new Map();

            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const el = entry.target;
                const parent = el.parentElement;

                if (!groups.has(parent)) groups.set(parent, []);
                groups.get(parent).push(el);

                observer.unobserve(el);
            });

            // Apply stagger per parent
            groups.forEach((elements) => {
                elements.forEach((el, index) => {
                    el.style.transitionDelay = `${index * 250}ms`; // stagger amount
                    requestAnimationFrame(() => el.classList.add("is-visible"));
                });
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    animElements.forEach((el) => observer.observe(el));
})();

