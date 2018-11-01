var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},
        comprarPropiedad: function comprarPropiedadFn(propiedad, size, options) {
   	 	options.onClick = function() {
       	 	   //AR.context.openInBrowser(url);
                   //alert("Comprar Propiedad " + propiedad);
                 };
    	        return new AR.ImageDrawable(this.imgButton, size, options);
	 },
	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ImageTracker needs to be created in order to start the recognition engine. It is initialized with a AR.TargetCollectionResource specific to the target collection that should be used. Optional parameters are passed as object in the last argument. In this case a callback function for the onTargetsLoaded trigger is set. Once the tracker loaded all its target images, the function worldLoaded() is called.

			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
		*/
        this.targetCollectionResource = new AR.TargetCollectionResource("assets/monopoly.wtc", {
        });

        this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
            onTargetsLoaded: this.worldLoaded
        });

		/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.ImageTrackable) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/
                this.imgButton = new AR.ImageResource("assets/comprar.jpg");

		/* Create overlay for page one */
		var tituloBariloche = new AR.ImageResource("assets/tituloBariloche.jpg");
	        var pageBariloche = this.comprarPropiedad("bariloche", 0.1, {
    		   offsetX: -0.25,
    		   offsetY: -0.25
		});
		var pageMardelPlata = this.comprarPropiedad("mardelplata", 0.1, {
    		   offsetX: -0.25,
    		   offsetY: -0.25
		});
		
                var tituloBariloche = new AR.ImageDrawable(imgBariloche, 1, {
			translate: {
				x:-0.15
			}

		});
           /* Create overlay for page two */
		 var overlayTwo = new AR.ImageDrawable(imgBariloche, 1, {
			translate: {
				x:-0.15
			}

		});

               /* Crear overlay html  */
               var weatherWidget = new AR.HtmlDrawable({
   		 uri: "assets/weather.html"
		}, 0.25, {
		    viewportWidth: 320,
		    viewportHeight: 100,
		    backgroundColor: "#FFFFFF",
		    offsetX: +0.36,
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
		var pageOne = new AR.ImageTrackable(this.tracker, "bariloche", {
			drawables: {
				cam: [pageBariloche, tituloBariloche]
			}
		});
                var pageTwo = new AR.ImageTrackable(this.tracker, "mardelplata", {
			drawables: {
				cam: pageMardelPlata
			}
		});
                var pageThree = new AR.ImageTrackable(this.tracker, "nueve", {
			drawables: {
				cam: overlayTwo
			}
		});
		var pageFour = new AR.ImageTrackable(this.tracker, "original-grid-image-14172-1491954982-14", {
			drawables: {
				cam: overlayTwo
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
