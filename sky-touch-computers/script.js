document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    const form = document.getElementById("enquiryForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.querySelector("#name").value;
        const mobile = document.querySelector("#mobile").value;
        const course = document.querySelector("#course").value;
        const message = document.querySelector("#message").value;

        fetch("https://script.google.com/macros/s/AKfycbxqIZmK-3onBmxkF7HhvAkW0TQsvh-keG4qpk8THqTdmFL6hRN-AE4hDz9GVN1dpgcs/exec", {
            method: "POST",
            body: JSON.stringify({ name, mobile, course, message })
        })
            .then(res => res.json())
            .then(data => {
                alert("Enquiry submitted successfully!");
                form.reset();
            })
            .catch(error => {
                alert("Something went wrong!");
            });
    });
    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation to course cards and feature boxes
    const animateElements = document.querySelectorAll('.course-card, .feature-box, .section-title');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
const supabaseUrl = "https://wfgrvfawciyoikdijblr.supabase.co";
const supabaseKey = "sb_publishable_5g5M9OZO9aoq2K2fQB8zcg_CFbdaYZs";
const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {

    const reviewForm = document.getElementById("reviewForm");
    const reviewsList = document.getElementById("reviewsList");

    // Load existing reviews
    async function loadReviews() {
        const { data, error } = await supabaseClient
            .from("reviews")
            .select("*")
            .order("created_at", { ascending: false });

        reviewsList.innerHTML = "";

        data.forEach(review => {
            const div = document.createElement("div");
            div.classList.add("review-item");

            div.innerHTML = `
        <h4>${"★".repeat(review.rating)}</h4>
        <p>${review.review}</p>
        <span>- ${review.name}</span>
      `;

            reviewsList.appendChild(div);
        });
    }

    loadReviews();

    // Submit review
    reviewForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("reviewName").value;
        const rating = document.getElementById("reviewRating").value;
        const reviewText = document.getElementById("reviewText").value;

        await supabaseClient.from("reviews").insert([
            { name: name, rating: rating, review: reviewText }
        ]);
        alert("Review submitted successfully!");
        reviewForm.reset();
        loadReviews();
    });

});