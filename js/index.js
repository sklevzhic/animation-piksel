let canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

let fps = 1;
    
let frames = [];

var x = "black",
    y = 20;

    let countID = 0;


    
function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);

    $('.frames').sortable();
}

$('#frames__create').click(createFrame);

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function createFrame() {
    const dataURL = canvas.toDataURL();

    frames.push(dataURL);

    $('<li>', {
        'data-id': `${countID}`,
        class: 'frames__item',
            append: $('')
                .add($('<a>',{

                    class: 'frames__button frames__button--delete',
                    append: $('<svg xmlns="http://www.w3.org/2000/svg" class="icon" height="25" viewBox="0 0 1024 1024" version="1.1"><path d="M788.425192 383.761314c-29.356608 7.525394-32.942273 25.483394-26.748201 37.798884 7.243985 14.398942 16.624632 13.800307 30.139437 10.81123 62.715367-14.349823 97.275487-52.065819 97.275487-106.198717 0-54.162574-34.559097-91.87857-97.275487-106.228393l-164.269297-0.192382 0-52.05661c0-34.602076-26.912953-61.696154-61.300135-61.696154l-108.495016 0c-34.388205 0-61.299111 27.094078-61.299111 61.696154l0 51.78441-158.63395-0.186242-5.636371 0.650823c-62.742996 14.349823-97.274464 52.080146-97.274464 106.228393 0 48.227398 27.41949 83.436294 77.784574 100.70254l-0.226151 382.503671c0 108.623953 92.37692 108.623953 136.764873 108.623953l327.265602 0c45.689598 0 85.151355-0.171915 111.069655-26.828019 17.564028-18.030655 25.100678-44.233434 23.73968-81.569784L811.306318 506.629689c0-13.764492-7.303336-24.941042-21.183462-24.941042-13.882172 0-21.213137 11.17655-21.213137 24.941042l0.027629 303.856449c-0.798179 39.344077-3.300162 41.317011-17.543561 53.925167-12.098549 10.709923-41.501206 11.982916-76.626191 11.576663l-333.419765 0c-73.424266 0-86.4837-23.267936-86.4837-66.594721l0.226151-421.154969-19.487843-4.461615c-52.264341-11.955286-58.295708-38.609343-58.295708-57.602929 0-18.681478 5.832845-52.613288 55.603389-64.877613l550.296211 0.014326c50.560536 1.813299 63.487963 46.181809 63.487963 64.863287C846.69327 345.165274 840.332399 370.45424 788.425192 383.761314zM585.147462 219.700771l-145.313573-0.170892 0-51.835575c0-7.2798 11.118222-19.694551 17.917068-19.694551l108.495016 0c6.798846 0 18.901489 12.414751 18.901489 19.694551L585.147462 219.700771zM488.771461 372.231723l0 422.064688c0 13.767562 11.246135 24.941042 25.12626 24.941042s25.154913-11.17348 25.154913-24.941042L539.052634 372.231723c0-13.766538-11.275811-24.941042-25.154913-24.941042S488.771461 358.465185 488.771461 372.231723zM350.872764 372.231723l0 422.064688c0 13.767562 11.246135 24.941042 25.128307 24.941042 13.879102 0 25.128307-11.17348 25.128307-24.941042L401.129378 372.231723c0-13.766538-11.249205-24.941042-25.128307-24.941042C362.118899 347.290681 350.872764 358.465185 350.872764 372.231723zM626.669134 372.231723l0 422.064688c0 13.767562 11.244089 24.941042 25.127284 24.941042 13.879102 0 25.15389-11.17348 25.15389-24.941042L676.950308 372.231723c0-13.766538-11.274788-24.941042-25.15389-24.941042C637.913223 347.290681 626.669134 358.465185 626.669134 372.231723z"/></svg>'),
                }))
                .add($('<a>',{

                    class: 'frames__button frames__button--duplicate',
                  append: $('<svg xmlns="http://www.w3.org/2000/svg" height="25" viewBox="-66 0 569 569.286" width="25"><path d="m.109375 66.382812v493.132813c0 5.238281 4.246094 9.484375 9.484375 9.484375h360.367188c5.234374 0 9.480468-4.246094 9.480468-9.484375v-398.296875c0-.210938-.101562-.390625-.121094-.597656-.046874-.832032-.210937-1.652344-.484374-2.4375-.105469-.304688-.179688-.597656-.3125-.894532-.460938-1.03125-1.101563-1.972656-1.898438-2.777343l-94.832031-94.832031c-.804688-.800782-1.75-1.441407-2.789063-1.898438-.285156-.121094-.574218-.222656-.871094-.3125-.792968-.273438-1.617187-.4375-2.457031-.492188-.160156.027344-.347656-.074218-.546875-.074218h-265.535156c-5.238281 0-9.484375 4.242187-9.484375 9.480468zm346.957031 85.351563h-62.457031v-62.457031zm-327.992187-75.867187h246.570312v85.351562c0 5.234375 4.246094 9.480469 9.480469 9.480469h85.351562v379.335937h-341.402343zm0 0"/><path d="m398.410156 493.132812v18.964844h28.449219c5.238281 0 9.484375-4.242187 9.484375-9.480468v-493.132813c0-5.238281-4.246094-9.484375-9.484375-9.484375h-360.367187c-5.238282 0-9.484376 4.246094-9.484376 9.484375v28.449219h18.96875v-18.96875h341.398438v474.167968zm0 0"/><path d="m75.976562 189.667969h227.597657v18.964843h-227.597657zm0 0"/><path d="m75.976562 132.765625h75.867188v18.96875h-75.867188zm0 0"/><path d="m75.976562 246.566406h151.734376v18.96875h-151.734376zm0 0"/><path d="m246.675781 246.566406h56.898438v18.96875h-56.898438zm0 0"/><path d="m75.976562 303.464844h227.597657v18.96875h-227.597657zm0 0"/><path d="m75.976562 417.265625h227.597657v18.96875h-227.597657zm0 0"/><path d="m161.324219 360.367188h142.25v18.964843h-142.25zm0 0"/><path d="m75.976562 360.367188h66.382813v18.964843h-66.382813zm0 0"/><path d="m75.976562 474.167969h37.933594v18.964843h-37.933594zm0 0"/><path d="m132.875 474.167969h170.699219v18.964843h-170.699219zm0 0"/></svg>'),

                }))
               .add($('<input>',{

                    value: countID + 1,
                    class: 'frames__button frames__button--current-frame',

                }))
                .add($('<img>',{
                    src: dataURL,
                    class: 'canvasimg'
                }))
    }).appendTo('.frames');
    ctx.clearRect(0, 0, w, h);
    countID++;
}



function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 20, 20);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

function previewGif() {
    let count = 0;

    let tempInterval = setInterval(() => {
        if (count + 1 < frames.length) {
            count += 1;
          } else {
            count = 0;
          }
            $('.preview__gif').html(`<img class = "preview__gif--item" src = "${frames[count]}">`)
      }, 1000 / fps);
      $('.2fps').click(function() {
        clearInterval(tempInterval);
        fps = 2;
        previewGif()
      })
      
      $('.4fps').click(function() {
        clearInterval(tempInterval);
        fps = 4;
        previewGif()
      })
      
      $('.8fps').click(function() {
        clearInterval(tempInterval);
        fps = 8;
        previewGif()
      })
}    
previewGif()




$('.frames').on('click', '.frames__button--delete', deleteFrames);
$('.frames').on('click', '.frames__button--duplicate', duplicateFrames);

function rebuild() {
    $('.frames li').each(function(index) {
        $(this).attr('data-id', index);
    });
    $('.frames__button--current-frame').each(function() {
        $(this).val( parseInt( $(this).closest('li').attr('data-id') )+1 );
    });
}

function deleteFrames() {
    let dataId = $(this).closest('li').attr("data-id");
    $(this).closest('.frames__item').remove(); 
    frames.splice(dataId, 1);
    rebuild();
}

function duplicateFrames() {
    let dataId = $(this).closest('li').attr("data-id");
    $(this).closest('.frames__item').clone().appendTo(".frames").closest('li').attr('data-id', frames.length); 
    frames.push(frames[dataId]);
    rebuild();
}


function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
      !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  
  
  $('.preview__gif').click(function() {
    toggleFullscreen(this);
  });