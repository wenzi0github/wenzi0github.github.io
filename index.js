// variables
var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height(), garden_timer;

$(function () {
    // setup garden
	$loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2 - 55;
    $garden = $("#garden");
    gardenCanvas = $garden[0];
	// gardenCanvas.width = '400';
 //    gardenCanvas.height = '650';
    gardenCtx = gardenCanvas.getContext("2d");
    gardenCtx.globalCompositeOperation = "lighter";
    garden = new Garden(gardenCtx, gardenCanvas);
	
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));

    // renderLoop
    garden_timer = setInterval(function () {
        garden.render();
    }, Garden.options.growSpeed);
});

function getHeartPoint(angle) {
	var t = angle / Math.PI;
	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
	return new Array(offsetX + x, offsetY + y);
}

function startHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			clearInterval(garden_timer);
			$('.heart').show();
			auto();
		} else {
			angle += 0.2;
		}
	}, interval);
}

function getDaysInMonth(month) {
	var data = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return data[month];
}

function timeElapse(date, mode) {
	var current = new Date();
	var years = NaN;
	var months = NaN;
	var days = NaN;
	var hours = NaN;
	var minutes = NaN;
	var seconds = NaN;
	seconds = current.getSeconds() - date.getSeconds();
	if (seconds < 0) {
		seconds += 60;
		current.setMinutes(current.getMinutes() - 1);
	}
	minutes = current.getMinutes() - date.getMinutes();
	if (minutes < 0) {
		minutes += 60;
		current.setHours(current.getHours() - 1);
	}
	hours = current.getHours() - date.getHours();
	if (hours < 0) {
		hours += 24;
		current.setDate(current.getDate() - 1);
	}
	if (mode == 1) {
		days = current.getDate() - date.getDate();
		if (days < 0) {
			days += getDaysInMonth(current.getMonth());
			current.setDate(current.getDate() - 1);
		}
		months = current.getMonth() - date.getMonth();
		if (months < 0) {
			months += 12;
			current.setYear(current.getFullYear() - 1);
		}
		years = current.getFullYear() - date.getFullYear();
	} else {
		days = Math.floor((current.getTime() - date.getTime()) / (1000 * 3600 * 24));
	}

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = (years > 0 ? "<span class=\"digit\">" + years + "</span> year ":"")
	result += (months >= 0 ? "<span class=\"digit\">" + months + "</span> month ":"");
	result += "<span class=\"digit\">" + days + "</span> day ";
	result += "<span class=\"digit\">" + hours + "</span> hr "
	result += "<span class=\"digit\">" + minutes + "</span> min "
	result += "<span class=\"digit\">" + seconds + "</span> sec";
	// console.log( result );
	$("#elapseClock").html(result);
}


var offsetX = $("#garden").width() / 2;
var offsetY = $("#garden").height() / 2 - 55;
var displayMode = 1;
var together = new Date();
together.setFullYear(2016, 3, 26);
together.setHours(20);
together.setMinutes(0);
together.setSeconds(0);
together.setMilliseconds(0);

timeElapse(together, displayMode);
setInterval(function () {
	timeElapse(together, displayMode);
}, 500);

startHeartAnimation();

var data = [
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3l3widtxj20qo0zkdi5.jpg',
		info:'植物园-你好，遇见了你',
		date:'2016年3月26日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3maegenij20qo0zkdja.jpg',
		info:'玲珑居-第一次做饭',
		date:'2016年4月8日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3maeua36j20qo0zkmzp.jpg',
		info:'公司-好看的帽子',
		date:'2016年4月17日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3mafqee1j20zk0qo0xz.jpg',
		info:'故宫-那天好累',
		date:'2016年5月2日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3mag6hauj20qo0zkac1.jpg',
		info:'邢台东站-回家了',
		date:'2016年5月15日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3magzrlej20qo0zk771.jpg',
		info:'电影院-未来战士',
		date:'2016年6月4日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3mahpttej20qo0zk0x9.jpg',
		info:'通州大运河-下大雨了',
		date:'2016年6月10日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3mai2qg5j20qo0zkdj0.jpg',
		info:'通州大运河-好2',
		date:'2016年6月10日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3maj0rdej20qo0zkjua.jpg',
		info:'理工大学-去游泳喽',
		date:'2016年7月2日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3majb53lj20qo0zk78j.jpg',
		info:'你好，遇见了你',
		date:'2016年3月26日'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3meckqc2j20qo0zkdib.jpg'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3medcr25j20qo0zktba.jpg'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3mee9wozj20qo0zkdik.jpg'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3mef2ml2j20zk0qogng.jpg'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3mefm4uwj20qo0zkdib.jpg'
	},
	{
		img:'http://ww4.sinaimg.cn/large/70f933e9jw1fa3megiklxj20qo0zkq6q.jpg'
	}
];

function auto(){
	var len = data.length,
		$img = $('.heart img'),
		$desc = $('.heart .desc');

	var current = 0;
	$img.css('opacity', 0).attr('src', data[current].img).animate({'opacity':1},400);
	setInterval(function(){
		current = (current+1)%len;
		$img.css('opacity', 0).attr('src', data[current].img).animate({'opacity':1},400);
		// if( data[current].date ){
		// 	$desc.html( data[current].date+data[current].info ).show();
		// }else{
		// 	$desc.hide();
		// }
	}, 5000)
}

$("#typed").typed({
    strings: ["今天，10月26^1200\n是你29岁的生日^1200\n我们在2016年3月26日相识，^1200\n已经认识7个月29天，一共244天^1200\n\与你一见如故，是我今生最美丽的相遇。^1200\n\与你一诺相许，是我素色年华里最永恒的风景。^1200\n\一直想说，无论走到哪里，最想去的是你的身边。^1200\n\愿我们彼此相爱，一直到时间的尽头。^1200\n\我相信我们可以一起，等青丝变白发。^1200\n\你在，我在，就是海枯石烂。^1200\n\没有过多的华丽，只有一句我喜欢你，却能让彼此牵挂于心。"],
    // stringsElement: $('#typed-strings'),
    typeSpeed: 30,
    backDelay: 500,
    loop: false,
    contentType: 'html', // or text
    // defaults to false for infinite loop
    loopCount: false,
    callback: function(){  },
    resetCallback: function() { }
});
