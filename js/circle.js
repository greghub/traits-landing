var ctx = $('#cv').get(0).getContext('2d');

var circles = [
    { x:  50, y:  50, r: 25 },
    { x: 250, y:  50, r: 25 },
    { x: 250, y: 250, r: 25 },
    { x:  50, y: 250, r: 25 },
];

var mainCircle = { x: 150, y: 150, r: 44 };

function drawCircle(data) {
    ctx.beginPath();
    ctx.arc(data.x, data.y, data.r, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(from, to) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

drawCircle(mainCircle);

$.each(circles, function() {
    drawCircle(this);
    drawLine(mainCircle, this);
});
var focused_circle, lastX, lastY ; 
 
function test_distance( n, test_circle ){  //see if the mouse is clicking circles
    if( focused_circle ) return false;
    var dx = lastX - test_circle.x,
    dy = lastY - test_circle.y;

    //see if the distance between the click is less than radius
    if( dx * dx + dy * dy < test_circle.r * test_circle.r  ){
        focused_circle = n;
        $(document).bind( 'mousemove.move_circle' , drag_circle );
        $(document).bind( 'mouseup.move_circle' , clear_bindings);
        return false; // in jquery each, this is like break; stops checking future circles
    }
}
$('#cv').mousedown( function( e ){
    lastX = e.pageX - $(this).offset().left;
    lastY = e.pageY - $(this).offset().top;
    $.each( circles, test_distance );
});

function drag_circle( e ){
    var    newX = e.pageX - $('#cv').offset().left,
        newY = e.pageY - $('#cv').offset().top;
    
    //set new values
    circles[ focused_circle ].x += newX - lastX;
    circles[ focused_circle ].y += newY - lastY;

    //remember these for next time
    lastX = newX, lastY = newY;

    //clear canvas and redraw everything
    ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
    drawCircle(mainCircle);
    $.each(circles, function() {
        drawCircle(this);
        drawLine(mainCircle, this);
    });

}

function clear_bindings( e ){ // mouse up event, clear the moving and mouseup bindings
    $(document).unbind( 'mousemove.move_circle mouseup.move_circle' );
    focused_circle=undefined;
}