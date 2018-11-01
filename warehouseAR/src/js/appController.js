/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'ojs/ojrouter', 'ojs/ojarraytabledatasource', 'ojs/ojmoduleanimations'],
  function(oj) {
     function ControllerViewModel() {
      var self = this;
     
 
      // Save the theme so we can perform platform specific navigational animations
      var platform = oj.ThemeUtils.getThemeTargetPlatform();

      // Router setup
      self.router = oj.Router.rootInstance;

      self.router.configure({
       'dashboard': {label: 'Dashboard', isDefault: true},
       'catalogo': { label: 'Catalogo'},
       'transacciones': {label: 'Transacciones'},
       'profile': {label: 'Perfil'},
       'about': {label: 'Sobre'}
      });

      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
      // Callback function that can return different animations based on application logic.
      function switcherCallback(context) {
        if (platform === 'android')
          return 'fade';
        return null;
      };

      function mergeConfig(original) {
        return $.extend(true, {}, original, {
          'animation': oj.ModuleAnimations.switcher(switcherCallback)
        });
      }

      self.moduleConfig = mergeConfig(self.router.moduleConfig);

      // Navigation setup
      var navData = [
      {name: 'Dashboard', id: 'dashboard',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: 'Catalogo', id: 'catalogo',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Transacciones', id: 'transacciones',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Profile', id: 'profile',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24'},
      {name: 'About', id: 'about',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
      ];

      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Header Setup
      self.getHeaderModel = function() {
        var headerFactory = {
          createViewModel: function(params, valueAccessor) {
            var model =  {
              pageTitle: self.router.currentState().label,
              handleBindingsApplied: function(info) {
                // Adjust content padding after header bindings have been applied
                self.adjustContentPadding();
              }
            };
            return Promise.resolve(model);
          }
        }
        return headerFactory;
      }

      // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions. 
      // This method should be called whenever your fixed region height may change.  The application
      // can also adjust content paddings with css classes if the fixed region height is not changing between 
      // views.
      self.adjustContentPadding = function () {
        var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
        var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
        var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

        if (topElem) {
          contentElem.style.paddingTop = topElem.offsetHeight+'px';
        }
        if (bottomElem) {
          contentElem.style.paddingBottom = bottomElem.offsetHeight+'px';
        }
        // Add oj-complete marker class to signal that the content area can be unhidden.
        // See the override.css file to see when the content area is hidden.
        contentElem.classList.add('oj-complete');
      }
   
// agregar Wikitude

// Url/Path to the augmented reality experience you would like to load
                self.arExperienceUrl = "www/wikitude/ProductoOnTarget/index.html";
                //self.arExperienceUrl = "www/wikitude/x_Demo_2_SolarSystem(Geo)/index.html";
                // The features your augmented reality experience requires, only define the ones you really need
                self.requiredFeatures = ["image_tracking"];
                // Represents the device capability of launching augmented reality experiences with specific features
                self.isDeviceSupported = false;
                // Additional startup settings, for now the only setting available is camera_position (back|front)
                self.startupConfiguration = {
                    "camera_position": "back",
                    "camera_resolution": "auto"
                };
                

// Application Constructor
                self.initialiseWikitude = function () {
     
                    self.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
     
                    self.wikitudePlugin.isDeviceSupported(self.onDeviceSupported, self.onDeviceNotSupported, self.requiredFeatures);
                };

                // Callback if the device supports all required features
                self.onDeviceSupported = function () {
                    console.log("wikitude: onDeviceSupported");

                    self.wikitudePlugin.loadARchitectWorld(
                            self.onARExperienceLoadedSuccessful,
                            self.onARExperienceLoadError,
                            self.arExperienceUrl,
                            self.requiredFeatures,
                            self.startupConfiguration
                            );

                };
                // Callback if the device does not support all required features
                self.onDeviceNotSupported = function (errorMessage) {
                    alert(errorMessage);
                    console.log("wikitude: onDeviceNotSupported");
                };
                // Callback if your AR experience loaded successful
                self.onARExperienceLoadedSuccessful = function (loadedURL) {
                    /* Respond to successful augmented reality experience loading if you need to */
                    console.log("wikitude: onARExperienceLoadedSuccessful");
                };
 }
    return new ControllerViewModel();
  }
);
