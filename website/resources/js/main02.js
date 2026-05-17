$(document).ready(function () {
    // Main visual slider for main01 only
    var $visual = $(".visual_swiper");

    if ($visual.length) {
        var slideLength = $visual.find(".swiper-slide").length;

        if (typeof window.Swiper === "function") {
            new window.Swiper($visual[0], {
                loop: slideLength > 1,
                speed: 700,
                touchEventsTarget: "container",
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: ".visual_pagination",
                    clickable: true
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: true
                },
                a11y: {
                    enabled: true,
                    prevSlideMessage: "previous slide",
                    nextSlideMessage: "next slide",
                    paginationBulletMessage: "go to slide {{index}}"
                }
            });
        } else {
            $visual.find(".swiper-slide").each(function (index) {
                $(this).prop("hidden", index !== 0);
            });
        }
    }

    // Sub tab active state toggle
    $(".sub_tab_list").on("click", "a", function (e) {
        e.preventDefault();

        var $tabList = $(this).closest(".sub_tab_list");

        $tabList.find("a").removeClass("is-active");
        $(this).addClass("is-active");
    });
});
