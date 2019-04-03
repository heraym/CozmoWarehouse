var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},
    irASector: function irAunSector(imagen1, imagen2, imagen3, desde, hasta, size, options) {
   	 	options.onClick = function() {
			  //AR.context.openInBrowser("assets/warehouse/warehouse.png");
       	 	   imagen1.enabled = false;
			   imagen2.enabled = true;
			   imagen3.enabled = false;
			   //alert("ir a Sector " + hasta + " desde " + desde);
                 };
				if (hasta == "A") {
    	        return new AR.ImageDrawable(this.imgIrASectorA, size, options); }
				if (hasta == "B") {
    	        return new AR.ImageDrawable(this.imgIrASectorB, size, options); }
				if (hasta == "C") {
    	        return new AR.ImageDrawable(this.imgIrASectorC, size, options); }
	 },     
	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ImageTracker needs to be created in order to start the recognition engine. It is initialized with a AR.TargetCollectionResource specific to the target collection that should be used. Optional parameters are passed as object in the last argument. In this case a callback function for the onTargetsLoaded trigger is set. Once the tracker loaded all its target images, the function worldLoaded() is called.

			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
		*/
        this.targetCollectionResource = new AR.TargetCollectionResource("assets/warehouse.wtc", {
        });

        this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
            onTargetsLoaded: this.worldLoaded
        });

         	/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.ImageTrackable) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/
       this.imgIrASectorA = new AR.ImageResource("assets/warehouse/irASectorA.png");
       this.imgIrASectorB = new AR.ImageResource("assets/warehouse/irASectorB.png");
	   this.imgIrASectorC = new AR.ImageResource("assets/warehouse/irASectorC.png");  
       
	   this.mapaA = new AR.ImageResource("assets/warehouse/warehouseA.png");
	   this.mapaB = new AR.ImageResource("assets/warehouse/warehouseB.png");
	   this.mapaC = new AR.ImageResource("assets/warehouse/warehouseC.png");

	   var estoySectorA = new AR.ImageDrawable(this.mapaA, 3, {
			offsetX : 1,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	   
	   var estoySectorB = new AR.ImageDrawable(this.mapaB, 3, {
			offsetX : 1,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	   
	   var estoySectorC = new AR.ImageDrawable(this.mapaC, 3, {
			offsetX : 1,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	   
	   this.mapaAToB = new AR.ImageResource("assets/warehouse/warehouseAToB.png");
	   this.mapaBToA = new AR.ImageResource("assets/warehouse/warehouseBToA.png");
	   this.mapaAToC = new AR.ImageResource("assets/warehouse/warehouseAToC.png");
	   this.mapaCToA = new AR.ImageResource("assets/warehouse/warehouseCToA.png");
	   this.mapaBToC = new AR.ImageResource("assets/warehouse/warehouseBToC.png");
	   this.mapaCToB = new AR.ImageResource("assets/warehouse/warehouseCToB.png");

	   var voyDeAToB = new AR.ImageDrawable(this.mapaAToB, 3, {
			offsetX : 1,
			enabled : false,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	   var voyDeBToA = new AR.ImageDrawable(this.mapaBToA, 3, {
			offsetX : 1,
			enabled : false,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	   var voyDeAToC = new AR.ImageDrawable(this.mapaAToC, 3, {
			offsetX : 1,
			enabled : false,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	   var voyDeCToA = new AR.ImageDrawable(this.mapaCToA, 3, {
			offsetX : 1,
			enabled : false,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	   var voyDeBToC = new AR.ImageDrawable(this.mapaBToC, 3, {
			offsetX : 1,
			enabled : false,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	   var voyDeCToB = new AR.ImageDrawable(this.mapaCToB, 3, {
			offsetX : 1,
			enabled : false,
			onClick : function() {
			// 'this' represents the ImageDrawable
			//this.rotation += 10;
			}
	   });
	    
	 
		var irDeASectorB = this.irASector(estoySectorA, voyDeAToB, voyDeAToC, "A","B", 0.2, {
    		   offsetX: -0.3,
    		   offsetY: -0.3
		});

		var irDeBSectorA = this.irASector(estoySectorB, voyDeBToA, voyDeBToC, "B","A", 0.2, {
    		   offsetX: -0.3,
    		   offsetY: -0.3
		});

		var irDeASectorC = this.irASector(estoySectorA, voyDeAToC, voyDeAToB, "A","C", 0.2, {
    		   offsetX: -0.3,
    		   offsetY: -0.6
		});

		var irDeCSectorA = this.irASector(estoySectorC, voyDeCToA, voyDeCToB, "C","A", 0.2, {
    		   offsetX: -0.3,
    		   offsetY: -0.3
		});
       
	    var irDeBSectorC = this.irASector(estoySectorB, voyDeBToC, voyDeBToA, "B","C", 0.2, {
    		   offsetX: -0.3,
    		   offsetY: -0.6
		});

		var irDeCSectorB = this.irASector(estoySectorC, voyDeCToB, voyDeCToA, "C","B", 0.2, {
    		   offsetX: -0.3,
    		   offsetY: -0.6
		});

		this.imgArticulo1 = new AR.ImageResource("assets/articulos/articulo1.png");
        var articulo1 = new AR.ImageDrawable(this.imgArticulo1, 1, {
			offsetX : 0.3
	   });      
	   
	   var infoProducto1 = new AR.HtmlDrawable({
       //   html:"<div>Ver info del producto</div>",
   		  uri: "assets/articulos/articulo.html"
		}, 0.8, {
		    viewportWidth: 800,
		    viewportHeight: 600, 
		    // backgroundColor: "#000000",
		    opacity: 0.5,
		    offsetX: 0.1,
		    offsetY: 0.5,
		    horizontalAnchor: AR.CONST.HORIZONTAL_ANCHOR.RIGHT,
		    verticalAnchor: AR.CONST.VERTICAL_ANCHOR.TOP,
		    clickThroughEnabled: true,
		    allowDocumentLocationChanges: false,
		    onDocumentLocationChanged: function onDocumentLocationChangedFn(uri) {
		        AR.context.openInBrowser(uri);
    		}
          });  

		/*
			The last line combines everything by creating an AR.ImageTrackable with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.ImageTrackable simply provide the target name as specified in the target collection.
		*/
        var pageOne = new AR.ImageTrackable(this.tracker, "sectorA", {
			drawables: {
				cam: [estoySectorA, voyDeAToB, voyDeAToC, irDeASectorB, irDeASectorC]
			}
		});
		
		var pageTwo = new AR.ImageTrackable(this.tracker, "sectorB", {
			drawables: {
				cam: [estoySectorB, voyDeBToA, voyDeBToC, irDeBSectorA, irDeBSectorC]
			}
		});
		
		var pageThree = new AR.ImageTrackable(this.tracker, "sectorC", {
			drawables: {
				cam: [estoySectorC, voyDeCToA, voyDeCToB, irDeCSectorA, irDeCSectorB]
			}
		});
		
		var pageFour = new AR.ImageTrackable(this.tracker, "telefono", {
			drawables: {
				cam: [articulo1, infoProducto1]
			}
		});		
	},
   
        
	worldLoaded: function worldLoadedFn() {
		/*var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + cssDivLeft + ">Scan Target &#35;1 (surfer):</div>" +
			"<div" + cssDivRight + "><img src='assets/surfer.png'></img></div>";

		// Remove Scan target message after 10 sec.
		setTimeout(function() {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
		}, 10000); */
	}
};

World.init();
