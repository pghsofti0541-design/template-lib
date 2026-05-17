$(document).ready(function () {
            /********************************************************
             * HEADER SCRIPT
             ********************************************************/
            /********************************************************
             * UTIL TOGGLES
             ********************************************************/
            var $toggles = $(".btn_toggle");
            var $toggleBtns = $toggles.children("a");

            function closeToggles($targets) {
                $targets.removeClass("on");
            }

            function toggleMenu(e) {
                e.preventDefault();

                var $toggle = $(this).parent(".btn_toggle");
                var isOpen = $toggle.hasClass("on");

                closeToggles($toggles.not($toggle));
                $toggle.toggleClass("on", !isOpen);

            }

            $toggleBtns.on("click", toggleMenu);

            $("html").on("click focusin", function (e) {
                if (!$toggles.has(e.target).length) {
                    closeToggles($toggles);
                }
            });

            /********************************************************
             * HEADER SCROLL
             ********************************************************/
            var $header = $("#siteHeader");

            $(window).on("scroll", function () {
                $header.toggleClass("scrolled", $(this).scrollTop() > 10);
            }).trigger("scroll");

            /********************************************************
             * HEADER - PC MENU
             ********************************************************/
            var $pcItems = $(".pc_nav .gnb_item");
            var $pcLinks = $(".pc_nav .gnb_item > a");

            $pcLinks.on("click", function (e) {
                var $item = $(this).parent(".gnb_item");
                var hasDepthMenu = $item.children(".gnb_2dep").length > 0;

                if (!hasDepthMenu) {
                    return;
                }

                e.preventDefault();

                if ($item.hasClass("is-active")) {
                    $pcItems.removeClass("is-active");
                    return;
                }

                $pcItems.removeClass("is-active");
                $item.addClass("is-active");
            });

            $header.on("mouseleave", function () {
                $pcItems.removeClass("is-active");
            });

            $(document).on("click focusin", function (e) {
                if (!$header.has(e.target).length) {
                    $pcItems.removeClass("is-active");
                }
            });

            /********************************************************
             * HEADER - MOBILE MENU
             ********************************************************/
            var $mobileNav = $("#m_nav");
            var $mobileCloseBtn = $(".gnb_close_btn");
            var mobileNavTimer = null;

            function openMobileNav() {
                clearTimeout(mobileNavTimer);
                $mobileNav.prop("hidden", false);
                $("html").addClass("is-mobile-nav-open");
                requestAnimationFrame(function () {
                    $mobileNav.addClass("is-active");
                });
            }

            function closeMobileNav() {
                clearTimeout(mobileNavTimer);
                $mobileNav.removeClass("is-active");
                $("html").removeClass("is-mobile-nav-open");
                mobileNavTimer = setTimeout(function () {
                    $mobileNav.prop("hidden", true);
                }, 350);
            }

            $(".mnav_open").first().on("click", openMobileNav);
            $mobileCloseBtn.on("click", closeMobileNav);

            $(".mb_nav .gnb_item").each(function () {
                if ($(this).children(".gnb_2dep").length) {
                    $(this).addClass("has-child");
                }
            });

            /********************************************************
             * MOBILE DEPTH TOGGLE
             ********************************************************/
            function closeMobileDepth($items) {
                $items.children("a").removeClass("is-active");
                $items.find(".gnb_2dep").each(function () {
                    var $panel = $(this);
                    if (!$panel.prop("hidden")) {
                        $panel.height($panel[0].scrollHeight);
                        requestAnimationFrame(function () {
                            $panel.height(0);
                        });
                        setTimeout(function () {
                            $panel.prop("hidden", true).height("");
                        }, 300);
                    }
                });
            }

            /********************************************************
             * MOBILE ITEM TOGGLE
             ********************************************************/
            $(".mb_nav").on("click", ".gnb_item > a", function (e) {
                var $link = $(this);
                var $item = $link.closest(".gnb_item");
                var $panel = $link.next(".gnb_2dep");
                var isExpanded = $link.hasClass("is-active");

                if (!$panel.length) {
                    return;
                }

                e.preventDefault();

                closeMobileDepth($item.siblings(".gnb_item"));

                if (isExpanded) {
                    closeMobileDepth($item);
                    return;
                }

                $link.addClass("is-active");
                $panel.prop("hidden", false).height(0);
                requestAnimationFrame(function () {
                    $panel.height($panel[0].scrollHeight);
                });
                setTimeout(function () {
                    if ($link.hasClass("is-active")) {
                        $panel.height("auto");
                    }
                }, 300);
            });

            /********************************************************
             * MOBILE CLOSE BEHAVIOR
             ********************************************************/
            $(document).on("click", function (e) {
                if ($(e.target).is($mobileNav) && $mobileNav.hasClass("is-active")) {
                    closeMobileNav();
                }
            }).on("keydown", function (e) {
                if (e.key === "Escape" && $mobileNav.hasClass("is-active")) {
                    closeMobileNav();
                }
            });
        });