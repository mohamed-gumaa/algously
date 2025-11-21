const items = document.querySelectorAll(".carousel-item");
const dotsContainer = document.querySelector(".carousel-dots");
let current = 0;
let interval;

// إنشاء النقاط
items.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function goToSlide(index) {
  items[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = index;

  items[current].classList.add("active");
  dots[current].classList.add("active");

  resetInterval();
}

function nextSlide() {
  const next = (current + 1) % items.length;
  goToSlide(next);
}

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 5000);
}

interval = setInterval(nextSlide, 5000);

// scrollToTop button

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const radius = 25;
const circumference = 2 * Math.PI * radius;

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  const offset = circumference - (scrollPercent / 100) * circumference;
  progress.style.strokeDashoffset = offset;

  // إظهار الزر بعد التمرير لمسافة معينة
  if (scrollTop > 200) {
    progressContainer.classList.add("visible");
  } else {
    progressContainer.classList.remove("visible");
  }
});

// عند النقر: العودة للأعلى بسلاسة
progressContainer.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// whatsappForm
document
  .getElementById("whatsappForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    let phone = "201234567890";

    let text = `الاسم: ${name}%0Aالبريد: ${email}%0Aالرسالة: ${message}`;

    let url = `https://wa.me/${phone}?text=${text}`;
    window.open(url, "_blank");
  });

// قائمة الصور
const imageList = [
  "assets/images/Gallery/6759d1be9e3c9.png",
  "assets/images/Gallery/6759d1f7c0b96.png",
  "assets/images/Gallery/6759d247d6493.png",
  "assets/images/Gallery/6759d27328750.png",
  "assets/images/Gallery/6759d28a0b902.png",
  "assets/images/Gallery/6759d2a09dc63.png",
  "assets/images/Gallery/6759d2b2222f5.png",
  "assets/images/Gallery/6759d2dc8e55b.png",
  "assets/images/Gallery/6759d2f97004a.png",
  "assets/images/Gallery/6766fcabcc338.jpg",
  "assets/images/Gallery/6766fdce0bce5.jpg",
  "assets/images/Gallery/6766fe7f664e6.jpg",
  "assets/images/Gallery/6766ff395ca21.jpg",
  "assets/images/Gallery/6767024205fe0.jpg",
  "assets/images/Gallery/676704158ac41.jpg",
  "assets/images/Gallery/676719660c019.jpg",
];

const galleryContainer = document.getElementById("galleryContainer");
const carouselInner = document.querySelector(
  "#carouselGallery .carousel-inner"
);

// إنشاء صور المعرض والكاروسيل
imageList.forEach((src, index) => {
  // ---- صور المعرض ----
  const col = document.createElement("div");
  col.className = "col-sm-6 col-md-4 col-lg-3";

  const img = document.createElement("img");
  img.src = src;
  img.className = "img-fluid shadow";
  img.dataset.index = index;

  col.appendChild(img);
  galleryContainer.appendChild(col);

  // ---- صور الكاروسيل ----
  const item = document.createElement("div");
  item.className = "carousel-item";

  const bigImg = document.createElement("img");
  bigImg.src = src;
  bigImg.classList.add("d-block", "w-100", "modal-img");

  item.appendChild(bigImg);
  carouselInner.appendChild(item);
});

// تعيين أول صورة كـ active
const firstItem = document.querySelector("#carouselGallery .carousel-item");
if (firstItem) firstItem.classList.add("active");

// تهيئة الكاروسيل مرة واحدة
const carousel = new bootstrap.Carousel("#carouselGallery", {
  interval: false,
  ride: false,
  wrap: true,
});

// تهيئة المودال
const modal = new bootstrap.Modal(document.getElementById("galleryModal"));

// فتح المودال عند النقر على أي صورة
document.querySelectorAll(".gallery img").forEach((img) => {
  img.addEventListener("click", function () {
    const index = Number(this.dataset.index);

    // إزالة active من الجميع ثم تفعيل الصورة المطلوبة
    document
      .querySelectorAll("#carouselGallery .carousel-item")
      .forEach((el) => el.classList.remove("active"));
    document
      .querySelectorAll("#carouselGallery .carousel-item")
      [index].classList.add("active");

    // عرض المودال
    modal.show();
  });
});

// fade-up
function handleScrollAnimation() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const elements = section.querySelectorAll(".fade-up");
    const triggerBottom = window.innerHeight * 0.85;
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("visible");
        }, index * 300); // 300ms بين كل عنصر والآخر
      });
    }
  });
}

window.addEventListener("scroll", handleScrollAnimation);
window.addEventListener("load", handleScrollAnimation);

// منع النقر بزر الماوس الأيمن
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  // alert("تم تعطيل كلك يمين على هذه الصفحة");
});

// منع بعض اختصارات لوحة المفاتيح لعرض المصدر
document.addEventListener("keydown", function (e) {
  // Ctrl+U
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
    // alert("عرض المصدر ممنوع");
  }
  // Ctrl+Shift+I (DevTools)
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
    // alert("أدوات المطورين مغلقة");
  }
  // F12
  if (e.key === "F12") {
    e.preventDefault();
    // alert("أدوات المطورين مغلقة");
  }
});
