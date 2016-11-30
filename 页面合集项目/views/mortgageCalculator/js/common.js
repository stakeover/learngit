dklilv_array = new Array;
dklilv_array[0] = new Array;
dklilv_array[0][0] = new Array;
//dklilv_array[0][0]=["6.80", "6.55", "6.15", "5.9", "5.65"];
dklilv_array[0][0][0] = 6.80;
dklilv_array[0][0][1] = 6.55;
dklilv_array[0][0][2] = 6.15;
dklilv_array[0][0][3] = 5.9;
dklilv_array[0][0][4] = 5.65;

dklilv_array[0][1] = new Array;
//dklilv_array[0][1]=["6.65", "6.40", "6.00", "5.75", "5.50"];
dklilv_array[0][1][0] = 6.65;
dklilv_array[0][1][1] = 6.40;
dklilv_array[0][1][2] = 6.00;
dklilv_array[0][1][3] = 5.75;
dklilv_array[0][1][4] = 5.50;

dklilv_array[1] = new Array;
dklilv_array[1][0] = new Array;
//dklilv_array[1][0]=["4.70", "4.50", "4.25", "4.00", "3.75"];
dklilv_array[1][0][0] = 4.70;
dklilv_array[1][0][1] = 4.50;
dklilv_array[1][0][2] = 4.25;
dklilv_array[1][0][3] = 4.00;
dklilv_array[1][0][4] = 3.75;

dklilv_array[1][1] = new Array;
//dklilv_array[1][1]=["4.20", "4.00", "3.75", "3.50", "3.25"];
dklilv_array[1][1][0] = 4.20;
dklilv_array[1][1][1] = 4.00;
dklilv_array[1][1][2] = 3.75;
dklilv_array[1][1][3] = 3.50;
dklilv_array[1][1][4] = 3.25;
var year = 20;//贷款年限
var mort = 7;//按揭几成
var dkll = 6.80 / 100;//年利率
var indextype = 0;
var indexyear = 0;
var indexstand = 0;
var uprice;
var area;
var total;
var choose = 0;
var formaterror = false;
$(init);
function init() {
    radioDiv();
    loanDiv();
    checkDiv();
    showlilvzhi();
    $(".result .count").on("click", function () {
        startcount();
    });
    $(".result .rewrite").on("click", function () {
        reset();
    });
    $(".nav li").find("a").each(function () {
        $(this).on("click", function () {
            $(".nav li").find("a").each(function () {
                $(this).removeClass("current");
            });
            $(this).addClass("current");
            var activecontent = $(this).attr("data-name");
            $("." + activecontent).siblings().slideUp();
            $("." + activecontent).slideDown();
        });
    });
}
function showlilvzhi() {
    var dkllzhi = dklilv_array[indextype][indexyear][indexstand];
    $(".loan_div input.lilvzhi").val(dkllzhi);
    dkll = parseFloat($(".loan_div input.lilvzhi").val()) / 100;
}
function radioDiv() {
    $(".radio_div input[name=dktype]").on("change", function () {
        indextype = parseInt($(this).val());
        showlilvzhi();
    });
}
function checkDiv() {
    var $area = $(".number input[name=area]");
    var $uprice = $(".number input[name=unitprice]");
    var $total = $(".number input[name=total]");
    $uprice.on("focus", function () {
        $(this).siblings(".inputerror").hide();
        $(".inerror").hide();
    });
    $area.on("focus", function () {
        $(this).siblings(".inputerror").hide();
        $(".inerror").hide();
    });
    $total.on("focus", function () {
        $(".inputerror").hide();
    });
    $uprice.on("blur", function () {
        validity($(this));
        uprice = parseFloat($(this).val());
        $total.val("");
    });
    $area.on("blur", function () {
        validity($(this));
        area = parseFloat($(this).val());
        $total.val("");
    });
    $total.on("blur", function () {
        validity($(this));
        total = parseFloat($(this).val());
        $uprice.val("");
        $area.val("");
    });
function validity(obj) {
    var reg = /^[0-9.]+$/;
    if (reg.test(obj.val())) {
        obj.siblings(".inputerror").hide();
        formaterror = false;
    }
    else {
        if (obj.val().length == 0) {
            obj.siblings(".inputerror").text("输入字符不能为空!");
            formaterror = true;
        } else {
            obj.siblings(".inputerror").text("输入格式有错！！！");
            formaterror = true;
        }
        obj.siblings(".inputerror").show();
    }
}

var mortgage = $(".check_child #mortgage");
var check = $(".check_div #years");
check.on("change", function () {
    year = $(this).val();
    if (year <= 5) {
        indexyear = 1;
    } else {
        indexyear = 0;
    }
    showlilvzhi();
});
mortgage.on("change", function () {
    mort = parseFloat($(this).val());
});
$(".check_div input[name=basis]").on("change", function () {
    $(this).siblings(".check_child").slideUp();
    $(this).next().next().slideDown();
    if ($(this).attr("class") == "count1") {
        choose = 0;
    } else {
        choose = 1;
    }
});
}
function loanDiv() {
    var dklilv = $(".loan_div #lilv");
    dklilv.on("change", function () {
        indexstand = parseInt($(this).find("option:selected").val());
        showlilvzhi();
    });
}
function startcount() {
    var fktotal, dktotal, hktotal, interesttotal, sqpay, dkmonth, payPerMonth;
    if((($("#errornode1").val().length==0||$("#errornode2").val().length==0)&&$(".count1:checked").val()==0)||($("#errornode3").val().length==0&&$(".count2:checked").val()==1)){
    //if((($("#errornode1").val().length==0||$("#errornode2").val().length==0||formaterror)&&$(".count1:checked").val()==0)||($("#errornode3").val().length==0||formaterror)&&$(".count2:checked").val()==1){
        $(".number input").each(function () {
            $(this).siblings(".inputerror").show();
        });
        alert("输入格式有误");
        return;
    }
        if (choose == 1) {
            fktotal = "";
            dktotal = total;
            sqpay = "";
        } else {
            fktotal = uprice * area;
            dktotal = fktotal * (mort / 10);
            sqpay = fktotal * ((10 - mort) / 10);
        }
        dkmonth = year * 12;
        var interestPerMonth = dkll / 12;
        // 月还款本息=〔贷款本金×月利率×（1＋月利率）＾还款月数〕÷〔（1＋月利率）＾还款月数－1〕
        payPerMonth = (dktotal * interestPerMonth * Math.pow((1 + interestPerMonth), dkmonth)) / (Math.pow((1 + interestPerMonth), dkmonth) - 1);
        hktotal = payPerMonth * dkmonth;
        interesttotal = hktotal - dktotal;
        $(".look_div li input[name=fkt]").val(fktotal);
        $(".look_div li input[name=dkt]").val(dktotal.toFixed(2));
        $(".look_div li input[name=hkt]").val(hktotal.toFixed(2));
        $(".look_div li input[name=int]").val(interesttotal.toFixed(2));
        $(".look_div li input[name=spay]").val(sqpay);
        $(".look_div li input[name=dkmonth]").val(dkmonth);
        $(".look_div li input[name=ppm]").val(payPerMonth.toFixed(2));
}
function reset() {
    document.getElementById("loanform").reset();
    document.getElementById("lookresult").reset();
    $(".check_div .count1").trigger("change");
    $(".inputerror").hide();
    $(".lilvzhi").val("6.8");
}