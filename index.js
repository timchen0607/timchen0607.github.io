document.addEventListener("alpine:init", () => {
  Alpine.data("xData", () => ({
    init() {
      this.portfolio = [];
      this.fetchPortfolio();
      this.fetchCertificate();
      this.skillsParallax();
    },
    fetchPortfolio() {
      fetch("https://timchen0607.github.io/api/portfolio.json")
        .then((res) => res.json())
        .then((json) => (this.portfolio = json));
    },
    fetchCertificate() {
      new Swiper(".certificate-list", {
        effect: "cards",
        grabCursor: true,
      });
    },
    skillsParallax() {
      this.$el.onscroll = function myFunction() {
        const target = document.querySelector(".certificate-bg");
        const yValue = document.scrollingElement.scrollTop * 0.5;
        target.style.backgroundPosition = "center " + yValue + "px";
      };
    },
  }));
});
