 function getRandom() {
            const p = Math.random()
            return Math.ceil(p * 4)
        }
		//获得1~4的随机数
        let ctx, zju, arr,mygrad
		
		let past
		let done = false
		let done2 = false
		var music=document.getElementById("voice")
		
        function initialize() {
            zju = new Image(80, 80)
            zju.src = "zju.png"
			mygrad = new Image(80, 80)
			mygrad.src="zju2.png"
            arr = new Array(7)
            for (let i = 1; i <= 6; i++) {
                arr[i] = getRandom()
            }

            ctx = document.getElementById("my_canvas").getContext("2d")
        }
		
		
	
		function drawtime(){
			if(done === true){
				var now=new Date()
				var nowtime=Number(now.getTime())
				past = 30000-nowtime+starttime
				document.f.lefttime.value = past/1000.0
				if(document.f.lefttime.value < 0&&done2===false){
					done2 = true
					alert("Time over\nYour score is "+document.f.score.value+"\n   Return to the start")
					location.reload();
				}
			}
			
		}
		
        function drawall() {
            
			ctx.clearRect(0, 0, 320, 480)
			
            // 竖线
            for (let i = 0; i <= 4; i++) {
                ctx.beginPath()
                ctx.moveTo(80 * i, 0)
                ctx.lineTo(80 * i, 480)
                ctx.stroke()
            }

            // 横线
            for (let i = 0; i <= 6; i++) {
                ctx.beginPath()
                ctx.moveTo(0, 80 * i)
                ctx.lineTo(320, 80 * i)
                ctx.stroke()
            }
			
            // 放图
            for (let i = 1; i <= 6; i++) {
                let x = (arr[i] - 1) * 80
                let y = 480 - i * 80
                ctx.drawImage(zju, x + 1, y + 1, 78, 78)
                arr[i - 1] = arr[i]
            }

            // 新放
            arr[6] = getRandom()
        }

        function checkEvent(e) {
            let keyCode
			if(e.keyCode === 32){
				done = true
				start =new Date();
				starttime=Number(start.getTime());
			}
			else if(done === true ){
				if (e.keyCode === 97 || e.keyCode === 65) { // a or A
                keyCode = 1
            } else if (e.keyCode === 115 || e.keyCode === 83) { // s or S
                keyCode = 2
            } else if (e.keyCode === 100 || e.keyCode === 68) { // d or D
                keyCode = 3
            } else if (e.keyCode === 102 || e.keyCode === 70) { // f or F
                keyCode = 4
            }

            if (arr[0] == keyCode) {
                music.play()
				document.f.score.value ++
				drawall()
            } else {
                alert("miss")
				location.reload();
				done = false
				drawall()
            }
			}
            
        }

        function addEvent() {
            document.addEventListener("keydown", checkEvent)
			let step = (timestamp, elapsed) => {
			if (elapsed > 20) {
				drawtime()
				elapsed = 0
			}

			window.requestAnimationFrame(
				_timestamp => step(_timestamp, elapsed + _timestamp - timestamp)
			)
			}
			window.requestAnimationFrame(timestamp => step(timestamp, 0))
		}

        onload = function () {
            initialize()
            drawall()
            addEvent()
        }// JavaScript Document