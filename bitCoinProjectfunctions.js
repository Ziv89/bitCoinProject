


var id2 = 999;
var flagmoreinfo = false;
var flagmoreinfocoin = false;
var preid = "null";
var preidcoin = "null";
var checkedcounted = 0;
var sixthcoin = "null";
var sixthcoinSymbol = "null";
var coinsIDarr = ["null", "null", "null", "null", "null"];
var symbol;
var coinsIDarrModel = ["null", "null", "null", "null", "null"];
 var coinsSymbols = ["null", "null", "null", "null", "null"];
var hourcount = 0;
var dataCoins1 = [];
var dataCoins2 = [];
var dataCoins3 = [];
var dataCoins4 = [];
var dataCoins5 = [];
var dataCoins6 = [];

var yValue1 = 600;
var yValue2 = 605;
var yValue3 = 605;
var yValue4 = 605;
var yValue5 = 605;
var yValue6 = 605;
var flagmodel = false;
// initial value




var updateInterval = 2000;


function hidenMymodel()
{
    flagmodel = false;
    checkedcounted = 0;

    for (let i = 0; i < coinsIDarr.length; i++) {
        if (coinsIDarr[i] != "null") {
            checkedcounted++;
        }
        }
    
    document.getElementById("myModal").style.visibility = "hidden";
    sixthcoin = "null";
    sixthcoinSymbol = "null";
    document.getElementById("model_table").innerHTML = "";

    flagmoreinfocoin = false;
    preidcoin = "null";

    if (flagmoreinfo == true) {

    $(".table_cube").css('height', 600);
    }
}


function saveChecked() {
    let flag = false;
    let flagsixcoin = false;
    var tempcoinsSymbols = ["null", "null", "null", "null", "null"];
    var tempcoinsIDarr = ["null", "null", "null", "null", "null"];
    for (let i = 0; i < coinsIDarr.length; i++) {
        tempcoinsIDarr[i] = coinsIDarr[i];
        tempcoinsSymbols[i] = coinsSymbols[i];
    }


    for (let i = 0; i < coinsIDarr.length; i++) {
        coinsIDarr[i] = coinsIDarrModel[i];
        if (coinsIDarr[i] == "null") {

            coinsSymbols[i] = "null";
        }
        if (coinsIDarrModel[i] == "null" && flagsixcoin == false) {
            flagsixcoin = true;
            coinsIDarr[i] = sixthcoin;
            coinsSymbols[i] = sixthcoinSymbol;
        }
    }
    flag = false;
    checkedcounted = 0;
    let tempid = "null";

    for (let i = 0; i < coinsIDarr.length; i++) {
        if (coinsIDarr[i] != "null") {
            checkedcounted++;
        }
    }

    for (let i = 0; i < tempcoinsIDarr.length; i++) {
        tempid = tempcoinsIDarr[i];
        flag = false;
        for (let j = 0; j < coinsIDarr.length; j++) {
            if (tempid == coinsIDarr[j]) {
                flag = true;
            }
        }
        if (flag == false) {
            removeOrAddChecked(tempid, flag);
        }

    }

    if (flagsixcoin==true) {
        removeOrAddChecked(sixthcoin, flagsixcoin);
    }
    hidenMymodel();
}



function removeOrAddChecked(ElementID, flag) {

    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list", // The Address To Send The Request to
        type: "get", //the request protocol type
        data: {}, // the data we want to send to the server
        success: function (result) { // the callback function to run when we get the data back from the server
            console.log(result);
            for (let i = 0; i < result.length; i++) {

                if (result[i].id == ElementID) {
                    if (flag == false) {
                        document.getElementById(i).checked = false;
                    }
                    else {
                        document.getElementById(i).checked = true;


                    }

                    break;
                }
            };


        }
    });

}

function checkIfChecked(ElementID, CoinID, CoinSymbol) {

    let min = 0;
    let max = 5;
   // coinsIDarr
    let isChecked = document.getElementById(ElementID).checked;

    if (checkedcounted < max)
        if (isChecked == true) {

            for (let i = 0; i < coinsIDarr.length; i++) {
                if (coinsIDarr[i] == "null") {
                    coinsIDarr[i] = CoinID;
                    coinsSymbols[i] = CoinSymbol;
                    checkedcounted++;
                    return;
                }
            }

            checkedcounted++;
            return;
        }

    if (checkedcounted > (min-1)) {
        if (isChecked == false) {

            for (let i = 0; i < coinsIDarr.length; i++) {
                if (coinsIDarr[i] == CoinID) {
                    coinsIDarr[i] = "null";
                    coinsSymbols[i] = "null";
                    checkedcounted--;
                    return;
                }
            }
            checkedcounted--;

            return;
        }
    }
    if (checkedcounted == max) {
        sixthcoin = CoinID;
        sixthcoinSymbol = CoinSymbol;
        document.getElementById(ElementID).checked = false;
        for (let i = 0; i < coinsIDarr.length; i++) {
            coinsIDarrModel[i] = coinsIDarr[i];
        }
        if (flagmodel == false) {

            flagmodel = true;
            newWindowTable();
        }
    }
}



function checkIfCheckedmodel(ElementID, CoinID,CoinSymbol) {

    


    let isChecked = document.getElementById(ElementID).checked;


    if (isChecked == true) {
        for (let i = 0; i < coinsIDarrModel.length; i++) {
                if (coinsIDarrModel[i] == "null") {
                    coinsIDarrModel[i] = CoinID;
                    checkedcounted++;
                    return;
                }
            }

            if (checkedcounted < 5) {
                checkedcounted++;
            }
            return;
        }


    if (isChecked == false) {

        for (let i = 0; i < coinsIDarrModel.length; i++) {
                if (coinsIDarrModel[i] == CoinID) {
                    coinsIDarrModel[i] = "null";

                    checkedcounted--;
                    return;
                }
            }
            if (checkedcounted > 0) {
                checkedcounted--;
            }

            return;
        }
    }




function newWindowTable() {

    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list", // The Address To Send The Request to
        type: "get", //the request protocol type
        data: {}, // the data we want to send to the server
        success: function (result) { // the callback function to run when we get the data back from the server
            console.log(result);
            var counterarr = 0;
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < coinsIDarr.length; j++) {

                    if (coinsIDarr[j] == result[i].id) {

                        let table_cube = $("<div  class='table_cube'></div>");

                        //let table_cube = $("<div class='country_cube'></div>");
                        //$(".country_cube").css("text-align", "center");
                        //$(".country_cube").css("float", "left");
                        let titlecoin = result[i].name;
                        let subcoin = result[i].symbol;
                        let id = i + "coin";
                        let coinid = result[i].id; 
                        let coinmodelis =coinid + "coin";
                        let html = '<br><br><div class="titlecoint"><b><font size=3>' + titlecoin + '</font></b></div>';


                        html += '<br><br><div class="subcoin" "><font size=2>' + subcoin + '</font></div>';


                        html += "<label ><br><br><br><br><button class=moreinfobutton onclick=showMoreInfomodel('" + coinid + "','" + coinmodelis + "');>" + "More Info" + '</button></label>';

                        //html += "<div><label  class=switch   onchange=checkIfChecked('" + coinid + "');>" + "<input type =checkbox id=" + id + "><span  class=slider round ></span></label></div>';

                        html += "<div ><label  class=switch  onchange=checkIfCheckedmodel('" + id + "','" + coinid + "','" + subcoin + "')><input type =checkbox checked=checked id=" + id + "><span  class=slider round ></span></label></div>";

                        html += "<div class=moreinfo  id='" + coinmodelis + "' value= " + coinmodelis + "></div>";
                        // html += "<br><br><div class=moreinfo id=" + coinid + "'value=" + coinid+"</div>";


                        // html += "<br><div class=moreinfo  id='" + titlecoin + '"><b>' + titlecoin + '</b><br><br></div>';
                        $(table_cube).html(html);



     
                        $(".table_list_model").append(table_cube);

                        document.getElementById(id).checked = true;

                    }
                }
            };


        }
    });

    document.getElementById("myModal").style.visibility = "visible";

}

function getCoins() {
    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list", // The Address To Send The Request to
        type: "get", //the request protocol type
        data: {}, // the data we want to send to the server
        success: function (result) { // the callback function to run when we get the data back from the server
            console.log(result);
        // document.getElementsByClassName("loader").style.visibility = "visible";




             
            for (let i = 0; i <100; i++) {

                let table_cube = $("<div  class='table_cube'></div>");

                //let table_cube = $("<div class='country_cube'></div>");
                //$(".country_cube").css("text-align", "center");
                //$(".country_cube").css("float", "left");
                let titlecoin = result[i].name;
                let subcoin = result[i].symbol;
                let id = i;
                let coinid = result[i].id;
                let html = '<br><br><div class="titlecoint"><b><font size=3>' + titlecoin + '</font></b></div>';

                html += '<br><br><div class="subcoin" "><font size=2>' + subcoin + '</font></div>';


                html += "<label ><br><br><br><br><button class=moreinfobutton onclick=showMoreInfo('" + coinid + "');>" + "More Info" + '</button></label>';

                //html += "<div><label  class=switch   onchange=checkIfChecked('" + coinid + "');>" + "<input type =checkbox id=" + id + "><span  class=slider round ></span></label></div>';

                html += "<div ><label  class=switch  onchange=checkIfChecked(" + id + ",'" + coinid + "','" + subcoin + "')><input type =checkbox id=" + id +"><span  class=slider round></span></label></div>";

                html += "<div class=moreinfo  id='" + coinid + "' value= " + coinid + "></div>";
               // html += "<br><br><div class=moreinfo id=" + coinid + "'value=" + coinid+"</div>";


               // html += "<br><div class=moreinfo  id='" + titlecoin + '"><b>' + titlecoin + '</b><br><br></div>';
                $(table_cube).html(html);

                $(".table_list").append(table_cube);

   
                for (let j = 0; j < coinsIDarr.length; j++) {
                    if (coinsIDarr[j] != "null") {
                        //removeOrAddChecked(coinsIDarr[j], true);

                        if (result[i].id == coinsIDarr[j]) {

                            document.getElementById(i).checked = true;

                        }
                    }
                }

                getOffLoading();
            };
        }
    });

}

function getPriceCoins() {
    let coins = "";


   let SymbolsArr= ["null", "null", "null", "null", "null"];

    let j = 0;
    let flag = false;
    for (let i = 0; i < coinsSymbols.length; i++) {
        if (coinsSymbols[i] != "null") {
            if (flag == true) {
                coins += ",";
            }
            coins += coinsSymbols[i].toUpperCase();
            SymbolsArr[j++] = coinsSymbols[i].toUpperCase();
            flag = true;
        }
    }

    document.getElementById("coinsChartComprasion").style.visibility = "visible";
    flag = false;
    getCoinsGraph(coins, SymbolsArr);

}




function getCoinsGraph(coins, SymbolsArr) {

    let j = 0;
    var flagcoinsarr = [false, false, false, false, false];



    for (let i = 0; i < SymbolsArr.length; i++) {
        if (SymbolsArr[i] != "null") {
            flagcoinsarr[j++] = true;

        }
    }

    var chart = new CanvasJS.Chart("coinsChartComprasion", {
        zoomEnabled: false,
        title: {
            text:"USD"
        },
        axisX: {
            title: "chart updates every 2 secs"
        },
        axisY: {
            prefix: "",
            includeZero: false
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 25,
            fontColor: "dimGrey",
            //itemclick: toggleDataSeries
        },
        data: [{
            type: "line",
            position: "absolute",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            xValueFormatString: "hh-mm-ss TT",
            showInLegend: true,
            name: "USD",
            dataPoints: [
                //{ label: "00:00", y: 1 }
            ]
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "$####.00",
            showInLegend: flagcoinsarr[0],
            name: SymbolsArr[0],
            dataPoints: [
               /*{ label: "00:00", y: 1 }*/]
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                showInLegend: flagcoinsarr[1],
                name: SymbolsArr[1],
                dataPoints: [
                   /* { label: "00:00", y: 1 }*/]
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                showInLegend: flagcoinsarr[2],
                name: SymbolsArr[2],
                dataPoints: [
                    /*{ label: "00:00", y: 1 }*/]
            },
            {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                showInLegend: flagcoinsarr[3],
                name: SymbolsArr[3],
                dataPoints: [
                    /*{ label: "00:00", y: 1 }*/]
            },
               {
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "$####.00",
                showInLegend: flagcoinsarr[4],
                name: SymbolsArr[4],
                dataPoints: [
                   /* { label: "00:00", y: 1 }*/]
            }
        ]
    });


    var updateChart = function (coins, SymbolsArr, time) {
        $.ajax({
            url: "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=" + coins + ",USD&api_key=d89da1243aeca0f169de9a40101e822dd2d78e0b4fcf06564fdcb30f0fb3ba03", // The Address To Send The Request to
            type: "get", //the request protocol type
            data: {}, // the data we want to send to the server
            success: function (result) { // the callback function to run when we get the data back from the server
                console.log(result);

    
                let CoinSymbolsArr = JSON.stringify(result);
                let coinusd = result.USD;
                let coinstitle = "";
                let coinsnotsupported ="";
                let coin1 = null;
                let coin2 = null;
                let coin3 = null;
                let coin4 = null;
                let coin5 = null;
                let countnotexist = 0;
                dataCoins1.push(chart.options.data[0].dataPoints);

  
                if (SymbolsArr[0] != "null") {
                    dataCoins2.push(chart.options.data[1].dataPoints);
                    coin1 = result[SymbolsArr[0]];
                    if (typeof coin1 != 'undefined') {


                        coinstitle = SymbolsArr[0];
                    }
                    else {
                        coinsnotsupported += SymbolsArr[0];
                        countnotexist++;
                    }

                }
                    else {
                    countnotexist++;
                }

                

                if (SymbolsArr[1] != "null") {

                    dataCoins3.push(chart.options.data[2].dataPoints);
                    coin2 = result[SymbolsArr[1]];


                    if (typeof coin2 != 'undefined') {

                        if (coinstitle == "") {


                            coinstitle += SymbolsArr[1];
                        }
                        else {
                            coinstitle += "," + SymbolsArr[1];

                        }
                    }

                    else {
                        if (coinsnotsupported == "") {


                            coinsnotsupported += SymbolsArr[1];
                        }
                        else {
                            coinsnotsupported +=","+SymbolsArr[1];
                        }
                        countnotexist++;

                    }
        

                }
                else {
                    countnotexist++;
                }

                if (SymbolsArr[2] != "null") {

                    dataCoins4.push(chart.options.data[3].dataPoints);
                    coin3 = result[SymbolsArr[2]];
                    if (typeof coin3 != 'undefined') {


                        if (coinstitle == "") {


                            coinstitle += SymbolsArr[2];
                        }
                        else {
                            coinstitle += "," + SymbolsArr[2];

                        }
                    }

                    else {
                        if (coinsnotsupported == "") {


                            coinsnotsupported += SymbolsArr[2];
                        }
                        else {
                            coinsnotsupported += "," + SymbolsArr[2];
                        }
                        countnotexist++;

                    }


                }
                else {
                    countnotexist++;
                }

                if (SymbolsArr[3] != "null") {

                    dataCoins5.push(chart.options.data[4].dataPoints);

                    coin4 = result[SymbolsArr[3]];

                    if (typeof coin4 != 'undefined') {


                        if (coinstitle == "") {


                            coinstitle += SymbolsArr[3];
                        }
                        else {
                            coinstitle += "," + SymbolsArr[3];

                        }

                    }

                    else {
                        if (coinsnotsupported == "") {


                            coinsnotsupported += SymbolsArr[3];
                        }
                        else {
                            coinsnotsupported += "," + SymbolsArr[3];
                        }
                        countnotexist++;

                    }

                }
                else {
                    countnotexist++;
                }


                if (SymbolsArr[4] != "null") {

                    dataCoins6.push(chart.options.data[5].dataPoints);

                    coin5 = result[SymbolsArr[4]];

                    if (typeof coin5 != 'undefined') {


                        if (coinstitle == "") {


                            coinstitle += SymbolsArr[4];
                        }
                        else {
                            coinstitle += "," + SymbolsArr[4];

                        }
                    }
                    else {
                        if (coinsnotsupported == "") {


                            coinsnotsupported += SymbolsArr[4];
                        }
                        else {
                            coinsnotsupported += "," + SymbolsArr[4];
                        }
                        countnotexist++;

                    }

                }
                else {
                    countnotexist++;
                }


                if (coinstitle != "") {
                    chart.options.title.text = coinstitle + " to USD";
                }

                if (dataCoins1.length > 1) {

                    time.setSeconds(time.getSeconds() + 5);
                    hourcount + 5;
                }
                var m = time.getMinutes();
                var s = time.getSeconds();
                var h = 0;
                m = checkTime(m);
                s = checkTime(s);

                let fullhour = m + ":" + s;
 
                if (hourcount >= 3600) {
                    h = parseInt((hourcount / 3600));
                    h = checkTime(h);

                    fullhour = h + ":" + m + ":" + s;

                }
            
                var boilerColor, delytey, yVal;



                for (var i = (dataCoins1.length-1); i < dataCoins1.length; i++) {




                    yVal = coinusd + dataCoins1[i].y > 0 ? dataCoins1[i].y + coinusd : coinusd;
                    boilerColor = "#0080FF";
                    dataCoins1[i] = { label: fullhour, y: coinusd, color: boilerColor };
                    chart.options.data[0].dataPoints = dataCoins1; 


                    if (coin1 != null) {
                       // yVal = coin1 + dataCoins2[i].y > 0 ? dataCoins2[i].y + coin1 : coin1;
                        boilerColor = "#A52A2A";
                        dataCoins2[i] = { label: fullhour, y: coin1, color: boilerColor };
                        chart.options.data[1].dataPoints = dataCoins2; 
                    }


                    if (coin2 != null) {
                        yVal = coin2 + dataCoins3[i].y > 0 ? dataCoins3[i].y + coin2 : coin2;
                        boilerColor = yVal > coinusd ? "#6B8E23" : yVal >= coinusd ? "#6B8E23" : yVal < coinusd ? "#6B8E23 " : null;
                        dataCoins3[i] = { label: fullhour, y: coin2, color: boilerColor };
                        chart.options.data[2].dataPoints = dataCoins3;

                    }


                    if (coin3 != null) {
                        yVal = coin3 + dataCoins4[i].y > 0 ? dataCoins4[i].y + coin3 : coin3;
                        boilerColor = "#00BFFF";
                        dataCoins4[i] = { label: fullhour, y: coin3, color: boilerColor };
                        chart.options.data[3].dataPoints = dataCoins4;

                    }

                    if (coin4 != null) {
                        yVal = coin4 + dataCoins5[i].y > 0 ? dataCoins5[i].y + coin4 : coin4;
                        boilerColor = "#551A8B";
                        dataCoins5[i] = { label: fullhour, y: coin4, color: boilerColor };
                        chart.options.data[4].dataPoints = dataCoins5;

                    }

                    if (coin5 != null) {
                        yVal = coin5 + dataCoins6[i].y > 0 ? dataCoins6[i].y + coin5 : coin5;
                        boilerColor = "#0d98ba";
                        dataCoins6[i] = { label: fullhour, y: coin5, color: boilerColor };
                        chart.options.data[5].dataPoints = dataCoins6;

                    }


                    break;
                }

                // count = count || 1;
                //dataCoins2.push({
                //    x: time.getMinutes(),
                //    y: yValue2
                //});
                //}
                // updating legend text with  updated with y Value 
                /// chart.options.data[0].legendText = " USD  $" + yValue1;
                //if (SymbolsArr[0] != "null") {
                //    chart.options.data[1].legendText = SymbolsArr[0] + " " + yValue2;
                //}

                if (coinsnotsupported != "") {

              
                     document.getElementById("nosupport").style.visibility = "visible";

                    document.getElementById("nosupport").innerHTML = "The Following Coins: <b>" + coinsnotsupported + "</b> Are not supported!";
                }

                if (countnotexist == 5 && coinsnotsupported != "") {


                    document.getElementById("nosupport").style.visibility = "visible";

                    document.getElementById("nosupport").innerHTML = "The Following Coins: <b>" + coinsnotsupported + "</b> Are not supported!  No Coins seleced to comapre!";
                    return;
                }

                if (countnotexist == 5 && coinsnotsupported =="") {


                    document.getElementById("nosupport").style.visibility = "visible";

                    document.getElementById("nosupport").innerHTML = "<b>ERROR! No coins selected!!</b>";
                    return;
                }

                chart.render();
            }
        });
    }



    var time = new Date();

    time.setHours(0);
    time.setMinutes(0);
    time.setSeconds(0);

  // updateChart(100, coins, SymbolsArr);
   // clearInterval(myVar);
    var myVar = setInterval(function () { updateChart(coins, SymbolsArr, time) }, updateInterval);

    //chart.render();
    //var myVar = setInterval(function () { updateChart(100, coins) }, updateInterval);

    $("#Home-button").click(function (e) {
        clearInterval(myVar);
        document.getElementById("nosupport").style.visibility = "hidden";
         dataCoins1 = [];
         dataCoins2 = [];
         dataCoins3 = [];
         dataCoins4 = [];
         dataCoins5 = [];
         dataCoins6 = [];
        chart.destroy();

    });

    $("#about-button").click(function (e) {
        document.getElementById("nosupport").style.visibility = "hidden";
        dataCoins1 = [];
        dataCoins2 = [];
        dataCoins3 = [];
        dataCoins4 = [];
        dataCoins5 = [];
        dataCoins6 = [];
        chart.destroy();
        clearInterval(myVar);

    });

}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

function showMoreInfo(Elementid) {



    if (flagmoreinfo == false || Elementid != preid) {
        if (preid != "null") {

           // document.getElementById(preid).style.visibility = "hidden";
        }
        preid = Elementid;
        document.getElementById(Elementid).style.visibility = "visible";
        $(".table_cube").css('height', 600);

        flagmoreinfo = true;

        // document.getElementById(Elementid).innerHTML = "";


    }
    else {
        //document.getElementById(preid).style.visibility = "hidden";
        hideAllPictures(false);
        $(".table_cube").css('height', 300);

        flagmoreinfo = false;

        return;
    }



    if (typeof localStorage.coinCurrency != 'undefined') {

        let coinsarr = JSON.parse(localStorage.coinCurrency);

        for (let i = 0; i < coinsarr.length; i++) {
            if (Elementid == coinsarr[i].coinsid) {
                document.getElementById(Elementid).innerHTML = "'<div align=center><img src=" + coinsarr[i].image + " height=50 width=50></b><br><br> <b>USD:</b> " + coinsarr[i].coinsUSD + "<b>$</b><br><br> <b>EURO:</b> " + coinsarr[i].coinsEUR + "<b>€</b> <br><br> <b>ILS:</b> " + coinsarr[i].coinsILS + "<b>₪</b></div>";

                return;
            }
        }

        
    }


    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/" + Elementid + "", // The Address To Send The Request to
        type: "get", //the request protocol type
        data: {}, // the data we want to send to the server
        success: function (result) { // the callback function to run when we get the data back from the server
            console.log(result);
            //alert(result.id);
            let image = result.image;
            let coins = result.market_data.current_price;

            var x = image.thumb;

            document.getElementById(Elementid).innerHTML = "'<div align=center><img src=" + x + " height=50 width=50></b><br><br> <b>USD:</b> " + coins.usd + "<b>$</b><br><br> <b>EURO:</b> " + coins.eur + "<b>€</b> <br><br> <b>ILS:</b> " + coins.ils + "<b>₪</b></div>";
            setCoinsStroage(Elementid, x, coins.usd, coins.eur, coins.ils);

        }
    });

}


function setCoinsStroage(coinsid, image, coinsUSD, coinsEUR, coinsILS) {
   // Elementid, image, coins


            addCoins({
                coinsid,
                image,
                coinsUSD,
                coinsEUR,
                coinsILS,
            });

}


function addCoins(coinCurrency) {

    if (typeof localStorage.coinCurrency == 'undefined') {
        localStorage.coinCurrency = JSON.stringify([]);
    } 

    let coins = JSON.parse(localStorage.coinCurrency);
    coins.push(coinCurrency);
    localStorage.coinCurrency = JSON.stringify(coins);

    //RemoveCoinsStroage();

}


function RemoveCoinsStroage() {
    //alert("removing");
    localStorage.clear();
}




function showMoreInfomodel(Elementid, ElementCoinid) {

    if (flagmoreinfocoin == false || ElementCoinid != preidcoin) {
        if (preidcoin != "null") {

           // document.getElementById(preidcoin).style.visibility = "hidden";
        }
        preidcoin = ElementCoinid;
        document.getElementById(ElementCoinid).style.visibility = "visible";
        $(".table_cube").css('height', 600);

        flagmoreinfocoin = true;

        // document.getElementById(Elementid).innerHTML = "";


    }
    else {
       // document.getElementById(preidcoin).style.visibility = "hidden";
        hideAllPictures(true);
        $(".table_cube").css('height', 300);

        flagmoreinfocoin = false;

        return;
    }



    if (typeof localStorage.coinCurrency != 'undefined') {

        let coinsarr = JSON.parse(localStorage.coinCurrency);

        for (let i = 0; i < coinsarr.length; i++) {
            if (ElementCoinid == coinsarr[i].coinsid) {
                document.getElementById(ElementCoinid).innerHTML = "'<div align=center><img src=" + coinsarr[i].image + " height=50 width=50></b><br><br> <b>USD:</b> " + coinsarr[i].coinsUSD + "<b>$</b><br><br> <b>EURO:</b> " + coinsarr[i].coinsEUR + "<b>€</b> <br><br> <b>ILS:</b> " + coinsarr[i].coinsILS + "<b>₪</b></div>";
                return;
            }
        }

    }

    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/" + Elementid + "", // The Address To Send The Request to
        type: "get", //the request protocol type
        data: {}, // the data we want to send to the server
        success: function (result) { // the callback function to run when we get the data back from the server
            console.log(result);
            //alert(result.id);
            let image = result.image;
            let coins = result.market_data.current_price;

            var x = image.thumb;

            document.getElementById(ElementCoinid).innerHTML = "'<div align=center><img src=" + x + " height=50 width=50></b><br><br> <b>USD:</b> " + coins.usd + "<b>$</b><br><br> <b>EURO:</b> " + coins.eur + "<b>€</b> <br><br> <b>ILS:</b> " + coins.ils + "<b>₪</b></div>";

            setCoinsStroage(ElementCoinid, x, coins.usd, coins.eur, coins.ils);
        }
    });

}


function searchFunction() {
    $(".table_list").html("");
    getLoading();
    if ($("#search-box").val() == "") {
        getCoins();
    } else {
        $.ajax({
            url: "https://api.coingecko.com/api/v3/coins/list/",
            type: "get",
            data: {},
            success: function (result) { // the callback function to run when we get the data back from the server
                console.log(result);

                let searchString = $("#search-box").val().toString();
                let tempString = "";

                //alert(searchString.substring(0, searchString.length));

                //alert(result[0].id.toString().substring(0, searchString.length));


                for (let i = 0; i < 100; i++) {


                  

                    tempString = result[i].name.toString().substring(0, searchString.length);

     
                    if (tempString == searchString) {
   
                        let table_cube = $("<div  class='table_cube'></div>");

                    //let table_cube = $("<div class='country_cube'></div>");
                    //$(".country_cube").css("text-align", "center");
                    //$(".country_cube").css("float", "left");
                    let titlecoin = result[i].name;
                    let subcoin = result[i].symbol;
                    let id = i;
                    let coinid = result[i].id;
                    let html = '<br><br><div class="titlecoint"><b><font size=3>' + titlecoin + '</font></b></div>';

                    html += '<br><br><div class="subcoin" "><font size=2>' + subcoin + '</font></div>';


                    html += "<label ><br><br><br><br><button class=moreinfobutton onclick=showMoreInfo('" + coinid + "');>" + "More Info" + '</button></label>';

                    //html += "<div><label  class=switch   onchange=checkIfChecked('" + coinid + "');>" + "<input type =checkbox id=" + id + "><span  class=slider round ></span></label></div>';

                        html += "<div ><label  class=switch  onchange=checkIfChecked(" + id + ",'" + coinid + "','" + subcoin + "')><input type =checkbox id=" + id + "><span  class=slider round></span></label></div>";

                    html += "<div class=moreinfo  id='" + coinid + "' value= " + coinid + "></div>";
                    // html += "<br><br><div class=moreinfo id=" + coinid + "'value=" + coinid+"</div>";


                    // html += "<br><div class=moreinfo  id='" + titlecoin + '"><b>' + titlecoin + '</b><br><br></div>';
                    // html += "<br><div class=moreinfo  id='" + titlecoin + '"><b>' + titlecoin + '</b><br><br></div>';
                    $(table_cube).html(html);

                    $(".table_list").append(table_cube);

                        for (let j = 0; j < coinsIDarr.length; j++) {
                            if (coinsIDarr[j] != "null") {

                                removeOrAddChecked(coinsIDarr[j], true);
                            }
                        }


                    }
                };

                getOffLoading();
            }
        });

    }
}






function homeFunction() {
    document.getElementById("search-box").style.visibility = "visible";
    document.getElementById("search-button").style.visibility = "visible";

    document.getElementById("mejpg").style.visibility = "hidden";
    document.getElementById("myText").style.visibility = "hidden";
    $("#coinsChartComprasion").html("");
    document.getElementById("coinsChartComprasion").style.visibility = "hidden";

    $(".table_list").html("");

    $(".about-button").html("");

    document.getElementById("search-box").value = "";

    
    document.getElementById("about-button").style.backgroundColor = "white";
    document.getElementById("about-button").style.color = "black";
    document.getElementById("about-button").style.border = "none";


    document.getElementById("liveReports").style.backgroundColor = "white";
    document.getElementById("liveReports").style.color = "black";
    document.getElementById("liveReports").style.border = "none";



    document.getElementById("Home-button").style.color = "white";
    document.getElementById("Home-button").style.backgroundColor = "blue";
    document.getElementById("Home-button").style.border = "outset";
    document.getElementById("Home-button").style.border.color = "black";


  
    getLoading();
    getCoins();

    
    var myVar = setInterval(function () { RemoveCoinsStroage() }, 120 * 1000);


    $("#liveReports").click(function (e) {
         RemoveCoinsStroage();
        clearInterval(myVar);

    });

    $("#about-button").click(function (e) {
       RemoveCoinsStroage();
        clearInterval(myVar);

    });
}



function liveReportsFunction() {

    document.getElementById("mejpg").style.visibility = "hidden";
    document.getElementById("myText").style.visibility = "hidden";
    document.getElementById("liveReports").style.backgroundColor = "blue";
    document.getElementById("liveReports").style.color = "white";
    document.getElementById("liveReports").style.border = "outset";
    document.getElementById("liveReports").style.border.color = "black";



    document.getElementById("about-button").style.backgroundColor = "white";
    document.getElementById("about-button").style.color = "black";
    document.getElementById("about-button").style.border = "none";


    document.getElementById("Home-button").style.backgroundColor = "white";
    document.getElementById("Home-button").style.color = "black";
    document.getElementById("Home-button").style.border = "none";


    //$("#Home-button").val().fontcolor("black");

    //document.getElementById("Home-button")

    document.getElementById("search-box").style.visibility = "hidden";
    document.getElementById("search-button").style.visibility = "hidden";
    $(".table_list").html("");
    getPriceCoins();


}


function aboutFunction() {
    $(".table_list").html("");
    $("#coinsChartComprasion").html("");

    document.getElementById("search-box").style.visibility = "hidden";
    document.getElementById("search-button").style.visibility = "hidden";

    document.getElementById("Home-button").style.backgroundColor = "white";
    document.getElementById("Home-button").style.color = "black";
    document.getElementById("Home-button").style.border = "none";


    document.getElementById("liveReports").style.backgroundColor = "white";
    document.getElementById("liveReports").style.color = "black";
    document.getElementById("liveReports").style.border = "none";



    document.getElementById("about-button").style.color = "white";
    document.getElementById("about-button").style.backgroundColor = "blue";
    document.getElementById("about-button").style.border = "outset";
    document.getElementById("about-button").style.border.color = "black";


    document.getElementById("coinsChartComprasion").style.visibility = "hidden";
    getAboutme();
}


function getAboutme() {

    document.getElementById("mejpg").style.visibility = "visible";
    document.getElementById("myText").style.visibility = "visible";

}
function getLoading() {
    document.getElementById("loading").style.visibility = "visible";

}

function getOffLoading() {
    document.getElementById("loading").style.visibility = "hidden";

}

window.onload = function () {


    homeFunction();
    //document.getElementById("Home-button").style.color = "white";
    //document.getElementById("Home-button").style.border = "outset";
    //document.getElementById("Home-button").style.border.color = "black";
    //getLoading();
    //getCoins();



    //let addRowToTable = function (id,titlecoint,subcoin) {
    //    let table_cube = $("<div class='table_cube'></div>");
    //    //$(".table_cube").css("text-align", "center");
    //    //$(".table_cube").css("float", "left");




    //    //y.innerHTML += '<div  align="center" id="' + id + '" > <textarea class="centered"  id="' + id + '"  rows="9"  cols="24" readonly>' + id + '</textarea></div>';

    //    //y.innerHTML += '<div id="' + id + '"  class="bottom-left">' + id + '</div>';

    //    //y.innerHTML += '<div id="' + id + '"  class="bottom-right">' + id + '</div>';
    //    $(table_cube).html(html);
    //    $(".table_list").append(table_cube);



    //};
}


function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    e.chart.render();
}

function hideAllPictures(flag) {


    $.ajax({
        url: "https://api.coingecko.com/api/v3/coins/list", // The Address To Send The Request to
        type: "get", //the request protocol type
        data: {}, // the data we want to send to the server
        success: function (result) { // the callback function to run when we get the data back from the server
            console.log(result);

            let coinid = "";
            for (let i = 0; i < 100; i++) {
                if (flag == false) {

                    coinid = document.getElementById(result[i].id);
                    //alert(x);
                    if (coinid!= null) {
                       // alert("yes");
                        document.getElementById(result[i].id).style.visibility = "hidden";
                    }
                }
                else {
                    for (let j = 0; j < coinsIDarrModel.length; j++) {
                        if (result[i].id == coinsIDarrModel[j]) {
                            coinid = coinsIDarrModel[j];
                            coinid += "coin";
                            document.getElementById(coinid).style.visibility = "hidden";
                            break;
                        }
                    }
                }
         

            };
        }
    });

}
