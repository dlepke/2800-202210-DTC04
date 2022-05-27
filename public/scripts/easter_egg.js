/**
 * Add another image to the logo position.
 */

function style() {
    console.log("working")
    $("#logo").append(`
        <img src="../images/foodbuddy-logo-icononly.png" id="logo_icon" class="animation anime2">
    `)
}

/**
 * Animate the logos and texts when the logo is clicked.
 */

function switchpics() {
    console.log("change")

    var src = $("#logo_icon").attr("src")
    if (src == '../images/foodbuddy-logo-icononly.png') {
        $("#logo_icon").attr("src", "../images/meat.png")
        $("#logo_text").css('color', '#9B111E')
        $("#logo_text").text("MeatBuddy").fadeTo("slow", 1);
    }
    else if (src == '../images/meat.png') {
        $("#logo_icon").attr("src", "../images/dairy.png")
        $("#logo_text").css('color', '#e1dabb')
        $("#logo_text").text("DairyBuddy").fadeTo("slow", 1);
    }
    else if (src == '../images/dairy.png') {
        $("#logo_icon").attr("src", "../images/gascans-cart.png")
        $("#logo_text").css('color', 'black')
        $("#logo_text").css('font-weight', '600')
        $("#logo_text").css('letter-spacing', '0px')
        $("#logo_text").text("GasBuddy...oops").fadeTo("slow", 1);
    }
    else {
        $("#logo_icon").attr("src", '../images/foodbuddy-logo-icononly.png')
        $("#logo_text").text("FoodBuddy").fadeTo("slow", 1);
        $("#logo_text").css('color', 'green')
        $("#logo_text").css('font-weight', '700')
        $("#logo_text").css('letter-spacing', '0.05rem')
    }
}

function setup() {
    $(".animation").click(function () {
        setTimeout(switchpics, 500)
        var first = $(".animate");
        var second = $(".animate2");
        first.animate({ left: "100%" }, 'slow', function () { $(this).css('left', '-100%'); });
        first.animate({ left: "0%" }, 'slow', function () { $(this).css('left', '0%'); });
        $("#logo_text").fadeTo("slow", 0);
    })
}

$(document).ready(setup)

