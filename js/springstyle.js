/**
 * Created by huyiqing on 2016/12/8.
 */
$(document).ready(function (){
    // 调用定位方法
    imgLocation();

    // 模拟资源库
    var dataImg = {"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},
        {"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},
        {"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"}, {"src":"16.jpg"},{"src":"17.jpg"},
        {"src":"18.jpg"},{"src":"19.jpg"},{"src":"20.jpg"}]};

    // 监听滚动事件
    window.onscroll = function () {
        if (scrollLimit()){
            $.each(dataImg.data,function (index, value) {
                var box = $("<div>").addClass("box").appendTo($(".container"));
                var content = $("<div>").addClass("content").appendTo(box);
                $("<img>").attr("src","./images/"+$(value).attr("src")).appendTo(content);
            });
            // 新生成的box引用用预览方法
            preview();
            // 为新生成的box布局
            imgLocation();
        }
    };

    // 监听页面变化
    $(window).resize(function () {
        imgLocation();
    });

    // 为已有的盒子添加预览
    preview();

    // 添加关闭预览按钮并监听点击事件
    $(".close").on('click',function () {
        $(".preview").hide(200);
    });
});

// 实现预览效果
function preview() {
    $(".box").on('click',function () {
        // 获取被点击图片src
        var loc = $(this).find("img").attr('src');
        // alert($(this).find(".img").height());
        // 获取图片自动匹配的高度
        var height = $(this).find("img").height();
        // 利用高度换算对应图片在preview内的显示宽度
        var width = (320/height)*183;
        // 利用显示宽度计算让图片居中所需左间距
        var marginLeft = (600 - width)/2;
        // alert(Math.floor(marginLeft));
        // 添加对应图片
        $(".preImg").attr('src',loc);
        // 设置自适应左边距
        $(".preImg").css("margin-left",marginLeft);
        // 展现
        $(".preview").show(200);
    });
}
// 判断滚动高度并返回是否加载
function scrollLimit() {
    var box = $(".box");
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height()/2);
    var documentHeight = $(document).width();
    var scrollHeight = $(window).scrollTop();
    return (lastBoxHeight <scrollHeight+documentHeight)?true:false;
}

// 图片定位
function imgLocation() {
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var num = Math.floor($(window).width()/boxWidth);
    // 申明数组用于记录图片高度
    var boxArr = [];
    // 遍历所有box对象
    box.each(function (index, value) {
        value.style.cssText = '';
        var boxHeight = box.eq(index).height();
        if (index < num){
            boxArr[index] = boxHeight;
        }else{
            var minBoxHeight = Math.min.apply(null,boxArr);
            var minBoxIndex = $.inArray(minBoxHeight,boxArr);
            $(value).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left":box.eq(minBoxIndex).position().left
            });
            boxArr[minBoxIndex] += box.eq(index).height();
        }
    });
}