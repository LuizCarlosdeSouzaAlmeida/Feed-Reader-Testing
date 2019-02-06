/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that
         * the URL is not empty.
         */
         it('have URL defined', function(){
            for(feed of allFeeds){
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            }
         });
        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have name defined', function(){
            for(feed of allFeeds){
              expect(feed.name).toBeDefined();
              expect(feed.name.length).not.toBe(0);
            }
         });
    });
    // Test suite named "The menu"
    describe('The menu', function() {
        // Checks if the body tag has the class 'menu-hiden'
         it('is hidden by default', function() {
           expect($("body").hasClass("menu-hidden")).toBe(true);
         });
         /* Checks if the body tag toggle the 'menu-hidden' class when the click
          * event is trigged.
          */
         it('canges visibility when clicked', function() {
              $('.menu-icon-link').trigger('click');
              expect($('body').hasClass('menu-hidden')).toBe(false);
              $('.menu-icon-link').trigger('click');
              expect($('body').hasClass('menu-hidden')).toBe(true);
         });
      });
    // Test suite named "Initial Entries"
    describe('Initial Entries', function() {
        /*
         * loadFeed() is asynchronous so this test require
         * the use of beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
           loadFeed(0, function(){
             done();
           });
         });
        /* Ensures when the loadFeed function is called and there is at least
         * a single .entry element within the .feed container.
         */
         it('call LoadFeed successfully', function(done) {
           expect($('.feed .entry').length).toBeGreaterThan(0);
           done();
         });
      });
    // Test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
      let firstLoadedFeed;
      /*
       * loadFeed() is asynchronous so this test require the use of beforeEach
       * and asynchronous done() function to load both feeds.
       */
         beforeEach(function(done){
           loadFeed(0, function(){
             firstLoadedFeed = $('.feed').html();
             loadFeed(1, function(){
               done();
             });
           });
         });
         /* Ensures when a new feed is loaded by the loadFeed function that the
          * content is diferent from the previously loaded.
          */
         it('actually changes content when LoadFeed is called', function(done) {
           expect($('.feed').html()).not.toBe(firstLoadedFeed);
           done();
         });
       });
}());
