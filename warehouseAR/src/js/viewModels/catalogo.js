/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'appController','knockout', 'utils', 'data/data', 'ojs/ojrouter', 'ojs/ojknockout', 'promise', 'ojs/ojlistview', 'ojs/ojmodel', 'ojs/ojpagingcontrol', 'ojs/ojpagingcontrol-model'],
      function (oj, app, ko, utils, data)
        {
  
    function CatalogoViewModel() {
      var self = this;

               
                var lgQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.LG_UP);
                var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_UP);
                var smOnlyQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.large = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(lgQuery);
                self.medium = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
                self.small = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
                self.smallOnly = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smOnlyQuery);
/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

                var defaultLayout = utils.readCookie('productoLayout');
                if (defaultLayout) {
                    self.productoLayoutType = ko.observable(defaultLayout);
                } else {
                    self.productoLayoutType = ko.observable('productoCardLayout');
                }
                self.allProductos = ko.observableArray([]);
                self.allPeople = ko.observableArray([]);
                self.ready = ko.observable(false);
               
              //  data.fetchData(app.core_services + 'productos/catalogo').then(function (d) {
              //      self.allProductos(d);
              //  }).fail(function (error) {
              //      console.log('Error in getting People data: ' + error.message);
              //   }); 

               self.allProductos([{id: 1, producto: "Producto1", descripcion: "Descripcion1", imagen: "Imagen1", categoria: "Categoria1", precio: 100, stock:100},
               {id: 2, producto: "Producto2", descripcion: "Descripcion2", imagen: "Imagen1", categoria: "Categoria1", precio: 100, stock:100},
               {id: 3, producto: "Producto3", descripcion: "Descripcion3", imagen: "Imagen1", categoria: "Categoria1", precio: 100, stock:100}]);
    
                self.parsePeople = function (response) {
                    return response['employees'];
                };

                self.model = oj.Model.extend({
                    idAttribute: 'empId'
                });

              /*  self.collection = new oj.Collection(null, {
                    url: 'js/data/employees.json',
                    model: self.model
                });
*/
                self.nameSearch = ko.observable('');

                self.filteredAllPeople = ko.computed(function () {
                    var prodFilter = new Array();

                    if (self.allProductos().length !== 0) {
                        if (self.nameSearch().length === 0)
                        {
                            prodFilter = self.allProductos();
                        } else {
                            ko.utils.arrayFilter(self.allProductos(),
                                    function (r) {
                                        var token = self.nameSearch().toLowerCase();
                                        if (r.producto.toLowerCase().indexOf(token) === 0) {
                                            prodFilter.push(r);
                                        }
                                    });
                        }
                    }

                    self.ready(true);
                    return prodFilter;
                });
                      self.listViewDataSource = ko.computed(function () {
                    return new oj.ArrayTableDataSource(self.filteredAllPeople(), {idAttribute: 'id'});
                });

                self.cardViewPagingDataSource = ko.computed(function () {
                    return new oj.ArrayPagingDataSource((self.filteredAllPeople()));
                });

                self.cardViewDataSource = ko.computed(function () {
                    return self.cardViewPagingDataSource().getWindowObservable();
                });

                self.getPhoto = function (empId) {
                    var src;
                    if (empId < 188) {
                        src = 'css/images/people/' + empId + '.png';
                    } else {
                        src = 'css/images/people/nopic.png';
                    }
                    return src;
                };

                self.getEmail = function (emp) {
                    return "mailto:" + emp.email + '@example.net';
                };

                self.getFacetime = function (emp) {
                    return "#";
                };

                self.getChat = function (emp) {
                    return "#";
                };

                self.getOrg = function (org, event) {
                    alert('This will take you to the employee page and highlight the team infotile');
                };

                self.getTenure = function (emp) {
                    var now = new Date().getFullYear();
                    var hired = new Date(emp.hireDate).getFullYear();
                    var diff = now - hired;
                    return diff;
                };

                self.cardLayoutHandler = function () {
                    utils.createCookie('productoLayout', 'productoCardLayout');
                    self.productoLayoutType('productoCardLayout');
                };

                self.listLayoutHandler = function () {
                    utils.createCookie('productoLayout', 'productoListLayout');
                    self.productoLayoutType('productoListLayout');
                };

                self.loadPersonPage = function (emp) {
                    if (emp.empId) {
                        // Temporary code until go('person/' + emp.empId); is checked in 1.1.2
                        history.pushState(null, '', 'index.html?root=person&emp=' + emp.empId);
                        oj.Router.sync();
                    } else {
                        // Default id for person is 100 so no need to specify.
                        oj.Router.rootInstance.go('person');
                    }
                };

                self.onEnter = function(data, event){
                    if(event.keyCode === 13){
                        var emp = {};
                        emp.empId = data.empId;
                        self.loadPersonPage(emp);
                    }
                    return true;
                };
                
                self.changeHandler = function (page, event) {
                    if (event.option === 'selection') {
                        if (event.value[0]) {
                            var emp = {};
                            emp.empId = event.value[0];
                            self.loadPersonPage(emp);
                        }
                    }
                }

      

 
      // Header Config
      //self.headerConfig = {'viewName': 'header', 'viewModelFactory': app.getHeaderModel()};
      
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
       
              
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CatalogoViewModel();
  }
);
