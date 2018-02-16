
function fix()
{
    var el = this;
    var par = el.parentNode;
    var next = el.nextSibling;
    par.removeChild(el);
    setTimeout(function() {par.insertBefore(el, next);}, 0)
}
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


var Web3 = require('web3');

web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/JZaGDyaFeZTjCR1RO6VW'));

var contractAddr = ('0xD544b300d51110197c8201fFeb15A827c05e0798');

toastr["success"](" connection", "Infura API")

var apiKey = 'IFRIBDYBZW8S8SGIEBY3ACPJPNKDBB3QFI'; // Etherscan


var balanceOf = ('0x70a08231000000000000000000000000');
var interestBy = ('0x38ab7c43000000000000000000000000');


var candidates = [
    numA = ('0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'),
    numB = ('0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'),
    numC = ('0xcccccccccccccccccccccccccccccccccccccccc'),
    numD = ('0xdddddddddddddddddddddddddddddddddddddddd'),
];
var sum = 0

for (var i = 0; i < 4; i++) {
    var balanceOfTkn = ('0x70a08231000000000000000000000000' + candidates[i].substring(2));

    var resultsTkn = web3.eth.call({
        to: contractAddr,
        data: balanceOfTkn
    });

    var resultTkn = Number(web3.fromWei(web3.toBigNumber(resultsTkn).toString() * Math.pow(10, 18), 'ether'))
    candidates[i] = resultTkn
    sum += resultTkn

};


console.log(sum);
console.log(candidates);

$('.js_contract-address').text(contractAddr).prop('href', 'https://rinkeby.etherscan.io/address/'+ contractAddr + '#readContract');

$('.num_a .js-count').text(candidates[0] + ' votes');
$('.num_b .js-count').text(candidates[1] + ' votes');
$('.num_c .js-count').text(candidates[2] + ' votes');
$('.num_d .js-count').text(candidates[3] + ' votes');
if (candidates[0] == 0){
    $('.num_a .js_circle').attr("data-percentage",0 + '%');
} else {
    $('.num_a .js_circle').attr("data-percentage", Math.round(candidates[0] * 100 /sum )  + '%');

}
if (candidates[1] == 0){
    $('.num_b .js_circle').attr("data-percentage",0 + '%');
} else {
    $('.num_b .js_circle').attr("data-percentage", Math.round(candidates[1] * 100 /sum ) + '%');

}
if (candidates[2] == 0){
    $('.num_c .js_circle').attr("data-percentage",0 + '%');
} else {
    $('.num_c .js_circle').attr("data-percentage", Math.round(candidates[2] * 100 /sum ) + '%');

}
if (candidates[3] == 0){
    $('.num_d .js_circle').attr("data-percentage",0 + '%');
} else {
    $('.num_d .js_circle').attr("data-percentage", Math.round(candidates[3] * 100 /sum ) + '%');

}
$('.pie').attr("data-pie", '#ea232a ' + Math.round(candidates[0] * 100 /sum ) + ', #2F96B4 ' + Math.round(candidates[1] * 100 /sum ) + ', #030303 ' + Math.round(candidates[2] * 100 /sum )+ ', #fefefe ' + Math.round(candidates[3] * 100 /sum ));


$( '#submit' ).on( "click", function() {
    var addr = $('#address').val();
    var tknAddress = (addr).substring(2);

    $('#toast-name-2').fadeIn(400).delay(2000).fadeOut(400);

    web3.eth.call({
        to: contractAddr,
        data: interestBy + tknAddress
    }, function (err, result) {
        if (result) {
            toastr["success"]("Successful connection", "Infura API")


            var tokens = web3.toBigNumber(result).toString();
            var isOfTkn = (web3.fromWei(tokens, 'ether') * Math.pow(10, 18)).toFixed(0)
            $('#countdown-days').text(isOfTkn + ' Golos')

        } else {
            toastr["error"]("Fail connection", "Infura API")
            console.log(err); // Dump errors here
            $.getJSON( "https://api-rinkeby.etherscan.io/api?module=proxy&action=eth_call&to="+ contractAddr +"&data="+ interestBy + tknAddress +"&tag=latest&apikey=" + apiKey, function( json ) {
                toastr["success"](" connection", "Etherscan API");
                var tokens = web3.toBigNumber(result).toString();
                var isOfTokn = (web3.fromWei(tokens, 'ether') * Math.pow(10, 18)).toFixed(0)
                $('#countdown-days').text(isOfTokn + ' POS')


            });
        }
    });

    web3.eth.call({
        to: contractAddr,
        data: balanceOf + tknAddress,
    }, function (err, result) {
        if (result) {

            var tokens = web3.toBigNumber(result).toString();
            var blOfTokn = web3.fromWei(tokens, 'ether') * Math.pow(10, 18)

            $('#coinage').text(" " + blOfTokn)

        } else {
            console.log(err); // Dump errors here
            $.getJSON( "https://api-rinkeby.etherscan.io/api?module=proxy&action=eth_call&to="+ contractAddr +"&data="+ balanceOf + tknAddress +"&tag=latest&apikey=" + apiKey, function( json ) {
                var tokens = web3.toBigNumber(result).toString();
                var blOfTokn = web3.fromWei(tokens, 'ether') * Math.pow(10, 18)

                $('#coinage').text(" " + blOfTokn)


            });
        }
    });



});

;(function(){
    /*
     * SVG Pie Chart Generator
     *
     * Inserts a SVG pie chart inside elements with a `data-pie` attribute containing the colors and numbers. Total is generated dynamically, so the numbers do not have to be a percentage.
     * Example: `<div data-pie="#fab484 5, #fe8e3f 3, #f96b07 3, #b45919 3, #7f4319 1"></div>`
     */

    var template = {
        open: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><circle id="graph" r="15.9154943092" cx="16" cy="16" transform="rotate(-90 16 16)" /><mask id="clip"><use xlink:href="#graph" fill="#FFF" /></mask></defs><g class="graph" mask="url(#clip)" stroke-width="32">',
        piece: '<use class="graph__percent graph__percent--{{num}}" xlink:href="#graph" fill="none" stroke="{{color}}" stroke-dasharray="0 {{offset}} {{percent}} 100" />',
        close: '</g></svg>'
    };
    var regex = {
        number: /([0-9]+)$/i,
        color: /(#[0-9A-Z]+)/i
    };

    function Piece(data){
        data = data.trim();
        this.number = parseInt(data.match(regex.number));
        this.color = data.match(regex.color)[1];
    }

    Piece.prototype.render = function(total,num) {
        return template.piece
            .replace('{{num}}',num)
            .replace('{{color}}',this.color)
            .replace('{{offset}}',(this.offset / total) * 100)
            .replace('{{percent}}',(this.number / total) * 100);
    }

    function Pie(elem){
        this.data = elem.getAttribute('data-pie').split(',');
        this.pieces = [];
        this.total = 0;

        var output = "",
            len = this.data.length,
            piece, i;

        for (i = 0; i < len; i++) {
            piece = new Piece(this.data[i]);
            piece.offset = this.total;
            this.total += piece.number;
            this.pieces.push(piece);
        }

        len = this.pieces.length;
        for (i = 0; i < len; i++) {
            output += this.pieces[i].render(this.total,i);
        }

        elem.innerHTML = template.open + output + template.close;
    }

    var pies = document.querySelectorAll('[data-pie]');

    for (i = 0; i < pies.length; i++) { new Pie(pies[i]); }

}());


var textarea = document.getElementById("textarea");
var copyButton= document.getElementById("copyButton");
var textarea1 = document.getElementById("textarea1");
var copyButton1= document.getElementById("copyButton1");

copyButton.addEventListener('click', function(e) {

    // Выделяем текст в поле
    textarea.select();
    // Копируем текст в буфер обмена
    document.execCommand('copy');

});
copyButton1.addEventListener('click', function(e) {

    // Выделяем текст в поле
    textarea1.select();
    // Копируем текст в буфер обмена
    document.execCommand('copy');

});


var ringer = {
    countdown_to: "03/01/2018",
    rings: {
        'DAYS': {
            s: 86400000, // mseconds in a day,
            max: 14
        },
        'HOURS': {
            s: 3600000, // mseconds per hour,
            max: 24
        },
        'MINUTES': {
            s: 60000, // mseconds per minute
            max: 60
        },
        'SECONDS': {
            s: 1000,
            max: 60
        },
        'MICROSEC': {
            s: 10,
            max: 100
        }
    },


    r_count: 4,
    r_spacing: 3, // px
    r_size: 100, // px
    r_thickness: 4, // px
    update_interval: 100, // ms


    init: function(){

        $r = ringer;
        $r.cvs = document.createElement('canvas');

        $r.size = {
            w: ($r.r_size + $r.r_thickness) * $r.r_count + ($r.r_spacing*($r.r_count-1)),
            h: ($r.r_size + $r.r_thickness)
        };


        //added devicePixelRatio for retina screens
        $r.cvs.setAttribute('width',$r.size.w * window.devicePixelRatio);
        $r.cvs.setAttribute('height',$r.size.h * window.devicePixelRatio);


        $r.ctx = $r.cvs.getContext('2d');

        //*1 multiply for non-retinas
        $r.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        $('#canvastimer').append($r.cvs);
        $r.cvs = $($r.cvs);
        $r.ctx.textAlign = 'center';
        $r.actual_size = $r.r_size + $r.r_thickness;
        $r.countdown_to_time = new Date($r.countdown_to).getTime();
        $r.cvs.css({ width: $r.size.w+"px", height: $r.size.h+"px" });
        $r.go();



    },
    ctx: null,
    go: function(){
        var idx=0;

        $r.time = (new Date().getTime()) - $r.countdown_to_time;


        for(var r_key in $r.rings) $r.unit(idx++,r_key,$r.rings[r_key]);

        setTimeout($r.go,$r.update_interval);
    },
    unit: function(idx,label,ring) {
        var x,y, value, ring_secs = ring.s;
        value = parseFloat($r.time/ring_secs);
        $r.time-=Math.round(parseInt(value)) * ring_secs;
        value = Math.abs(value);

        x = ($r.r_size*.5 + $r.r_thickness*.5);
        x +=+(idx*($r.r_size+$r.r_spacing+$r.r_thickness));
        y = $r.r_size*.5;
        y += $r.r_thickness*.5;


        // calculate arc end angle
        var degrees = 270-(value / ring.max) * 360.0;
        var endAngle = degrees * (Math.PI / 180);

        $r.ctx.save();

        $r.ctx.translate(x,y);
        $r.ctx.clearRect($r.actual_size*-0.5,$r.actual_size*-0.5,$r.actual_size,$r.actual_size);

        // first circle
        $r.ctx.strokeStyle = "#efefef";
        $r.ctx.beginPath();
        $r.ctx.arc(0,0,$r.r_size/2,1.5*Math.PI,-0.5*Math.PI, 1);
        $r.ctx.lineWidth =$r.r_thickness;
        $r.ctx.stroke();

        // second circle
        $r.ctx.strokeStyle = "#cc0000";
        $r.ctx.beginPath();
        $r.ctx.arc(0,0,$r.r_size/2,1.5*Math.PI,endAngle, 1);
        $r.ctx.lineWidth =$r.r_thickness;
        $r.ctx.stroke();

        // label
        $r.ctx.fillStyle = "#aaa";

        $r.ctx.font = '400 16px sans-serif';
        $r.ctx.fillText(label, 0, 20);

        $r.ctx.font = '400 34px sans-serif';
        $r.ctx.fillStyle = "#fefefe";
        $r.ctx.fillText(Math.floor(value), 0, 5);

        $r.ctx.restore();
    }
}

ringer.init();



$(function() {
    $('body').on('keyup keydown cut paste change focus drop',".form-control", function() {
        if($(this).val().length != 0) {
            $(this).closest('.form-group').addClass('show-label');
        } else {
            $(this).closest('.form-group').removeClass('show-label');
        }
    });

    $('.form-control').each(function() {
        if($(this).val().length != 0) {
            $(this).closest('.form-group').addClass('show-label');
        }
    });



});