$(document).ready(function () {
    $(".accordion").each(function (accordionIndex) {
        var $accordion = $(this);

        $accordion.find(".accordion-item").each(function (itemIndex) {
            var $item = $(this);
            var $button = $item.find(".btn-accordion").first();
            var $panel = $item.find(".accordion-collapse").first();
            var buttonId = $button.attr("id") || "accordionTitle" + accordionIndex + "_" + itemIndex;
            var panelId = $panel.attr("id") || "accordionPanel" + accordionIndex + "_" + itemIndex;
            var isOpen = $item.hasClass("active") || $button.attr("aria-expanded") === "true";

            $button.attr({
                id: buttonId,
                "aria-controls": panelId,
                "aria-expanded": isOpen ? "true" : "false"
            });

            $panel.attr({
                id: panelId,
                role: "region",
                "aria-labelledby": buttonId
            });

            $item.toggleClass("active", isOpen);
            $button.toggleClass("active", isOpen);
            $panel.toggle(isOpen);
        });
    });

    $(document).on("click", ".btn-accordion", function () {
        var $button = $(this);
        var $item = $button.closest(".accordion-item");
        var $accordion = $button.closest(".accordion");
        var $panel = $item.find(".accordion-collapse").first();
        var isOpen = $button.attr("aria-expanded") === "true";
        var speed = 250;

        $accordion.find(".accordion-item").not($item).each(function () {
            var $otherItem = $(this);
            var $otherButton = $otherItem.find(".btn-accordion").first();
            var $otherPanel = $otherItem.find(".accordion-collapse").first();

            $otherButton.attr("aria-expanded", "false").removeClass("active");
            $otherItem.removeClass("active");
            $otherPanel.stop(true, true).slideUp(speed);
        });

        if (isOpen) {
            $button.attr("aria-expanded", "false").removeClass("active");
            $item.removeClass("active");
            $panel.stop(true, true).slideUp(speed);
            return;
        }

        $button.attr("aria-expanded", "true").addClass("active");
        $item.addClass("active");
        $panel.stop(true, true).slideDown(speed);
    });
});
