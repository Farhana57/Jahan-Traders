// ১. কাস্টম কার্সার ও ইন্টারেক্টিভ ইফেক্ট
const cursor = document.getElementById('customCursor');
const dot = document.getElementById('cursorDot');

if (cursor && dot) {
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });

    const clickables = document.querySelectorAll('a, button, input, textarea');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    });
}

// ২. ইউনিভার্সাল স্ক্রল অ্যানিমেশন (কন্টাক্ট পেজ ও অন্যান্য সব সেকশনের জন্য)
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // সব ধরণের স্লাইড ও ফেড-ইন ক্লাস একসাথে রিমুভ করার ব্যবস্থা
                entry.target.classList.remove(
                    'opacity-0', 
                    'translate-x-[-60px]', 'translate-x-[60px]', 
                    'translate-x-[-50px]', 'translate-x-[50px]', 
                    'translate-y-10', 'translate-y-12'
                );
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // কমন ক্লাস এবং কন্টাক্ট সেকশনের সব এলিমেন্ট ট্র্যাক করা
    document.querySelectorAll('.animate-on-scroll, #contact .animate-on-scroll, #contact-page .animate-on-scroll').forEach(el => observer.observe(el));
});

// ৩. Enquire Now মডাল খোলার ফাংশন
function openEnquireModal(button) {
    const card = button.closest('.group');
    const imgSrc = card.querySelector('.product-img').src;
    const title = card.querySelector('.product-title').innerText;

    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalTitle').innerText = title;

    const modal = document.getElementById('enquireModal');
    const container = document.getElementById('modalContainer');

    modal.classList.remove('opacity-0', 'pointer-events-none');
    container.classList.remove('scale-95');
    container.classList.add('scale-100');
}

// ৪. মডাল বন্ধ করার ফাংশন
function closeEnquireModal() {
    const modal = document.getElementById('enquireModal');
    const container = document.getElementById('modalContainer');

    modal.classList.add('opacity-0', 'pointer-events-none');
    container.classList.remove('scale-100');
    container.classList.add('scale-95');
}

// ৫. ব্যাকগ্রাউন্ডে ক্লিক করলেও মডাল বন্ধ হবে
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('enquireModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeEnquireModal();
            }
        });
    }
});