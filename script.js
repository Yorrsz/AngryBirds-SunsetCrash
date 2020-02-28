// - Initialisation --------------------------

// des modules de Matterjs qu'on importe
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Constraint = Matter.Constraint,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint;

let elastic, bird, anchor;

let engine = Engine.create();

let world = engine.world;

let render = Render.create({
    element: game,
    engine: engine,
    options: {
      width: 800,
      height: 500,
      wireframes: false
  	}
});

// 2 - Ajouter les boites --------------------
// .. votre code ici

// params: x, y, width, height, options
let square = Matter.Bodies.rectangle(200, 100, 50, 50);
let square2 = Matter.Bodies.rectangle(200, 100, 50, 50);
let square3 = Matter.Bodies.rectangle(200, 100, 50, 50);



// -------------------------------------------

// le sol
let ground = Bodies.rectangle(400, 490, 800, 20, { isStatic: true });

// le fond
let background = Bodies.rectangle(400, 250, 800, 500, {
    isStatic: true,
  	isSensor: true,
    render: {
        sprite: {
            texture: "img/backlg.png"
        }
    }
});

// 3 - L'oiseau ------------------------------

// une fonction faire apparaître un oiseau
function addBird() {
  // l'endroit d'où on tire l'oiseau
  anchor = { x: 200, y: 200 };
  
  // l'affichage de l'oiseau
  bird = Bodies.circle(200, 200, 25, {
      render: {
          sprite: {
              texture: 'img/birdsmall.png'
          }
      }
  });
  
  // l'effet "lance-pierre"
  elastic = Constraint.create({
    pointA: anchor, 
    bodyB: bird, 
    stiffness: 0.05,
    render: {
      visible: false
    }
  });
  
  World.add(world, [bird, elastic])
}

// -------------------------------------------

// interaction avec la souris
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false
    }
  }
});

// très similaire à addEventListener
Events.on(mouseConstraint, "enddrag", fly)

// la fonction qui fait voler l'oiseau
function fly(event) {
  if(event.body != bird)
    return
 
  setTimeout(function() {
    elastic.bodyB = null;
  }, 20)
}

// on ajoute tous les blocs au monde
World.add(engine.world, [background, ground]);

World.add(world, mouseConstraint);

render.mouse = mouse;

// lance la scène
Engine.run(engine);
Render.run(render);

addBird();

function getRandomArbitrary (min, max) {
  return Math.random() * (max - min) + min;
}

function addBlock() {
  let posX = getRandomArbitrary (400, 700)
  let boxA = Bodies.rectangle(posX, 0, 50, 50)
  World.add(engine.world, [boxA]);
}
