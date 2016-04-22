
var mobile = function(mobile) {

    mobile.shuffle = function(array) {
        if (array == null) return;
        var i = array.length, j, temp;
        if (i == 0) return array;
        while(--i) {
            j = Math.floor(Math.random()*(i+1));
            temp=array[i];
            array[i]=array[j];
            array[j]=temp;
        }
        return array;
    }

        mobile.swipe1 = function(obj) {
        console.log(obj);
        var distance = 10;
        var time = 100; // ms
        var mouseX, mouseY;
        var startX, startY;
        obj.addEventListener("mousedown", function(ev) {
            // console.log(e.nativeEvent.clientX);
            startX = ev.stageX;
            startY = ev.stageY;

            var moveEvent = document.addEventListener("mousemove", getMouse);
            function getMouse(e) {
                mouseX = e.clientX;
                mouseY = e.clientY;
            };
            var swipeTimeout = setTimeout(function() {
                var diffX = mouseX - startX;
                var diffY = mouseY - startY;
                document.removeEventListener("mousemove", getMouse);
                // console.log(diffX, diffY);
                var swipeX = 0;
                var swipeY = 0;
                if (Math.abs(diffX) > Math.abs(diffY)) { // swiping in x
                    if (diffX <-distance) {
                        swipeX = -1
                    }
                    if (diffX > distance) {
                        swipeX = 1;
                    }
                } else {
                    if (diffY <-distance) {
                        swipeY = -1
                    }
                    if (diffY > distance) {
                        swipeY = 1;
                    }
                }
                var e = new Event("swipe");
                e.swipeX = swipeX;
                e.swipeY = swipeY;
                obj.dispatchEvent(e);
                // if (Math.abs(diffX))

            }, time);

        })
    }

         mobile.swipe = function (obj) {

        if (obj == null) return;
        if (obj.getStage == null) return;
        var stage = obj.getStage();

        var swipeDistance = 5;
        var swipeTime = 100;

        obj.on("mousedown", function(){
            var startX = stage.mouseX;
            var startY = stage.mouseY;
            var swipeTimeout = setTimeout(function() {
                var newX = stage.mouseX;
                var newY = stage.mouseY;
                // console.log(newX - startX);
                // console.log(newY - startY);
                var diffX = Math.abs(newX-startX);
                var diffY = Math.abs(newY-startY);
                if (diffX < swipeDistance && diffY < swipeDistance) return;
                var e = new createjs.Event("swipe");
                if (diffX > diffY) {
                    // console.log("swiping in X");
                    e.swipeX = (newX-startX>1) ? 1 : -1;
                    e.swipeY = 0;
                } else {
                    // console.log("swiping in Y");
                    e.swipeX = 0
                    e.swipeY = (newY-startY>1) ? 1 : -1;
                }
                obj.dispatchEvent(e);
                // obj.dispatchEvent("swipe");
            }, swipeTime);
            var up = obj.on("pressup", function() {
                clearTimeout(swipeTimeout);
                obj.off("pressup", up);
            });
        });

    }
    return mobile;
}(mobile || {})
