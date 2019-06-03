// 获取dom元素
var main = document.getElementById('main');
var go = document.getElementById('go');
// 设置初始变量
var speed = 5, num = 0, timer, flag = true;
// 设置存放颜色的数组
var colors = ['red', 'green', 'black', 'blue'];

// 创建每一行div元素
function cDiv() {
    var oDiv = document.createElement('div');
    // 获取一个随机数将每一行找到一个随机div 设置上颜色
    var index = Math.floor(Math.random() * 4);
    // 设置行class类名
    oDiv.setAttribute('class', 'row');
    // for循环生成一行四个div
    for (var j = 0; j < 4; j++) {
        var iDiv = document.createElement('div');
        // 将每一个小div插入每一行中
        oDiv.appendChild(iDiv);
    }
    // 根据父级中是否有子元素   插入新生成的行
    if (main.childNodes.length == 0) {
        // 如果父级为空  直接插入
        main.appendChild(oDiv);
    } else {
        // 如果父级有元素   将新生成的一行插入到已有行数的最前面
        main.insertBefore(oDiv, main.childNodes[0]);
    }
    // 根据随机数 设置一行中有颜色的div
    var clickDiv = main.childNodes[0].childNodes[index];
    // 将此元素设置class类名  作为需要点击的标记
    clickDiv.setAttribute('class', 'i');
    // 同时设置上背景颜色
    clickDiv.style.backgroundColor = colors[index];
}

// 移动
function move() {
    clearInterval(timer);
    // 设置定时器
    timer = setInterval(function () {
        // 利用top值移动main区域
        var step = parseInt(main.offsetTop) + speed;
        main.style.top = step + 'px';
        // 如果main区域移动到可视区域 创建一行新的元素
        if (parseInt(main.offsetTop) >= 0) {
            cDiv();
            // 同时将main区域移动到可视区域上方
            main.style.top = '-150px';
        }
        // 获得mian区域内的行数
        var len = main.childNodes.length;
        // 如果main区域内行数为6   即显示区域四行  上面新生成一行  下面一行
        if (len == 6) {
            // 遍历最后一行的每一个div
            for (var i = 0; i < 4; i++) {
                // 如果其中有一个包含没有被点击的   游戏结束
                if (main.childNodes[len - 1].children[i].classList.contains('i')) {
                    alert('游戏结束，得分：' + num);
                    clearInterval(timer);
                    // 游戏结束后不可以继续点击
                    flag = false;
                }
            }
            // 将展示过后的每一行移除
            main.removeChild(main.childNodes[len - 1]);
        }
    }, 20)
    // 点击事件
    bindEvent();
}

function bindEvent() {
    // 给main添加点击事件
    main.addEventListener('click', function (event) {
        // 根据flag值判断是否可以点击
        if (flag) {
            // 获得到点击的源事件
            var tar = event.target;
            // 判断点击的块是否为有颜色的
            if (tar.className == 'i') {
                // 改变背景颜色
                tar.style.backgroundColor = '#bbb';
                // 移除class类名
                tar.classList.remove('i');
                // 计数++
                num++;
            } else {
                // 如果点到了白色的块   游戏结束
                alert('游戏结束，得分：' + num);
                clearInterval(timer);
                flag = false;
            }
            // 如果当前分数为10的倍数   速度++
            if (num % 10 == 0) {
                speed++;
            }
        }
    })
}

// 开始按钮点击   开始移动 创建每一行元素
function clickStart() {
    go.addEventListener('click', function () {
        go.style.display = 'none';
        move();
    });
}
clickStart();