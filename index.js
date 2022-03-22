document.addEventListener("alpine:init", () => {
  Alpine.data("xData", () => ({
    init() {
      this.profile = [];
      this.portfolio = [];
      this.skills = [];
      this.finCert = [];
      this.techCert = [];
      this.blogs = [];
      this.profileIdx = 0;
      this.portfolioIdx = 1;
      this.skillsFinanceIdx = 1;
      this.skillsFrontEndIdx = 1;
      this.skillsBackEndIdx = 1;
      this.skillsOthersIdx = 1;
      this.blogsIdx = 1;
      this.fetchProfile()
        .then(() => this.fetchPortfolio())
        .then(() => this.fetchSkills())
        .then(() => this.fetchCertificate())
        .then(() => this.fetchBlogs())
        .then(() => {
          this.autoActive();
          this.skillsParallax();
          document.addEventListener("scroll", () => this.autoActive());
          document.documentElement.style.overflow = "visible";
          document.body.style.overflow = "visible";
          document.getElementById("loading").classList.add("hide");
        });
    },
    autoActive() {
      let current = "";
      this.$el.querySelectorAll("section").forEach((sec) => {
        if (window.pageYOffset >= sec.offsetTop - 60)
          current = sec.getAttribute("id");
      });
      this.$el.querySelectorAll(".navbar-item").forEach((item) => {
        item.classList.remove("active");
        if (item.href.includes(current)) item.classList.add("active");
      });
    },
    fetchProfile() {
      return fetch("https://timchen0607.github.io/api/profile.json")
        .then((res) => res.json())
        .then((json) => (this.profile = json));
    },
    fetchPortfolio() {
      return fetch("https://timchen0607.github.io/api/portfolio.json")
        .then((res) => res.json())
        .then((json) => (this.portfolio = json));
    },
    fetchSkills() {
      return fetch("https://timchen0607.github.io/api/skills.json")
        .then((res) => res.json())
        .then((json) => (this.skills = json));
    },
    fetchCertificate() {
      return fetch("https://timchen0607.github.io/api/certificate.json")
        .then((res) => res.json())
        .then((json) => {
          this.finCert = json.finance;
          this.techCert = json.technology;
        })
        .then(() => {
          new Swiper(".certSwiper", {
            effect: "cards",
            cardsEffect: { slideShadows: false },
            grabCursor: true,
          });
        });
    },
    fetchBlogs() {
      return fetch("https://timchen0607.github.io/api/blogs.json")
        .then((res) => res.json())
        .then((json) => (this.blogs = json));
    },
    skillsParallax() {
      this.$el.onscroll = function myFunction() {
        const yValue = window.innerWidth > 768 ? 0.5 : 0.5;
        const target = document.querySelector(".certificate-bg");
        const scroll = document.scrollingElement.scrollTop;
        target.style.backgroundPosition = "center " + scroll * yValue + "px";
      };
    },
  }));
});
