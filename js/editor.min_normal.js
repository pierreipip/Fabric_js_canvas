"use strict";

function makeTextCenter() {
    ["curvedText", "textbox"].indexOf(canvas.getActiveObject().type) == -1 && (canvas.getActiveObject().center(), canvas.getActiveObject().setCoords(), curvedText.setCoords(), textbox.setCoords())
}

function save_png() {
    var e = canvas.toDataURL({
        format: "png"
    }).replace("image/png", "image/octet-stream");
    initiateFileDownload(e, "mczid.png")
}

function save_jpeg() {
    var e = canvas.toDataURL({
        format: "jpeg"
    }).replace("image/jpeg", "image/octet-stream");
    initiateFileDownload(e, "mczid.jpg")
}

function save_pdf() {
    var e = canvas.toDataURL("image/jpeg", 1),
        t = new jsPDF;
    t.addImage(e, "JPEG", 0, 0), t.save("mczid.pdf")
}
var obj_params = {},
    canvas_obj = document.getElementById("canvas");
if (window.innerWidth < 480) {
    var small_height = 250;
    $("#canvas-wrapper").css("height", small_height), canvas_obj.height = small_height
} else canvas_obj.height = $("#canvas-wrapper").height();
canvas_obj.width = $("#canvas-wrapper").width();
var canvas = new fabric.Canvas("canvas", {
        stopContextMenu: !0
    }),
    elem1 = document.querySelector(".font-range"),
    fontRange = new Powerange(elem1, {
        min: 8,
        max: 300,
        start: 40
    }),
    elem2 = document.querySelector(".curve-radius"),
    radiusRange = new Powerange(elem2, {
        min: 0,
        max: 359,
        start: 50
    }),
    elem3 = document.querySelector(".curve-spacing"),
    radiusRange = new Powerange(elem3, {
        min: 5,
        max: 40,
        start: 20
    }),
    url_params = new URLSearchParams(window.location.search),
    tattoo_text = url_params.has("text") ? url_params.get("text") : "My MCZ ID",
    tattoo_font = url_params.has("font") ? url_params.get("font") : "Georgia",
    font_type = url_params.has("font") ? "i-text" : "curvedText";
$("#logo_text").val(tattoo_text);
var newText = new fabric.Textbox(tattoo_text, {
        fontFamily: tattoo_font,
        fontSize: 40,
        textAlign: "center",
        editable: !1
    }),
    CurvedText = new fabric.CurvedText(tattoo_text, {
        fontFamily: tattoo_font,
        textAlign: "center",
        radius: 50,
        fontSize: 40,
        spacing: 20,
        type: font_type
    }),
    CurvedTextCopy = new fabric.CurvedText(tattoo_text, {
        fontFamily: tattoo_font,
        textAlign: "center",
        radius: 50,
        fontSize: 40,
        spacing: 20
    });
tattoo_text.length > 30 ? (obj_params.effect = "STRAIGHT", obj_params.width = 300, newText.setOptions(obj_params), canvas.add(newText).setActiveObject(newText), canvas.centerObject(newText), newText.setCoords()) : (obj_params.effect = "STRAIGHT", obj_params.width = 300, CurvedText.setOptions(obj_params), canvas.add(CurvedText).setActiveObject(CurvedText), canvas.centerObject(CurvedText), CurvedText.setCoords()), canvas.renderAll();
var renderCanvas = setInterval(function() {
    canvas.renderAll()
}, 500);
canvas.on("object:selected", function(e) {
    $("#fore_color, #left, #center, #right, #flip_item, #bring_forward, #bring_backward, #remove_btn").removeAttr("disabled"), "i-text" == e.target.type || "image" == e.target.type ? ($("#curve, #fontfamily, #edit, #bold, #italic, #font_range").attr("disabled", "disabled"), $("#curve").parent().css({
        cursor: "not-allowed",
        opacity: "0.5"
    }), "image" == e.target.type ? ($("#fore_color, #font_family").attr("disabled", "disabled"), fontRange.setDisabled(!0)) : ($("#fore_color, #font_family").removeAttr("disabled", "disabled"), fontRange.setDisabled(!1))) : "curvedText" == e.target.type ? ($("#curve, #fontfamily, #edit, #bold, #italic, #font_family, #font_range, #fore_color").removeAttr("disabled"), $("#curve").parent().css({
        cursor: "pointer",
        opacity: "1"
    }), $("#curve").is(":checked") && $(".curve-text-wrapper").removeClass("hidden"), $("#edit").hasClass("active") && $(".edit-text-wrapper").removeClass("hidden"), logo_text.value = canvas.getActiveObject().getText(), $("#font_family").val(canvas.getActiveObject().getFontFamily()).change(), fontRange.setSliderValue(canvas.getActiveObject().getFontSize()), fontRange.setDisabled(!1)) : "textbox" == e.target.type && ($("#fontfamily, #edit, #bold, #italic, #font_family, #font_range, #fore_color").removeAttr("disabled"), $("#edit").hasClass("active") && $(".edit-text-wrapper").removeClass("hidden"), logo_text.value = canvas.getActiveObject().getText(), fontRange.setDisabled(!1)), $("#fcbox").css("background", canvas.getActiveObject().getFill())
}), canvas.on("selection:cleared", function(e) {
    $("#curve, #fontfamily, #flip_item, #edit, #bold, #italic, #fore_color, #font_range, #left, #center, #right, #bring_forward, #bring_backward, #remove_btn, #font_family").attr("disabled", "disabled"), $("#curve").parent().css({
        cursor: "not-allowed",
        opacity: "0.5"
    }), $(".curve-text-wrapper, .edit-text-wrapper").addClass("hidden"), fontRange.setDisabled(!0), $("#fcbox").css("background", "#000")
}), logo_text.onkeyup = function() {
    if (null !== canvas.getActiveObject() && ["curvedText", "textbox"].indexOf(canvas.getActiveObject().type) != -1) {
        var e = canvas.getActiveObject(),
            t = e.getBoundingRect(),
            a = logo_text.value,
            c = {};
        a.length > 30 ? (t.effect = "STRAIGHT", t.width = t.width > 250 ? t.width : 250, newText.setText(a).setOptions(t), "curvedText" == e.type && (c = canvas.getActiveObject(), c && canvas.remove(c).add(newText)), canvas.setActiveObject(newText)) : (e.setText(a), "textbox" == e.type ? (CurvedText.setText(a), c = canvas.getActiveObject(), canvas.remove(c).add(CurvedText), canvas.setActiveObject(CurvedText)) : canvas.setActiveObject(e)), makeTextCenter(), canvas.renderAll()
    }
}, left.onclick = function() {
    null !== canvas.getActiveObject() && ($(this).addClass("active").siblings().removeClass("active"), canvas.getActiveObject().setLeft(0), canvas.getActiveObject().setCoords())
}, center.onclick = function() {
    null !== canvas.getActiveObject() && ($(this).addClass("active").siblings().removeClass("active"), canvas.getActiveObject().center(), canvas.getActiveObject().setCoords())
}, right.onclick = function() {
    null !== canvas.getActiveObject() && ($(this).addClass("active").siblings().removeClass("active"), canvas.getActiveObject().setLeft($("#canvas-wrapper").width() - canvas.getActiveObject().width), canvas.getActiveObject().setCoords())
}, flip_item.onclick = function() {
    null !== canvas.getActiveObject() && (canvas.getActiveObject().getFlipX() ? canvas.getActiveObject().setFlipX(!1) : canvas.getActiveObject().setFlipX(!0))
}, edit.onclick = function() {
    ["curvedText", "textbox"].indexOf(canvas.getActiveObject().type) != -1 && ($(".edit-text-wrapper").toggleClass("hidden"), $(this).toggleClass("active"))
}, bold.onclick = function() {
    if (["curvedText", "textbox"].indexOf(canvas.getActiveObject().type) != -1) {
        var e = canvas.getActiveObject().getFontWeight();
        $(this).toggleClass("active"), "bold" != e ? canvas.getActiveObject().setFontWeight("bold") : canvas.getActiveObject().setFontWeight("normal")
    }
}, italic.onclick = function() {
    if (["curvedText", "textbox"].indexOf(canvas.getActiveObject().type) != -1) {
        var e = canvas.getActiveObject().getFontStyle();
        $(this).toggleClass("active"), "italic" != e ? canvas.getActiveObject().setFontStyle("italic") : canvas.getActiveObject().setFontStyle("normal")
    }
}, $("#images-container label").click(function() {
    var e = $(this).children("i"),
        t = "i." + e.prop("classList")[1],
        a = window.getComputedStyle(document.querySelector(t), ":before").getPropertyValue("content").slice(1, -1),
        c = new fabric.IText(a, {
            fontFamily: "FontAwesome",
            fontSize: 100,
            textAlign: "center",
            editable: !1
        });
    canvas.add(c).centerObject(c), c.setCoords(), canvas.setActiveObject(c), canvas.renderAll()
}), bring_forward.onclick = function() {
    null !== canvas.getActiveObject() && (canvas.getActiveObject().bringForward(), canvas.deactivateAll(), canvas.renderAll())
}, bring_backward.onclick = function() {
    null !== canvas.getActiveObject() && (canvas.getActiveObject().sendBackwards(), canvas.deactivateAll(), canvas.renderAll())
}, remove_btn.onclick = function() {
    null !== canvas.getActiveObject() && swal({
        title: "",
        text: "Do you want to delete the element?",
        type: "warning",
        showCancelButton: !0,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes! delete it."
    }).then(function() {
        if (1 == canvas.getObjects().length) swal("", "Sorry! there must have single element present in canvas.", "error");
        else if ("curvedText" == canvas.getActiveObject().type || "i-text" == canvas.getActiveObject().type) {
            var e = canvas.getActiveObject();
            e && canvas.remove(e)
        } else canvas.getActiveObject().remove()
    })
}, $("#font_family").change(function(e) {
    ["curvedText", "textbox"].indexOf(canvas.getActiveObject().type) != -1 && (canvas.getActiveObject().setFontFamily($("#font_family option:selected").val()), canvas.getActiveObject().setCoords(), makeTextCenter(), canvas.renderAll(), e.preventDefault())
}), elem1.onchange = function() {
    null !== canvas.getActiveObject() && ["curvedText", "textbox"].indexOf(canvas.getActiveObject().type) != -1 && ($(".fontRange .range-handle").attr("title", elem1.value), canvas.getActiveObject().setFontSize(elem1.value), makeTextCenter(), canvas.renderAll())
}, $(document).on("change", "#curve", function() {
    "curvedText" == canvas.getActiveObject().type && ($(".curve-text-wrapper").toggleClass("hidden"), $("#curve").is(":checked") ? canvas.getActiveObject().set("effect", "curved") : canvas.getActiveObject().set("effect", "STRAIGHT"))
}), $(document).on("change", "#reverse", function() {
    "curvedText" == canvas.getActiveObject().type && ($("#reverse").is(":checked") ? canvas.getActiveObject().set("reverse", !0) : canvas.getActiveObject().set("reverse", !1))
}), elem2.onchange = function() {
    "curvedText" == canvas.getActiveObject().type && canvas.getActiveObject().set("radius", elem2.value)
}, elem3.onchange = function() {
    "curvedText" == canvas.getActiveObject().type && canvas.getActiveObject().set("spacing", elem3.value)
}, add_text.onclick = function() {
    var e = CurvedTextCopy.clone();
    obj_params = {
        effect: "STRAIGHT",
        width: 300,
        fill: "#000000",
        fontFamily: "Georgia",
        fontSize: 40,
        type: "curvedText"
    }, e.setText("My MCZ ID"), e.setOptions(obj_params), canvas.add(e).setActiveObject(e), canvas.centerObject(e), e.setCoords()
}, add_image.onclick = function() {
    $("#fileLoader").click()
}, document.getElementById("fileLoader").addEventListener("change", function(e) {
    var t = e.target.files[0],
        a = new FileReader;
    a.onload = function(e) {
        var t = e.target.result;
        fabric.Image.fromURL(t, function(e) {
            var t = e.set({
                left: 0,
                top: 0,
                angle: 0
            }).scale(.9);
            canvas.add(t).renderAll();
            canvas.setActiveObject(t), canvas.toDataURL({
                format: "png",
                quality: .8
            })
        })
    }, a.readAsDataURL(t)
}), $(document).on("click", ".angel-tattoos-wrapper a", function() {
    var e = $.magnificPopup.instance,
        t = CurvedTextCopy.clone();
    obj_params = {
        effect: "STRAIGHT",
        width: 300,
        fill: "#000000",
        fontFamily: $(this).data("font"),
        fontSize: 80,
        type: "i-text"
    }, t.setText($(this).data("text")), t.setOptions(obj_params), canvas.add(t).setActiveObject(t), canvas.centerObject(t), t.setCoords(), e.close()
}), $(document).on("click", ".quotes-wrapper a", function() {
    var e = $.magnificPopup.instance,
        t = newText.clone();
    obj_params = {
        effect: "STRAIGHT",
        width: 300,
        fontFamily: "Georgia",
        fontSize: 40
    }, t.setText($(this).data("text")), t.setOptions(obj_params), canvas.add(t).setActiveObject(t), canvas.centerObject(t), t.setCoords(), e.close()
}), $(document).on("click", ".icon-tattoos-wrapper a.ficon", function() {
    var e = $.magnificPopup.instance,
        t = CurvedTextCopy.clone();
    obj_params = {
        effect: "STRAIGHT",
        width: 300,
        fill: "#000000",
        fontFamily: $(this).data("font"),
        fontSize: 80,
        type: "i-text"
    }, t.setText($(this).data("text")), t.setOptions(obj_params), canvas.add(t).setActiveObject(t), canvas.centerObject(t), t.setCoords(), e.close()
}), $(".images-list img").click(function() {
    var e = $(this).attr("src");
    fabric.Image.fromURL(e, function(e) {
        var t = e.set({
            left: 0,
            top: 0,
            angle: 0
        }).scale(.9);
        canvas.add(t).renderAll(), canvas.setActiveObject(t)
    })
}), print_canvas.onclick = function() {
    canvas.deactivateAll(), window.setTimeout(function() {
        window.print()
    }, 500)
}, reset_canvas.onclick = function() {
    window.location.reload()
};
var initiateFileDownload = function(e, t) {
    var a = document.createElement("a");
    "string" == typeof a.download ? (fabric.document.body.appendChild(a), a.download = t, a.href = e, a.click(), document.body.removeChild(a)) : location.replace(e)
};