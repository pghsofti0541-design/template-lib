$(document).ready(function () {
    /* ========================================
        Layout
        - skip navigation
        - header hover / scroll
        - logo color change
        - language menu
        - full menu
        - mobile menu
        - sub lnb / tab
        - top button
    ======================================== */

    var $window = $(window);
    var $document = $(document);
    var $html = $("html");
    var $header = $("#siteHeader");
    var $mobileNav = $("#m_nav");
    var $mobileOpenBtn = $(".btn-navi.all").first();
    var $langBtn = $(".lang_btn").first();
    var $langList = $("#langList");
    var $headerLogo = $(".header .logo img").first();
    var lastFocused = null;
    var mobileNavTimer = null;
    var pcMenuTimer = null;
    var focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function updateExpanded($el, state) {
        if ($el && $el.length) {
            $el.attr("aria-expanded", state ? "true" : "false");
        }
    }

    function closeFullmenus($exceptBtn) {
        $(".fullmenu_btn").each(function () {
            var $btn = $(this);

            if ($exceptBtn && $exceptBtn.length && $btn[0] === $exceptBtn[0]) {
                return;
            }

            updateExpanded($btn, false);
            $("#" + $btn.attr("aria-controls")).prop("hidden", true);
        });
    }

    function updateHeaderLogo() {
        if (!$header.length || !$headerLogo.length) {
            return;
        }

        var useDarkLogo = $header.hasClass("hover") || $header.hasClass("scrolled") || $header.is(":focus-within");
        var nextSrc = useDarkLogo ? $headerLogo.data("dark-src") : $headerLogo.data("light-src");

        if (nextSrc && $headerLogo.attr("src") !== nextSrc) {
            $headerLogo.attr("src", nextSrc);
        }
    }

    function toggleMobileNav(isOpen) {
        if (!$mobileNav.length || !$mobileOpenBtn.length) {
            return;
        }

        clearTimeout(mobileNavTimer);

        if (isOpen) {
            $mobileNav.prop("hidden", false);

            window.requestAnimationFrame(function () {
                $mobileNav.addClass("is-active");
            });

            $html.addClass("is-mobile-nav-open");
            lastFocused = document.activeElement;

            mobileNavTimer = setTimeout(function () {
                $mobileNav.find(focusableSelector).first().trigger("focus");
            }, 350);
        } else {
            $mobileNav.removeClass("is-active");
            $html.removeClass("is-mobile-nav-open");

            mobileNavTimer = setTimeout(function () {
                $mobileNav.prop("hidden", true);
            }, 350);

            if (lastFocused && typeof lastFocused.focus === "function") {
                lastFocused.focus();
            } else {
                $mobileOpenBtn.trigger("focus");
            }
        }

        updateExpanded($mobileOpenBtn, isOpen);
    }

    /* 본문 바로가기 */
    $("#skip-nav a, #skip-map a").on("click", function (e) {
        var targetId = $(this).attr("href");
        var $target = targetId && targetId.charAt(0) === "#" ? $(targetId) : $();

        if (!$target.length) {
            return;
        }

        e.preventDefault();

        if (!$target.attr("tabindex")) {
            $target.attr("tabindex", "-1");
        }

        $target.trigger("focus");
        $("html, body").stop(true).animate({
            scrollTop: $target.offset().top
        }, 250);

        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, "", targetId);
        }
    });

    /* 헤더 스크롤 상태 */
    updateHeaderLogo();
    $window.on("scroll", function () {
        $header.toggleClass("scrolled", $window.scrollTop() > 10);
        updateHeaderLogo();
    });

    /* PC GNB */
    $(".pc_nav .gnb_item").each(function () {
        var $item = $(this);
        var $link = $item.find(".gnb_link").first();
        var $submenu = $item.children(".gnb_2dep");

        function openPcMenu() {
            clearTimeout(pcMenuTimer);
            $(".pc_nav .gnb_item").not($item).removeClass("is-active").children(".gnb_2dep").stop(true, true).hide();
            $item.addClass("is-active");
            $header.addClass("hover");
            $submenu.stop(true, true).slideDown(220).css("visibility", "visible");
            updateExpanded($link, true);
            updateHeaderLogo();
        }

        function closePcMenu() {
            pcMenuTimer = setTimeout(function () {
                if (!$item[0].contains(document.activeElement)) {
                    $item.removeClass("is-active");
                    $header.removeClass("hover");
                    $submenu.stop(true, true).slideUp(180);
                    updateExpanded($link, false);
                    updateHeaderLogo();
                }
            }, 180);
        }

        $item.on("mouseenter focusin", function () {
            openPcMenu();
        });

        $item.on("mouseleave focusout", function () {
            closePcMenu();
        });

        $submenu.on("mouseenter", function () {
            openPcMenu();
        });

        $submenu.on("mouseleave", function () {
            closePcMenu();
        });
    });

    /* 언어 선택 */
    $(".pc_nav .gnb_wrap").on("mouseenter mousemove", function () {
        clearTimeout(pcMenuTimer);

        if (!$(".pc_nav .gnb_item.is-active").length) {
            $(".pc_nav .gnb_item").first().trigger("mouseenter");
        }
    });

    $(".pc_nav .gnb_wrap").on("mouseleave", function () {
        var $activeItem = $(".pc_nav .gnb_item.is-active").first();

        if ($activeItem.length) {
            $activeItem.trigger("mouseleave");
        }
    });

    $langBtn.on("click", function () {
        var isExpanded = $langBtn.attr("aria-expanded") === "true";

        updateExpanded($langBtn, !isExpanded);
        $langList.prop("hidden", !isExpanded ? false : true);
    });

    /* 전체메뉴 */
    $(".fullmenu_btn").on("click", function () {
        var $btn = $(this);
        var $panel = $("#" + $btn.attr("aria-controls"));
        var isExpanded = $btn.attr("aria-expanded") === "true";

        if (!$panel.length) {
            return;
        }

        closeFullmenus($btn);
        updateExpanded($btn, !isExpanded);
        $panel.prop("hidden", isExpanded);
    });

    /* 모바일 메뉴 */
    $mobileOpenBtn.on("click", function () {
        toggleMobileNav(true);
    });

    $(".gnb_close_btn").on("click", function () {
        toggleMobileNav(false);
    });

    $(".mb_gnb_toggle").on("click", function () {
        var $btn = $(this);
        var $panel = $("#" + $btn.attr("aria-controls"));
        var isExpanded = $btn.attr("aria-expanded") === "true";

        updateExpanded($btn, !isExpanded);
        $panel.prop("hidden", isExpanded);
    });

    /* 서브 LNB */
    $(".sub_lnb").on("click", ".lnb_toggle", function () {
        var $btn = $(this);
        var $panel = $("#" + $btn.attr("aria-controls"));
        var isExpanded = $btn.attr("aria-expanded") === "true";

        if (!$panel.length) {
            return;
        }

        updateExpanded($btn, !isExpanded);
        $panel.prop("hidden", isExpanded);
    });

    /* 서브 탭 */
    $("[data-sub-tabs]").each(function () {
        var $tabList = $(this);
        var $tabs = $tabList.find('[role="tab"]');

        function activateTab($activeTab, focusTab) {
            $tabs.each(function () {
                var $tab = $(this);
                var $panel = $("#" + $tab.attr("aria-controls"));
                var isActive = $tab[0] === $activeTab[0];

                $tab.attr({
                    "aria-selected": isActive ? "true" : "false",
                    tabindex: isActive ? "0" : "-1"
                });

                $tab.parent().toggleClass("active", isActive);
                $panel.prop("hidden", !isActive);
            });

            if (focusTab) {
                $activeTab.trigger("focus");
            }
        }

        $tabs.each(function (index) {
            var $tab = $(this);

            $tab.attr("tabindex", $tab.attr("aria-selected") === "true" ? "0" : "-1");

            $tab.on("click", function () {
                activateTab($tab, false);
            });

            $tab.on("keydown", function (e) {
                var nextIndex = index;

                if (e.key === "ArrowRight") {
                    nextIndex = (index + 1) % $tabs.length;
                } else if (e.key === "ArrowLeft") {
                    nextIndex = (index - 1 + $tabs.length) % $tabs.length;
                } else if (e.key === "Home") {
                    nextIndex = 0;
                } else if (e.key === "End") {
                    nextIndex = $tabs.length - 1;
                } else {
                    return;
                }

                e.preventDefault();
                activateTab($tabs.eq(nextIndex), true);
            });
        });
    });

    /* 맨 위로 이동 */
    $(".go_top").on("click", function () {
        $("html, body").stop(true).animate({
            scrollTop: 0
        }, 300);
    });

    /* 외부 클릭 / ESC 닫기 */
    $document.on("click", function (e) {
        var $target = $(e.target);

        if (!$target.closest(".lang_wrap").length) {
            updateExpanded($langBtn, false);
            $langList.prop("hidden", true);
        }

        if ($target.is($mobileNav) && $mobileNav.hasClass("is-active")) {
            toggleMobileNav(false);
        }

        if (!$target.closest(".fullmenu, .fullmenu_btn").length) {
            closeFullmenus();
        }
    });

    $document.on("keydown", function (e) {
        if (e.key !== "Escape") {
            return;
        }

        updateExpanded($langBtn, false);
        $langList.prop("hidden", true);
        toggleMobileNav(false);
        closeFullmenus();
    });

    $header.on("focusin", updateHeaderLogo);
    $header.on("focusout", function () {
        setTimeout(updateHeaderLogo, 0);
    });
});
