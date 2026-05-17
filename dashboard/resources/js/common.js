/**
 * header.jsp 에 hidden 속성으로 contextPath를 먼저 지정한다. <input type="hidden" id="contextPath" value="<%=request.getContextPath()%>">
 *
 * @param url
 * @returns {contextPath}/url
 */
function makeApiUrl(url) {
    return $("#contextPath").val() + url;
}

function goPage(url) {
    location.href = makeApiUrl(url);
}

function showLoading() {
    $("#loading").remove();
    $("body").append($('<div id="loading" class="loading_area"><div class="loading_box"><img src="' + makeApiUrl("/resources/images/loading_img.svg") + '"></div></div>'));
}

function hideLoading() {
    $(".loading_area").fadeOut();
}

function isFunction(functionName) {
    return typeof window[functionName] === "function";
}

function handleErrorStatus(jqXHR, forbidden) {
    if (jqXHR.status === 401) {
        alert("세션이 만료되었습니다. 다시 로그인을 해주세요.");
        // document.location.href = makeApiUrl("/");
    } else if (jqXHR.status === 403) {
        // console.log(JSON.stringify(jqXHR.responseText,null,4));
    } else if (jqXHR.status === 404) {
        // console.log(JSON.stringify(jqXHR.responseText,null,4));
    } else if (jqXHR.status === 400) {
        // console.log(JSON.stringify(jqXHR.responseText,null,4));
    } else if (jqXHR.status === 405) {
    } else if (jqXHR.status === 500) {
        // console.log(JSON.stringify(jqXHR.responseText,null,4));
    } else {
        // console.log(JSON.stringify(jqXHR.responseText,null,4));
    }
}

function getTransferData(data) {
    var transferData = "";
    if (typeof data === "object") {
        transferData = data;
    } else if (typeof data === "string") {
        transferData = data !== "" ? $("#" + data).serialize() : "";
    }
    return transferData;
}

/**
 * POST 방식 ajax 호출
 *
 * @param url
 * @param callbackFunc
 * @param data
 * @param callbackFailFunc
 * @param ajaxAsync ( default = true )
 */
function callAjaxPost(url, callbackFunc, data, callbackFailFunc, ajaxAsync, loading) {
    if (ajaxAsync === undefined || ajaxAsync === "") {
        ajaxAsync = true;
    }

    if (loading === undefined) {
        loading = true;
    }

    let transferData = getTransferData(data);

    url = makeApiUrl(url);

    $.ajax({
        type: "post",
        async: ajaxAsync,
        url: url,
        data: transferData,
        dataType: "json",
        cache: false,
        xhrFields: {
            withCredentials: true,
        },
        crossDomain: true,
        beforeSend: function (jqXHR) {
            if (loading) {
                showLoading();
            }
            jqXHR.setRequestHeader("AJAX", "true");
        },
        complete: function () {
            if (loading) {
                hideLoading();
            }
        },
        success: function (data, textStatus, jqXHR) {
            if (isFunction(callbackFunc)) {
                window[callbackFunc](data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (isFunction(callbackFailFunc)) {
                window[callbackFailFunc](jqXHR.responseJSON);
            } else {
                handleErrorStatus(jqXHR);
            }
        },
    });
}

function callByMultipartFormData(url, callbackFunc, data, callbackFailFunc, ajaxAsync, loading) {
    if (ajaxAsync === undefined || ajaxAsync === "") {
        ajaxAsync = true;
    }

    if (loading === undefined) {
        loading = true;
    }

    url = makeApiUrl(url);

    $.ajax({
        type: "post",
        async: ajaxAsync,
        url: url,
        data: data,
        dataType: "json",
        cache: false,
        xhrFields: {
            withCredentials: true,
        },
        beforeSend: function (jqXHR) {
            if (loading) {
                showLoading();
            }
            jqXHR.setRequestHeader("AJAX", "true");
        },
        crossDomain: true,
        processData: false,
        contentType: false,
        complete: function () {
            if (loading) {
                hideLoading();
            }
        },
        success: function (data, textStatus, jqXHR) {
            if (isFunction(callbackFunc)) {
                window[callbackFunc](data);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (isFunction(callbackFailFunc)) {
                window[callbackFailFunc](jqXHR);
            } else {
                handleErrorStatus(jqXHR);
            }
        },
    });
}


// function swConfirm(icon, denyTF, msg, confirmFunc) {
function swConfirm(denyTF, msg, confirmFunc) {
    Swal.fire({
        // icon: icon,
        title: msg,
        showDenyButton: denyTF,
        confirmButtonText: "확인",
        confirmButtonClass: "sweetalertBtn",
        denyButtonText: "취소",
        denyButtonClass: "denyBtn",
        buttonsStyling: false,
    }).then((result) => {
        if (result.isConfirmed && confirmFunc) {
            const fn = window[confirmFunc];
            if (typeof fn === "function") fn();
        }
    });
}