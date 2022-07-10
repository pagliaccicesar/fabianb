var items = []
  , point = document.querySelector('svg').createSVGPoint();

function getCoordinates(e, svg) {
  point.x = e.clientX;
  point.y = e.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function changeColor(e) {
  document.body.className = e.currentTarget.className;
}

function Item(config) {
  Object.keys(config).forEach(function (item) {
    this[item] = config[item];
  }, this);
  this.el.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
  this.el.addEventListener('touchmove', this.touchMoveHandler.bind(this));
}

Item.prototype = {
  update: function update(c) {
    this.clip.setAttribute('cx', c.x);
    this.clip.setAttribute('cy', c.y);
  },
  mouseMoveHandler: function mouseMoveHandler(e) {
    this.update(getCoordinates(e, this.svg));
  },
  touchMoveHandler: function touchMoveHandler(e) {
    e.preventDefault();
    var touch = e.targetTouches[0];
    if (touch) return this.update(getCoordinates(touch, this.svg));
  }
};

[].slice.call(document.querySelectorAll('.item'), 0).forEach(function (item, index) {
  items.push(new Item({
    el: item,
    svg: item.querySelector('svg'),
    clip: document.querySelector('#clip-'+index+' circle'),
  }));
});

[].slice.call(document.querySelectorAll('button'), 0).forEach(function (button) {
  button.addEventListener('click', changeColor);
});

/* JS DE SECCION FOTOS*/

//Creates an event that fires every time the mouse moves over any div with the class of "img".
$(".img").mousemove(function(event){
  
  //Both the x and y value are calculated by taking the mouse x,y position on the page and subtracting it from the x,y position of the image on the page. "this" is the hovered element with the class of "img"
  var mousex = event.pageX - $(this).offset().left;
  var mousey = event.pageY - $(this).offset().top;
  
  
  //If you just used the mouse position values the translation effect will only go up and to the right, by subtracting half of the length / width of the imagevfrom the values  we get either a positive or negitive number so that the image will move in any direction.
  
  //The 40 controls the amount of "movement" that will happen by giving us a smaller number, feel free to change it to get the effect that you want.
  var imgx = (mousex - 300) / 40;
  var imgy = (mousey - 200) / 40;
  
  //Adds a translation css styles to the image element
  $(this).css("transform", "translate(" + imgx + "px," + imgy + "px)");
});

//This function will fire every time the user mouses off of the image. It resets the translation back to 0.
$(".img").mouseout(function(){
  $(this).css("transform", "translate(0px,0px)");
});

