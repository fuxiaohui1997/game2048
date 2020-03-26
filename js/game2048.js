function Game2048(){
			this.element = []
			this.arr = []
			this.statusArr = []
			this.nullArr = []
			this.success = false
			this.over = false
		}
		Game2048.prototype.initarr = function(){
			var self = this
			for(var i=0; i<=3; i++){
				self.arr[i] = []
				for(var j=0; j<=3; j++){
					self.arr[i][j] = 0
				}
			}
		}
		Game2048.prototype.initstatus = function(){
			var self = this
			for(var i=0; i<=3; i++){
				self.statusArr[i] = []
				for(var j=0; j<=3; j++){
					self.statusArr[i][j] = false
				}
			}
		}
		Game2048.prototype.getNullArr = function(){
			var self = this
			self.nullArr.length = 0
			for(var i=0;i<=self.arr.length-1;i++){
				for(var j=0;j<=self.arr[i].length-1;j++){
					if(self.arr[i][j]===0){
						var item={}
						item.x=i
						item.y=j							
						self.nullArr.push(item)
					}
				}
			}
		}
		Game2048.prototype.fillArr = function(){
			var self = this
			var num = 2*(Math.round(Math.random()*1)+1)
			var index = Math.floor(Math.random()*self.nullArr.length)
			self.arr[self.nullArr[index].x][self.nullArr[index].y] = num
		}
		Game2048.prototype.mergeUp = function(){
			var self = this
			for(var j=0;j<=3;j++){
				for(var i=1;i<=3;i++){
					upi(i,j)
				}
			}
			function upi(i,j){
				if(self.arr[i][j]!=0){
					if(i>=1){
						if(self.arr[i-1][j]==0){
							self.arr[i-1][j]=self.arr[i][j]
							self.arr[i][j]=0
							upi(i-1,j)
						}else if(self.arr[i-1][j]==self.arr[i][j]){
							if(self.statusArr[i-1][j]===false&&self.statusArr[i][j]===false){
								self.arr[i-1][j]=2*self.arr[i][j]
								if(self.arr[i-1][j]==2048){
									self.success=true
								}
								self.arr[i][j]=0
								self.statusArr[i-1][j]=true
								upi(i-1,j)
							}
						}
					}
				}
			}
		}
		Game2048.prototype.mergeDown = function(){
			var self = this
			for(var j=0;j<=3;j++){
				for(var i=2;i>=0;i--){
					downi(i,j)
				}
			}
			function downi(i,j){
				if(self.arr[i][j]!=0){
					if(i<=2){
						if(self.arr[i+1][j]==0){
							self.arr[i+1][j]=self.arr[i][j]
							self.arr[i][j]=0
							downi(i+1,j)
						}else if(self.arr[i+1][j]==self.arr[i][j]){
							if(self.statusArr[i+1][j]===false&&self.statusArr[i][j]===false){
								self.arr[i+1][j]=2*self.arr[i][j]
								if(self.arr[i+1][j]==2048){
									self.success=true
								}
								self.arr[i][j]=0
								self.statusArr[i+1][j]=true
								downi(i+1,j)
							}
						}
					}
				}
			}
		}
		Game2048.prototype.mergeLeft = function(){
			var self = this
			for(var i=0;i<=3;i++){
				for(var j=1;j<=3;j++){
					lefti(i,j)
				}
			}
			function lefti(i,j){
				if(self.arr[i][j]!=0){
					if(j>=1){
						if(self.arr[i][j-1]==0){
							self.arr[i][j-1]=self.arr[i][j]
							self.arr[i][j]=0
							lefti(i,j-1)
						}else if(self.arr[i][j-1]==self.arr[i][j]){
							if(self.statusArr[i][j-1]===false&&self.statusArr[i][j]===false){
								self.arr[i][j-1]=2*self.arr[i][j]
								if(self.arr[i][j-1]==2048){
									self.success=true
								}
								self.arr[i][j]=0
								self.statusArr[i][j-1]=true
								lefti(i,j-1)
							}
						}
					}
				}
			}
		}
		Game2048.prototype.mergeRight = function(){
			var self = this
			for(var i=0;i<=3;i++){
				for(var j=2;j>=0;j--){
					righti(i,j)
				}
			}
			function righti(i,j){
				if(self.arr[i][j]!=0){
					if(j<=2){
						if(self.arr[i][j+1]==0){
							self.arr[i][j+1]=self.arr[i][j]
							self.arr[i][j]=0
							righti(i,j+1)
						}else if(self.arr[i][j+1]==self.arr[i][j]){
							if(self.statusArr[i][j+1]===false&&self.statusArr[i][j]===false){
								self.arr[i][j+1]=2*self.arr[i][j]
								if(self.arr[i][j+1]==2048){
									self.success=true
								}
								self.arr[i][j]=0
								self.statusArr[i][j+1]=true
								righti(i,j+1)
							}
						}
					}
				}
			}
		}
		Game2048.prototype.isOver = function(){
			var self = this
			self.over = true
			for(var i=0; i<=3; i++){
				for(var j=1; j<=3; j++){
					if(self.arr[i][j] == self.arr[i][j-1]||self.arr[i][j]==0||self.arr[i][j-1]==0){
						self.over = false
						return false
					}
				}
			}
			for(var j=0; j<=3; j++){
				for(var i=1; i<=3; i++){
					if(self.arr[i][j] == self.arr[i-1][j]||self.arr[i][j] == 0|| self.arr[i-1][j]==0){
						self.over = false
						return false
					}
				}
			}
		}
		Game2048.prototype.draw = function(){
			var self = this
			for(var i=0; i<=3; i++){
				for(var j=0; j<=3; j++){
					self.arr[i][j]===0?self.element[i][j].innerHTML="":self.element[i][j].innerHTML = self.arr[i][j]
					var classname = "";
					switch(self.arr[i][j]) {
						case 0:
							classname="";
						break;
						case 2:
							classname="num2";
						break;
						case 4:
							classname="num4";
						break;
						case 8:
							classname="num8";
						break;
						case 16:
							classname="num16";
						break;
						case 32:
							classname="num32";
						break;
						case 64:
							classname="num64";
						break;
						case 128:
							classname="num128";
						break;
						case 256:
							classname="num256";
						break;
						case 512:
							classname="num512";
						break;
						case 1024:
							classname="num1024";
						break;
						case 2048:
							classname="num2048";
						break;
					}
					this.element[i][j].className=classname;
				}
			}
		}
		Game2048.prototype.initHtml = function(){
			var container = document.getElementById("game2048");
			var ul = [];
			for(var i=0;i<4;i++){
				ul[i] = document.createElement("ul");
				container.appendChild(ul[i]);
				this.element[i]=[];
				for(var j=0;j<4;j++){
					this.element[i][j] = document.createElement("li");
					ul[i].appendChild(this.element[i][j]);
				}
			}
		}
		Game2048.prototype.move = function(str){
			var self = this;
			self.initstatus();
			var currentnullArr = JSON.parse(JSON.stringify(self.arr));
			switch(str){
				case "mergeUp":
					self.mergeUp();
					break;
				case "mergeDown":
					self.mergeDown();
					break;
				case "mergeLeft":
					self.mergeLeft();
					break;
				case "mergeRight":
					self.mergeRight();
					break;
			}
			if(JSON.stringify(currentnullArr)===JSON.stringify(self.arr)){
				self.isOver();
				if(self.over){
					self.over=false;
					alert("你輸了");
					self.initarr();
					self.getNullArr();
					self.fillArr();
					self.getNullArr();
					self.fillArr();
					self.draw();
				}else{
					return
				}
			}
			self.getNullArr();
			self.fillArr();
			self.draw();
			if(self.success){
				alert("恭喜你赢了");
			}
		}
		Game2048.prototype.init = function(){
			var self = this
			self.initarr();
			self.getNullArr();
			self.fillArr();
			self.getNullArr();
			self.fillArr();
			self.initHtml();
			self.draw();
			document.addEventListener("keydown",function(event){
				var event = event||window.event;
				switch(event.keyCode){
					case 38:
						self.move("mergeUp");
						break;
					case 37:
						self.move("mergeLeft");
						break;
					case 40:
						self.move("mergeDown");
						break;
					case 39:
						self.move("mergeRight");
						break;
				}
			})
			
			var startX, startY, moveEndX, moveEndY, X, Y;
			document.addEventListener('touchstart', function(e) {
				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
			});
			document.addEventListener('touchend', function(e) {
				moveEndX = e.changedTouches[0].clientX;
				moveEndY = e.changedTouches[0].clientY;
				X = moveEndX - startX;
				Y = moveEndY - startY;
				if(Math.abs(X)>Math.abs(Y)){
					if(X>0){
						self.move("mergeRight");
					}else{
						self.move("mergeLeft");
					}
				}else{
					if(Y>0){
						self.move("mergeDown");
					}else{
						self.move("mergeUp");
					}
				}
			});
			
		}