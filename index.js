document.addEventListener("alpine:init", () => {
  Alpine.data("xData", () => ({
    init() {
      this.portfolio = [];
      this.finCert = [];
      this.techCert = [];
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
      fetch("https://timchen0607.github.io/api/certificate.json")
        .then((res) => res.json())
        .then((json) => {
          this.finCert = json.finance;
          this.techCert = json.technology;
        })
        .then(() => {
          new Swiper(".certSwiper", {
            effect: "cards",
            grabCursor: true,
          });
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
