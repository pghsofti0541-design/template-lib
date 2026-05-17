$(document).ready(function () {
            /********************************************************
             * HEADER SCRIPT
             ********************************************************/
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
             * ALL MENU
             ********************************************************/
            var $allMenu = $("#allMenu");
            var $allMenuClose = $(".all_menu_close");
            var desktopMedia = window.matchMedia("(min-width: 1024px)");
            var allMenuTimer = null;

            function openAllMenu() {
                clearTimeout(allMenuTimer);
                $allMenu.prop("hidden", false);
                $("html").addClass("is-all-menu-open");
                requestAnimationFrame(function () {
                    $allMenu.addClass("is-active");
                });
            }

            function closeAllMenu() {
                clearTimeout(allMenuTimer);
                $allMenu.removeClass("is-active");
                $("html").removeClass("is-all-menu-open");

                if (desktopMedia.matches) {
                    $allMenu.prop("hidden", true);
                    return;
                }

                allMenuTimer = setTimeout(function () {
                    $allMenu.prop("hidden", true);
                }, 350);
            }

            function syncAllMenuDepthByViewport() {
                $(".all_menu_item").children("a").removeClass("is-active");
                $(".all_menu_depth").each(function () {
                    $(this).prop("hidden", !desktopMedia.matches).height("");
                });
            }

            $(".mnav_open").first().on("click", function () {
                openAllMenu();
            });

            $allMenuClose.on("click", closeAllMenu);

            $(".all_menu_item").each(function () {
                if ($(this).children(".all_menu_depth").length) {
                    $(this).addClass("has-child");
                }
            });

            syncAllMenuDepthByViewport();
            desktopMedia.addEventListener("change", syncAllMenuDepthByViewport);

            /********************************************************
             * MOBILE DEPTH TOGGLE
             ********************************************************/
            function closeMobileDepth($items) {
                $items.children("a").removeClass("is-active");
                $items.find(".all_menu_depth").each(function () {
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
            $(".all_menu_list").on("click", ".all_menu_item > a", function (e) {
                if (desktopMedia.matches) {
                    return;
                }

                var $link = $(this);
                var $item = $link.closest(".all_menu_item");
                var $panel = $link.next(".all_menu_depth");
                var isExpanded = $link.hasClass("is-active");

                if (!$panel.length) {
                    return;
                }

                e.preventDefault();

                closeMobileDepth($item.siblings(".all_menu_item"));

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
             * CLOSE BEHAVIOR
             ********************************************************/
            $(document).on("keydown", function (e) {
                if (e.key === "Escape") {
                    if (!$allMenu.prop("hidden")) {
                        closeAllMenu();
                    }
                }
            });
        });